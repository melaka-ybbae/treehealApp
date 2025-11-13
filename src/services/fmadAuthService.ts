import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Application from 'expo-application';
import { Platform } from 'react-native';
import { AuthTokens } from '../utils/types';
import { FMAD_CONFIG } from '../config/fmad.config';

const BASE_URL = FMAD_CONFIG.BASE_URL;

// AsyncStorage Keys
const STORAGE_KEYS = {
  AUTH_TOKENS: '@fmad_auth_tokens',
  SSAID: '@fmad_ssaid',
};

/**
 * SSAID (Android ID) 또는 UUID 생성/조회
 */
async function getOrCreateSSAID(): Promise<string> {
  try {
    // 기존에 저장된 SSAID가 있는지 확인
    let ssaid = await AsyncStorage.getItem(STORAGE_KEYS.SSAID);

    if (!ssaid) {
      // Android: androidId 사용
      if (Platform.OS === 'android') {
        ssaid = Application.getAndroidId() || generateUUID();
      } else {
        // iOS 및 기타: UUID 생성
        ssaid = generateUUID();
      }

      await AsyncStorage.setItem(STORAGE_KEYS.SSAID, ssaid);
    }

    return ssaid;
  } catch (error) {
    console.error('SSAID 생성/조회 실패:', error);
    return generateUUID();
  }
}

/**
 * UUID 생성
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * 저장된 인증 토큰 조회
 */
export async function getStoredAuthTokens(): Promise<AuthTokens | null> {
  try {
    const tokensJson = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKENS);
    if (tokensJson) {
      const tokens = JSON.parse(tokensJson);

      // 토큰 유효성 검증
      if (!tokens.access_token || !tokens.refresh_token || !tokens.Seed || !tokens.device_seed) {
        console.warn('[FM AD] 저장된 토큰이 유효하지 않음 - 삭제함');
        console.warn(`[FM AD] 토큰 데이터:`, tokens);
        await clearAuthTokens();
        return null;
      }

      console.log(`[FM AD] 저장된 토큰 조회 - Seed: ${tokens.Seed}, device_seed: ${tokens.device_seed}`);
      return tokens;
    }
    return null;
  } catch (error) {
    console.error('[FM AD] 저장된 토큰 조회 실패:', error);
    return null;
  }
}

/**
 * 저장된 인증 토큰 삭제 (디버깅/리셋용)
 */
export async function clearAuthTokens(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKENS);
    await AsyncStorage.removeItem(STORAGE_KEYS.SSAID);
    console.log('[FM AD] 저장된 토큰 및 SSAID 삭제 완료');
  } catch (error) {
    console.error('[FM AD] 토큰 삭제 실패:', error);
  }
}

/**
 * 인증 토큰 저장
 */
export async function saveAuthTokens(tokens: AuthTokens): Promise<void> {
  try {
    console.log('[FM AD] 토큰 저장 시도:', {
      Seed: tokens.Seed,
      device_seed: tokens.device_seed,
      login_id: tokens.login_id,
      has_access_token: !!tokens.access_token,
      has_refresh_token: !!tokens.refresh_token,
    });

    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKENS, JSON.stringify(tokens));
    console.log('[FM AD] 토큰 저장 완료');
  } catch (error) {
    console.error('[FM AD] 토큰 저장 실패:', error);
  }
}

/**
 * 관리자 로그인 (최초 로그인)
 */
export async function adminLogin(
  adminId: string,
  adminPassword: string
): Promise<AuthTokens | null> {
  try {
    const ssaid = await getOrCreateSSAID();
    const loginType = Platform.OS === 'web' ? 'android' : (Platform.OS === 'android' ? 'android' : 'ios');

    console.log(`[FM AD] 관리자 로그인 시도 - ID: ${adminId}, Type: ${loginType}, SSAID: ${ssaid}`);

    const response = await axios.post(`${BASE_URL}/auth/admin/login`, {
      admin_id: adminId,
      admin_pw: adminPassword,
      admin_login_type: loginType,
      ssaid: ssaid,
    });

    console.log('[FM AD] 관리자 로그인 응답:', response.data);
    console.log('[FM AD] 응답 구조:', {
      has_access_token: !!response.data?.access_token,
      has_refresh_token: !!response.data?.refresh_token,
      Seed: response.data?.Seed,
      device_seed: response.data?.device_seed,
      login_id: response.data?.login_id,
      keys: Object.keys(response.data || {}),
    });

    const tokens: AuthTokens = {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      Seed: response.data.Seed,
      device_seed: response.data.device_seed,
      login_id: response.data.login_id,
    };

    await saveAuthTokens(tokens);
    console.log('[FM AD] 관리자 로그인 성공');
    return tokens;
  } catch (error: any) {
    console.error('[FM AD] 관리자 로그인 실패:', error.response?.data || error.message);
    return null;
  }
}

/**
 * SSAID 기반 로그인 (기기 자동 로그인)
 */
