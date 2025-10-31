import axios from 'axios';
import { API_BASE_URL, API_CONFIG } from '../config/api';

export interface ConsultationCategory {
  category_id: number;
  category_name: string;
  category_icon: string | null;
  display_order: number;
  is_active: boolean;
}

interface CategoriesResponse {
  success: boolean;
  data: ConsultationCategory[];
  message?: string;
}

/**
 * 서버에서 활성화된 상담 구분 목록을 가져옵니다
 */
export const getActiveCategories = async (): Promise<ConsultationCategory[]> => {
  try {
    const response = await axios.get<CategoriesResponse>(
      `${API_BASE_URL}/categories`,
      API_CONFIG
    );

    if (response.data.success && response.data.data) {
      console.log(`상담 구분 ${response.data.data.length}개 로드 완료`);
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);

    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data?.message || error.message);
    }

    return [];
  }
};
