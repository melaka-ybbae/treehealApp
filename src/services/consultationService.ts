import axios from 'axios';
import { API_BASE_URL, API_CONFIG } from '../config/api';
import { getDeviceSSAID } from '../utils/deviceUtils';

export interface DetailItem {
  item_id: number;
  item_name: string;
  value: string;
}

export interface ConsultationRequest {
  ssaid: string;
  category_id: number | string;
  consultation_type: string;
  applicant_name: string;
  contact_number: string;
  birth_date: string;
  gender: 'M' | 'F';
  assigned_expert_id?: number;
  detail_items?: DetailItem[];
}

interface ConsultationResponse {
  success: boolean;
  request_id?: number;
  request_number?: string;
  message?: string;
}

/**
 * 상담 신청을 서버에 전송합니다
 */
export const submitConsultation = async (
  formData: any
): Promise<ConsultationResponse> => {
  try {
    // SSAID 가져오기
    const ssaid = await getDeviceSSAID();

    if (!ssaid) {
      throw new Error('기기 정보를 가져올 수 없습니다');
    }

    // 성별 변환 (male/female -> M/F)
    const gender = formData.gender === 'male' ? 'M' : 'F';

    // 생년월일 포맷 변환 (YYYY-MM-DD -> YYYY-MM-DD, 그대로 사용)
    const birthDate = formData.birthdate;

    // detail_items 변환: 문자열 배열 -> 객체 배열
    const detailItems: DetailItem[] | undefined =
      formData.interests && formData.interests.length > 0
        ? formData.interests.map((itemName: string, index: number) => ({
            item_id: index + 1,
            item_name: itemName,
            value: itemName, // value는 item_name과 동일하게 설정
          }))
        : undefined;

    // 요청 데이터 구성
    const requestData: ConsultationRequest = {
      ssaid: ssaid,
      category_id: formData.consultationType, // 서버에서 받은 category_id 그대로 전송
      consultation_type: formData.consultationTypeName || '', // 상담 구분 이름
      applicant_name: formData.name,
      contact_number: formData.phone,
      birth_date: birthDate,
      gender: gender,
      assigned_expert_id: formData.consultant && formData.consultant > 0 ? formData.consultant : undefined,
      detail_items: detailItems,
    };

    console.log('=== 상담 신청 데이터 ===');
    console.log('요청 데이터:', JSON.stringify(requestData, null, 2));

    // 서버에 상담 신청
    const response = await axios.post<ConsultationResponse>(
      `${API_BASE_URL}/consultations`,
      requestData,
      API_CONFIG
    );

    console.log('서버 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('=== 상담 신청 실패 ===');
    console.error('에러 전체:', error);

    if (axios.isAxiosError(error)) {
      console.error('응답 상태:', error.response?.status);
      console.error('응답 데이터:', error.response?.data);
      console.error('응답 헤더:', error.response?.headers);

      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }

    return {
      success: false,
      message: '상담 신청 중 오류가 발생했습니다',
    };
  }
};

/**
 * 신청 번호로 상담 신청 조회
 */
export const getConsultationByRequestNumber = async (
  requestNumber: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/consultations/${requestNumber}`,
      API_CONFIG
    );

    return response.data;
  } catch (error) {
    console.error('Failed to get consultation:', error);
    return null;
  }
};
