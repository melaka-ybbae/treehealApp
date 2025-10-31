import * as Application from 'expo-application';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// 웹 환경 타입 선언
declare const window: any;
declare const document: any;
declare const navigator: any;
declare const screen: any;

/**
 * 브라우저 핑거프린트를 생성합니다 (웹 환경용)
 */
const generateBrowserFingerprint = (): string => {
  try {
    // 웹 환경이 아닌 경우 랜덤 ID 반환
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return 'web_' + Math.random().toString(36).substring(2, 15);
    }

    // 브라우저 정보 수집
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let fingerprint = '';

    // Canvas 핑거프린트
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Browser Fingerprint', 2, 2);
      fingerprint += canvas.toDataURL();
    }

    // 브라우저 기본 정보
    const browserInfo = [
      typeof navigator !== 'undefined' ? navigator.userAgent : '',
      typeof navigator !== 'undefined' ? navigator.language : '',
      typeof screen !== 'undefined' ? screen.colorDepth : 0,
      typeof screen !== 'undefined' ? screen.width + 'x' + screen.height : '0x0',
      new Date().getTimezoneOffset(),
      typeof window !== 'undefined' ? !!window.sessionStorage : false,
      typeof window !== 'undefined' ? !!window.localStorage : false,
    ].join('|');

    fingerprint += browserInfo;

    // 간단한 해시 생성
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }

    return 'web_' + Math.abs(hash).toString(16);
  } catch (error) {
    console.error('Failed to generate browser fingerprint:', error);
    // Fallback: 랜덤 ID 생성
    return 'web_' + Math.random().toString(36).substring(2, 15);
  }
};

/**
 * Android SSAID (Settings.Secure.ANDROID_ID)를 가져옵니다
 * iOS의 경우 identifierForVendor를 사용합니다
 * Web의 경우 브라우저 핑거프린트를 생성합니다
 */
export const getDeviceSSAID = async (): Promise<string | null> => {
  try {
    if (Platform.OS === 'web') {
      // 웹 환경: localStorage에서 저장된 ID 확인
      const storedId = await AsyncStorage.getItem('web_device_id');

      if (storedId) {
        console.log('[WEB] Using stored device ID:', storedId);
        return storedId;
      }

      // 새로운 브라우저 핑거프린트 생성
      const fingerprint = generateBrowserFingerprint();
      await AsyncStorage.setItem('web_device_id', fingerprint);
      console.log('[WEB] Generated new device ID:', fingerprint);

      return fingerprint;
    } else if (Platform.OS === 'android') {
      // Android SSAID 가져오기
      const androidId = Application.getAndroidId();
      return androidId;
    } else if (Platform.OS === 'ios') {
      // iOS는 identifierForVendor 사용
      const iosId = await Application.getIosIdForVendorAsync();
      return iosId;
    }
    return null;
  } catch (error) {
    console.error('Failed to get device SSAID:', error);
    return null;
  }
};

/**
 * AsyncStorage에 SSAID 등록 여부를 저장합니다
 */
export const setDeviceRegistered = async (isRegistered: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem('device_registered', isRegistered ? 'true' : 'false');
  } catch (error) {
    console.error('Failed to set device registration status:', error);
  }
};

/**
 * AsyncStorage에서 SSAID 등록 여부를 확인합니다
 */
export const isDeviceRegistered = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem('device_registered');
    return value === 'true';
  } catch (error) {
    console.error('Failed to check device registration status:', error);
    return false;
  }
};

/**
 * AsyncStorage에 device_id를 저장합니다
 */
export const setDeviceId = async (deviceId: number): Promise<void> => {
  try {
    await AsyncStorage.setItem('device_id', deviceId.toString());
  } catch (error) {
    console.error('Failed to set device id:', error);
  }
};

/**
 * AsyncStorage에서 device_id를 가져옵니다
 */
export const getDeviceId = async (): Promise<number | null> => {
  try {
    const value = await AsyncStorage.getItem('device_id');
    return value ? parseInt(value, 10) : null;
  } catch (error) {
    console.error('Failed to get device id:', error);
    return null;
  }
};

/**
 * 기기 정보를 가져옵니다 (선택사항)
 */
export const getDeviceInfo = async () => {
  try {
    let deviceName = 'Unknown Device';

    // 플랫폼별로 기기명 가져오기
    if (Platform.OS === 'web') {
      // 웹: 브라우저 정보 사용
      if (typeof navigator !== 'undefined') {
        deviceName = navigator.userAgent.split('(')[1]?.split(')')[0] || 'Web Browser';
      }
    } else if (Platform.OS === 'android') {
      // Android 기기명
      deviceName = 'Android Device';
    } else if (Platform.OS === 'ios') {
      // iOS 기기명
      deviceName = 'iOS Device';
    }

    return {
      deviceName: deviceName,
      deviceType: `${Platform.OS} ${Platform.Version || ''}`,
      applicationVersion: Application.nativeApplicationVersion || 'N/A',
      buildVersion: Application.nativeBuildVersion || 'N/A',
    };
  } catch (error) {
    console.error('Failed to get device info:', error);
    return {
      deviceName: 'Unknown Device',
      deviceType: `${Platform.OS}`,
      applicationVersion: 'N/A',
      buildVersion: 'N/A',
    };
  }
};
