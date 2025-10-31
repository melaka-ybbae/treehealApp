import axios from 'axios';
import { API_BASE_URL, API_CONFIG } from '../config/api';

export interface DetailItem {
  item_id: number;
  item_name: string;
  item_icon: string | null;
  display_order: number;
  is_active: boolean;
}

interface DetailItemsResponse {
  success: boolean;
  data: DetailItem[];
  message?: string;
}

/**
 * 서버에서 활성화된 세부 항목 목록을 가져옵니다
 */
export const getActiveDetailItems = async (): Promise<DetailItem[]> => {
  try {
    const response = await axios.get<DetailItemsResponse>(
      `${API_BASE_URL}/detail-items`,
      API_CONFIG
    );

    if (response.data.success && response.data.data) {
      console.log(`세부 항목 ${response.data.data.length}개 로드 완료`);
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch detail items:', error);

    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data?.message || error.message);
    }

    return [];
  }
};
