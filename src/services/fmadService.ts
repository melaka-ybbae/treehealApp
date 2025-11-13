import axios from 'axios';
import { AdListResponse, AdItem } from '../utils/types';
import { getStoredAuthTokens, refreshAccessToken } from './fmadAuthService';
import { FMAD_CONFIG } from '../config/fmad.config';

const BASE_URL = FMAD_CONFIG.BASE_URL;

/**
 * 광고 목록 조회
 */
export async function fetchAdList(): Promise<AdListResponse | null> {
  try {
    const tokens = await getStoredAuthTokens();
    if (!tokens) {
      console.error('[FM AD] 광고 목록 조회 실패: 인증 토큰이 없습니다');
      return null;
    }

    console.log(`[FM AD] 광고 목록 요청 - companySeed: ${tokens.Seed}`);

    const response = await axios.post(
      `${BASE_URL}/company/ad/list`,
      { companySeed: tokens.Seed },
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`[FM AD] 광고 목록 조회 성공 - 광고 ${response.data.adList?.length || 0}개`);
    return response.data;
  } catch (error: any) {
    // 토큰 만료 시 재발행 후 재시도
    if (error.response?.status === 401) {
      console.log('[FM AD] 401 에러 - 토큰 만료, 재발행 시도');
      const newTokens = await refreshAccessToken();

      if (newTokens) {
        // 재시도
        try {
          console.log('[FM AD] 새 토큰으로 광고 목록 재요청');
          const response = await axios.post(
            `${BASE_URL}/company/ad/list`,
            { companySeed: newTokens.Seed },
            {
              headers: {
                Authorization: `Bearer ${newTokens.access_token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          console.log(`[FM AD] 광고 목록 재시도 성공 - 광고 ${response.data.adList?.length || 0}개`);
          return response.data;
        } catch (retryError: any) {
          console.error('[FM AD] 광고 목록 재시도 실패:', retryError.response?.data || retryError.message);

          // 재시도도 401이면 완전히 재인증 필요
          if (retryError.response?.status === 401) {
            console.log('[FM AD] 재인증 필요 - initializeAuth 호출 권장');
          }
          return null;
        }
      } else {
        // 토큰 재발행 실패 - 완전히 재인증 필요
        console.log('[FM AD] 토큰 재발행 실패 - 재인증 필요');
      }
    }

    console.error('[FM AD] 광고 목록 조회 실패:', error.response?.data || error.message);
    return null;
  }
}

/**
 * 광고 재생 시간 업데이트 및 최신 광고 목록 조회
 */
export async function updateAdPlayTime(playTime: string): Promise<AdListResponse | null> {
  try {
    const tokens = await getStoredAuthTokens();
    if (!tokens) {
      console.error('인증 토큰이 없습니다');
      return null;
    }

    const response = await axios.post(
      `${BASE_URL}/statistics/advertise/update`,
      {
        companySeed: tokens.Seed,
        deviceSeed: tokens.device_seed,
        playTime: playTime,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    // 토큰 만료 시 재발행 후 재시도
    if (error.response?.status === 401) {
      console.log('토큰 만료, 재발행 후 재시도');
      const newTokens = await refreshAccessToken();

      if (newTokens) {
        try {
          const response = await axios.post(
            `${BASE_URL}/statistics/advertise/update`,
            {
              companySeed: newTokens.Seed,
              deviceSeed: newTokens.device_seed,
              playTime: playTime,
            },
            {
              headers: {
                Authorization: `Bearer ${newTokens.access_token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          return response.data;
        } catch (retryError) {
          console.error('광고 통계 업데이트 재시도 실패:', retryError);
          return null;
        }
      }
    }

    console.error('광고 통계 업데이트 실패:', error);
    return null;
  }
}

/**
 * 광고 클릭 URL 생성
 */
export function buildAdClickUrl(
  redirectBaseUrl: string,
  ad: AdItem,
  deviceSeed: number,
  companySeed: number
): string {
  if (!ad.LinkURL || ad.LinkURL === '') {
    return ''; // 클릭 불가능한 광고
  }

  const params = new URLSearchParams({
    redirect_url: ad.LinkURL,
    seed: ad.Seed.toString(),
    deviceseed: deviceSeed.toString(),
    companyseed: companySeed.toString(),
  });

  return `${redirectBaseUrl}?${params.toString()}`;
}

/**
 * 광고 순서 결정 (순차 또는 랜덤)
 */
export function getNextAdIndex(
  currentIndex: number,
  adList: AdItem[],
  rotationType: 0 | 1
): number {
  if (adList.length === 0) return 0;

  if (rotationType === 0) {
    // 순차 재생
    return (currentIndex + 1) % adList.length;
  } else {
    // 랜덤 재생
    let nextIndex = Math.floor(Math.random() * adList.length);
    // 같은 광고가 연속으로 나오지 않도록 (광고가 2개 이상일 때)
    if (adList.length > 1 && nextIndex === currentIndex) {
      nextIndex = (nextIndex + 1) % adList.length;
    }
    return nextIndex;
  }
}

/**
 * 미디어 타입 확인 (이미지 vs 비디오)
 */
export function getMediaType(url: string): 'image' | 'video' | 'unknown' {
  const lowerUrl = url.toLowerCase();

  // 비디오 확장자
  const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.m4v'];
  if (videoExtensions.some(ext => lowerUrl.includes(ext))) {
    return 'video';
  }

  // 이미지 확장자
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  if (imageExtensions.some(ext => lowerUrl.includes(ext))) {
    return 'image';
  }

  return 'unknown';
}
