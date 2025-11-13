/**
 * FM AD API 설정
 *
 * 실제 계정 정보로 변경하세요!
 */

export const FMAD_CONFIG = {
  // API Base URL
  BASE_URL: 'https://fmad.fittingmonster.com/api/v1',

  // 기본 관리자 계정 (실제 계정으로 변경 필요)
  DEFAULT_ADMIN_ID: 'etest_company',
  DEFAULT_ADMIN_PASSWORD: 'etest_company',

  // 개발 모드 (true: 광고 로드 실패 시 기본 비디오 사용)
  DEV_MODE: true,

  // 광고 재생 통계 업데이트 주기 (밀리초)
  UPDATE_INTERVAL: 10 * 60 * 1000, // 10분
};
