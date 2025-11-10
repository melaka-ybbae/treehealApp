import axios from 'axios';
import { API_BASE_URL, API_CONFIG } from '../config/api';

export interface ConsentItem {
  consent_item_id: number;
  item_title: string;
  item_content: string;
  is_required: boolean;
  display_order: number;
  is_active: boolean;
}

interface ConsentItemsResponse {
  success: boolean;
  data: ConsentItem[];
  message?: string;
}

// Fallback 약관 데이터 (서버에서 불러오지 못할 경우 사용)
const FALLBACK_CONSENT_ITEMS: ConsentItem[] = [
  {
    consent_item_id: 1,
    item_title: '개인정보 수집 및 이용 동의',
    item_content: `TreeHeal은 보험 상담 서비스 제공을 위해 다음과 같이 개인정보를 수집 및 이용합니다.

1. 수집 항목: 이름, 생년월일, 성별, 연락처
2. 수집 목적: 보험 상담 서비스 제공 및 상담사 배정
3. 보유 기간: 상담 완료 후 3년

위 내용에 동의하십니까?`,
    is_required: true,
    display_order: 1,
    is_active: true,
  },
  {
    consent_item_id: 2,
    item_title: '제3자 정보 제공 동의',
    item_content: `TreeHeal은 보험 상담을 위해 고객님의 정보를 다음과 같이 제3자에게 제공합니다.

1. 제공받는 자: 배정된 보험 상담사
2. 제공 항목: 이름, 연락처, 상담 희망 내역
3. 이용 목적: 보험 상담 서비스 제공
4. 보유 기간: 상담 완료 후 1년

위 내용에 동의하십니까?`,
    is_required: true,
    display_order: 2,
    is_active: true,
  },
  {
    consent_item_id: 3,
    item_title: '마케팅 정보 수신 동의',
    item_content: `TreeHeal은 새로운 보험 상품 및 이벤트 정보를 SMS, 이메일 등으로 제공하고자 합니다.

1. 수신 방법: SMS, 이메일, 앱 푸시
2. 발송 내용: 신규 보험 상품 안내, 이벤트 소식
3. 수신 철회: 언제든지 수신 거부 가능

위 내용에 동의하십니까?`,
    is_required: false,
    display_order: 3,
    is_active: true,
  },
];

/**
 * 서버에서 활성화된 약관 목록을 가져옵니다
 */
export const getActiveConsentItems = async (): Promise<ConsentItem[]> => {
  try {
    const response = await axios.get<ConsentItemsResponse>(
      `${API_BASE_URL}/consent-items`,
      API_CONFIG
    );

    if (response.data.success && response.data.data && response.data.data.length > 0) {
      console.log(`서버에서 약관 ${response.data.data.length}개 로드 완료`);
      return response.data.data;
    }

    console.log('서버에 약관 데이터 없음, fallback 데이터 사용');
    return FALLBACK_CONSENT_ITEMS;
  } catch (error) {
    console.error('약관 로드 실패, fallback 데이터 사용:', error);

    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data?.message || error.message);
    }

    // 서버 오류 시 fallback 데이터 반환
    return FALLBACK_CONSENT_ITEMS;
  }
};
