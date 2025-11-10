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
