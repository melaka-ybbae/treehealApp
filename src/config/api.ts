/**
 * API 설정 파일
 * 서버 URL을 여기서 한 번만 변경하면 모든 API 서비스에 적용됩니다
 */

// 환경별 서버 URL 설정
const API_URLS = {
  development: 'http://222.239.249.119:3000/api',
  production: 'http://222.239.249.119:3000/api',
  // 웹 개발용 (다른 포트 사용 시)
  web: 'http://222.239.249.119:3000/api',
};

// 현재 환경 감지
const getEnvironment = (): keyof typeof API_URLS => {
  // 프로덕션 여부 확인
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }

  // 개발 환경
  return 'development';
};

// API 기본 URL - APK 빌드 시 항상 프로덕션 서버 사용
export const API_BASE_URL = API_URLS['production']; // 항상 실제 서버로 연결

// API 요청 기본 설정
export const API_CONFIG = {
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
  },
};

// 개발 모드 플래그 (Mock 데이터 사용 여부)
export const DEV_MODE = false; // true로 설정 시 서버 없이 Mock 데이터 사용

console.log(`[API CONFIG] Environment: ${getEnvironment()}`);
console.log(`[API CONFIG] Base URL: ${API_BASE_URL}`);
console.log(`[API CONFIG] Dev Mode: ${DEV_MODE}`);
