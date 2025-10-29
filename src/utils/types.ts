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
  consultationType: string;
  interests: string[];
  consultant: number | null;
  name: string;
  birthdate: string;
  gender: string;
  phone: string;
  region: string;
  detailedRegion: string;
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
