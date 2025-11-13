export interface Consultant {
  id: number;
  name: string;
  image: string;
  career: string;
  experience: string[];
}

export interface RealtimeApplication {
  date: string;
  region: string;
  name: string;
  status: '상담중' | '처리중' | '처리완료';
}

export interface FormData {
  consultationType: number | string; // category_id (number) or legacy string ID
  consultationTypeName?: string; // 상담 구분 이름 (예: "보험보상상담")
  interests: string[];
  consultant: number | null;
  name: string;
  birthdate: string;
  gender: string;
  phone: string;
  region?: string; // 선택사항 (사용하지 않음)
  detailedRegion?: string; // 선택사항 (사용하지 않음)
  agreements: {
    all: boolean;
    privacy: boolean;
    terms: boolean;
    consultation: boolean;
    marketing: boolean;
  };
}

export type StepType =
  | 'splash'
  | 'realtime-applications'
  | 'consultation-type'
  | 'interests'
  | 'consultant'
  | 'consultant-detail'
  | 'user-info'
  | 'review'
  | 'confirmation';

// FM AD API Types
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  Seed: number;
  device_seed: number;
  login_id: string;
}

export interface AdItem {
  Seed: number;
  Title: string;
  Image: string;
  LinkURL: string;
}

export interface AdSettings {
  RotationType: 0 | 1; // 0: 순차 재생, 1: 랜덤 재생
  RotationWaitTime: number; // 이미지 광고 표시 시간(초)
  State: number;
}

export interface AdListResponse {
  redirect_url: string;
  setting: AdSettings;
  adList: AdItem[];
}
