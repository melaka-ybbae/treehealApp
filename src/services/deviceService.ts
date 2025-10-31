import axios from 'axios';
import { getDeviceSSAID, getDeviceInfo, isDeviceRegistered, setDeviceRegistered, setDeviceId } from '../utils/deviceUtils';
import { API_BASE_URL, API_CONFIG } from '../config/api';

interface DeviceRegistrationResponse {
  success: boolean;
  device_id?: number;
  message?: string;
}

/**
 * 서버에 기기를 등록합니다
 */
export const registerDevice = async (): Promise<DeviceRegistrationResponse> => {
  try {
    const ssaid = await getDeviceSSAID();

    if (!ssaid) {
      throw new Error('SSAID를 가져올 수 없습니다');
    }

    // 기기 정보 가져오기
    const deviceInfo = await getDeviceInfo();

    // 서버에 기기 등록 요청
    const response = await axios.post<DeviceRegistrationResponse>(
      `${API_BASE_URL}/devices/register`,
      {
        ssaid: ssaid,
        device_name: deviceInfo?.deviceName || 'Unknown Device',
        device_type: deviceInfo?.deviceType || 'Unknown',
      },
      API_CONFIG
    );

    return response.data;
  } catch (error) {
    console.error('Failed to register device:', error);

    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }

    return {
      success: false,
      message: '기기 등록 중 오류가 발생했습니다',
    };
  }
};

/**
 * 앱 초기화 시 기기 등록을 확인하고 필요시 등록합니다
 */
export const initializeDeviceRegistration = async (): Promise<boolean> => {
  try {
    // 이미 등록되었는지 확인
    const registered = await isDeviceRegistered();

    if (registered) {
      console.log('기기가 이미 등록되어 있습니다');
      return true;
    }

    // SSAID 가져오기
    const ssaid = await getDeviceSSAID();

    if (!ssaid) {
      console.error('SSAID를 가져올 수 없습니다');
      return false;
    }

    console.log('서버에 기기 등록 중...', ssaid);

    // 서버에 기기 등록
    const result = await registerDevice();

    if (result.success) {
      // 등록 성공 시 로컬에 저장
      await setDeviceRegistered(true);
      if (result.device_id) {
        await setDeviceId(result.device_id);
      }
      console.log('기기 등록 완료:', result.device_id);
      return true;
    } else {
      console.error('기기 등록 실패:', result.message);
      return false;
    }
  } catch (error) {
    console.error('기기 등록 초기화 실패:', error);
    return false;
  }
};

/**
 * 기기 정보를 서버에서 조회합니다
 */
export const getDeviceFromServer = async (): Promise<any> => {
  try {
    const ssaid = await getDeviceSSAID();

    if (!ssaid) {
      throw new Error('SSAID를 가져올 수 없습니다');
    }

    const response = await axios.get(`${API_BASE_URL}/devices/${ssaid}`, API_CONFIG);

    return response.data;
  } catch (error) {
    console.error('Failed to get device from server:', error);
    return null;
  }
};
