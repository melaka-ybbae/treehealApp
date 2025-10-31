import axios from 'axios';
import { API_BASE_URL, API_CONFIG } from '../config/api';

export interface Expert {
  expert_id: number;
  expert_name: string;
  contact_number: string;
  specialization: string;
  qualifications: string;
  profile_image: string;
  display_order: number;
  is_fixed: boolean;
  status: string;
}

interface ExpertsResponse {
  success: boolean;
  data: Expert[];
  message?: string;
}

/**
 * 서버에서 활성 전문가 목록을 가져옵니다
 * ssaid가 제공되면 해당 기기에 매핑된 전문가만 반환
 */
export const getActiveExperts = async (ssaid?: string): Promise<Expert[]> => {
  try {
    // ssaid가 있으면 쿼리 파라미터 추가
    const url = ssaid
      ? `${API_BASE_URL}/experts?ssaid=${ssaid}`
      : `${API_BASE_URL}/experts`;

    const response = await axios.get<ExpertsResponse>(url, API_CONFIG);

    if (response.data.success && response.data.data) {
      console.log(`전문가 ${response.data.data.length}명 로드 완료 (ssaid: ${ssaid || 'all'})`);
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch experts:', error);

    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data?.message || error.message);
    }

    return [];
  }
};

/**
 * 특정 기기에 매핑된 전문가 목록을 가져옵니다
 */
export const getExpertsByDevice = async (deviceId: number): Promise<Expert[]> => {
  try {
    const response = await axios.get<ExpertsResponse>(
      `${API_BASE_URL}/experts/device/${deviceId}`,
      API_CONFIG
    );

    if (response.data.success && response.data.data) {
      console.log(`기기별 전문가 ${response.data.data.length}명 로드 완료`);
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch experts by device:', error);
    return [];
  }
};

/**
 * 특정 전문가 상세 정보를 가져옵니다
 */
export const getExpertById = async (expertId: number): Promise<Expert | null> => {
  try {
    const response = await axios.get<{ success: boolean; data: Expert }>(
      `${API_BASE_URL}/experts/${expertId}`,
      API_CONFIG
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch expert by id:', error);
    return null;
  }
};
