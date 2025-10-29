import { Consultant, RealtimeApplication } from './types';

export const CONSULTATION_TYPES = [
  { id: 'claim', label: '보험금 청구 상담', icon: 'activity' },
  { id: 'free', label: '무료 보험 상담', icon: 'heart' },
];

export const INTEREST_OPTIONS = [
  { id: 'actual', label: '실손보험', icon: 'shield' },
  { id: 'surgery', label: '수술비', icon: 'activity' },
  { id: 'diagnosis', label: '진단비', icon: 'heart' },
  { id: 'other', label: '기타상담', icon: 'users' },
];

export const CONSULTANTS: Consultant[] = [
  {
    id: 1,
    name: '김철수',
    image: 'https://images.unsplash.com/photo-1548454782-15b189d129ab',
    career: '메리츠화재 TC 실장',
    experience: ['안전보험 재직', '삼성보험 재직', '현대보험 재직', '연금보험 자격'],
  },
  {
    id: 2,
    name: '이영희',
    image: 'https://images.unsplash.com/photo-1758518727888-ffa196002e59',
    career: '삼성생명 지점장',
    experience: ['KB손해보험 재직', '현대해상 재직', '변액보험 자격', '펀드투자 자격'],
  },
  {
    id: 3,
    name: '박민수',
    image: 'https://images.unsplash.com/photo-1661854236305-b02cef4aa0af',
    career: '한화생명 팀장',
    experience: ['동양생명 재직', '교보생명 재직', '종합보험 자격', '자산관리 자격'],
  },
  {
    id: 4,
    name: '최지연',
    image: 'https://images.unsplash.com/photo-1740153204804-200310378f2f',
    career: 'DB손해보험 부장',
    experience: ['NH농협 재직', 'AIA생명 재직', '실버보험 자격', '노후설계 자격'],
  },
  {
    id: 5,
    name: '정태양',
    image: 'https://images.unsplash.com/photo-1723537742563-15c3d351dbf2',
    career: 'KB손해보험 과장',
    experience: ['현대해상 재직', 'AXA손해보험 재직', '자동차보험 자격', '화재보험 자격'],
  },
  {
    id: 6,
    name: '강민아',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    career: '교보생명 차장',
    experience: ['흥국생명 재직', '라이나생명 재직', '어린이보험 자격', '연금설계 자격'],
  },
  {
    id: 7,
    name: '윤상훈',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    career: '흥국화재 실장',
    experience: ['롯데손해보험 재직', '하나손해보험 재직', '여행보험 자격', '배상책임 자격'],
  },
  {
    id: 8,
    name: '서유진',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5',
    career: 'NH생명 팀장',
    experience: ['MG손해보험 재직', '캐롯손해보험 재직', '태아보험 자격', 'CI보험 자격'],
  },
  {
    id: 9,
    name: '한동욱',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    career: 'AIA생명 부장',
    experience: ['푸르덴셜생명 재직', '신한라이프 재직', '보장분석 자격', '재무설계 자격'],
  },
  {
    id: 10,
    name: '조은비',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    career: '동부화재 차장',
    experience: ['처브손해보험 재직', 'ACE손해보험 재직', '상해보험 자격', '질병보험 자격'],
  },
];

export const REALTIME_APPLICATIONS: RealtimeApplication[] = [
  { date: '2025-09-18', region: '충청남도 천안시', name: '손 ••', status: '상담중' },
  { date: '2025-09-18', region: '대구광역시', name: '김 ••', status: '처리중' },
  { date: '2025-09-18', region: '충청남도 태안군', name: '박 ••', status: '처리중' },
  { date: '2025-09-18', region: '경기도 성남시', name: '이 ••', status: '처리완료' },
  { date: '2025-09-18', region: '서울특별시', name: '정 ••', status: '처리완료' },
];

export const KOREAN_REGIONS = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도',
];