export async function deviceLogin(): Promise<AuthTokens | null> {
  try {
    const ssaid = await getOrCreateSSAID();

    console.log(`[FM AD] 기기 로그인 시도 - SSAID: ${ssaid}`);

    const response = await axios.post(`${BASE_URL}/auth/admin/deviceLogin`, {
      ssaid: ssaid,
    });

    console.log('[FM AD] 기기 로그인 응답:', response.data);
    console.log('[FM AD] 응답 구조:', {
      has_access_token: !!response.data?.access_token,
      has_refresh_token: !!response.data?.refresh_token,
      Seed: response.data?.Seed,
      device_seed: response.data?.device_seed,
      login_id: response.data?.login_id,
      keys: Object.keys(response.data || {}),
    });

    const tokens: AuthTokens = {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      Seed: response.data.Seed,
      device_seed: response.data.device_seed,
      login_id: response.data.login_id,
    };

    await saveAuthTokens(tokens);
    console.log('[FM AD] 기기 로그인 성공');
    return tokens;
  } catch (error: any) {
    console.error('[FM AD] 기기 로그인 실패:', error.response?.data || error.message);
    return null;
  }
}

/**
 * Access Token 재발행
 */
export async function refreshAccessToken(): Promise<AuthTokens | null> {
  try {
    const currentTokens = await getStoredAuthTokens();
    if (!currentTokens) {
      console.log('[FM AD] 재발행 실패: 저장된 토큰 없음');
      return null;
    }

    console.log('[FM AD] 토큰 재발행 시도');

    const response = await axios.put(`${BASE_URL}/auth/admin/accesstoken`, {
      access_token: currentTokens.access_token,
      refresh_token: currentTokens.refresh_token,
    });

    const newTokens: AuthTokens = {
      ...currentTokens,
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
    };

    await saveAuthTokens(newTokens);
    console.log('[FM AD] 토큰 재발행 성공');
    return newTokens;
  } catch (error: any) {
    console.error('[FM AD] 토큰 재발행 실패:', error.response?.data || error.message);

    // Refresh token도 만료된 경우 저장된 토큰 삭제
    if (error.response?.status === 401) {
      console.log('[FM AD] Refresh token 만료, 저장된 토큰 삭제');
      await clearAuthTokens();
    }

    return null;
  }
}

// 기본 관리자 계정은 config 파일에서 가져옴

/**
 * 인증 초기화 (스플래시 화면에서 호출)
 */
export async function initializeAuth(): Promise<boolean> {
  try {
    console.log('[FM AD] 인증 초기화 시작');

    // 1. 저장된 토큰이 있는지 확인 (getStoredAuthTokens에서 유효성 검증됨)
    const storedTokens = await getStoredAuthTokens();

    if (storedTokens) {
      console.log('[FM AD] 유효한 저장된 토큰 발견, 검증 중...');
      // 토큰이 있으면 검증 (광고 목록 요청으로 테스트)
      const isValid = await verifyToken(storedTokens.access_token);

      if (isValid) {
        console.log('[FM AD] 기존 토큰 유효, 인증 완료');
        return true;
      } else {
        // 토큰이 만료되었으면 재발행 시도
        console.log('[FM AD] 토큰 만료됨, 재발행 시도');
        const newTokens = await refreshAccessToken();
        if (newTokens) {
          console.log('[FM AD] 토큰 재발행 성공');
          return true;
        }
        console.log('[FM AD] 토큰 재발행 실패 - 토큰 삭제 후 재로그인');
        await clearAuthTokens();
      }
    } else {
      console.log('[FM AD] 저장된 유효 토큰 없음');
    }

    // 2. 토큰이 없거나 재발행 실패 시 관리자 로그인 시도 (기기 등록 포함)
    console.log('[FM AD] 관리자 계정으로 로그인 시도 (기기 등록)');
    const adminTokens = await adminLogin(FMAD_CONFIG.DEFAULT_ADMIN_ID, FMAD_CONFIG.DEFAULT_ADMIN_PASSWORD);

    if (adminTokens) {
      console.log('[FM AD] 관리자 로그인 성공 (기기 등록 완료)');
      return true;
    }

    // 3. 관리자 로그인 실패 시 SSAID 기반 로그인 시도 (이미 등록된 기기용)
    console.log('[FM AD] 관리자 로그인 실패, SSAID 기반 기기 로그인 시도');
    const deviceTokens = await deviceLogin();

    if (deviceTokens) {
      console.log('[FM AD] 기기 로그인 성공');
      return true;
    }

    console.warn('[FM AD] 모든 인증 방법 실패 - 광고 없이 진행');
    return false;
  } catch (error) {
    console.error('[FM AD] 인증 초기화 중 오류:', error);
    return false;
  }
}

/**
 * 토큰 유효성 검증 (간단한 API 호출로 테스트)
 */
async function verifyToken(accessToken: string): Promise<boolean> {
  try {
    const tokens = await getStoredAuthTokens();
    if (!tokens) return false;

    // 광고 목록 요청으로 토큰 검증
    await axios.post(
      `${BASE_URL}/company/ad/list`,
      { companySeed: tokens.Seed },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return true;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return false; // 토큰 만료 또는 무효
    }
    // 네트워크 오류 등은 일단 유효한 것으로 간주
    return true;
  }
}
