import axios from 'axios';
import { API_BASE_URL, API_CONFIG } from '../config/api';
import { getDeviceSSAID } from '../utils/deviceUtils';

export interface ConsultationRequest {
  ssaid: string;
  category_id: number;
  applicant_name: string;
  contact_number: string;
  birth_date: string;
  gender: 'M' | 'F';
  assigned_expert_id?: number;
  detail_items: string[];
  region?: string;
  detailed_region?: string;
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

    // 요청 데이터 구성
    // formData.interests는 이제 한글 item_name 배열로 저장됨 (예: ["실손보험", "진단비"])
    const requestData: ConsultationRequest = {
      ssaid: ssaid,
      category_id: formData.consultationType, // 서버에서 받은 category_id 그대로 전송
      applicant_name: formData.name,
      contact_number: formData.phone,
      birth_date: birthDate,
      gender: gender,
      assigned_expert_id: formData.consultant > 0 ? formData.consultant : undefined,
      detail_items: formData.interests || [], // 한글 item_name 배열 그대로 전송
      region: formData.region,
      detailed_region: formData.detailedRegion,
    };

    console.log('상담 신청 데이터:', requestData);

    // 서버에 상담 신청
    const response = await axios.post<ConsultationResponse>(
      `${API_BASE_URL}/consultations`,
      requestData,
      API_CONFIG
    );

    return response.data;
  } catch (error) {
    console.error('Failed to submit consultation:', error);

    if (axios.isAxiosError(error)) {
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
