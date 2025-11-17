import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './RealtimeApplicationsScreen.styles';
import { AdListResponse, AdItem } from '../utils/types';
import { fetchAdList, updateAdPlayTime, buildAdClickUrl, getNextAdIndex } from '../services/fmadService';
import { getStoredAuthTokens, initializeAuth, clearAuthTokens } from '../services/fmadAuthService';
import AdMediaPlayer from '../components/AdMediaPlayer';
import FMAdDebugPanel from '../components/FMAdDebugPanel';
import ShineText from '../components/ShineText';

interface RealtimeApplicationsScreenProps {
  onNext: () => void;
}

interface TableRow {
  id: string; // 고유 ID 추가
  date: string;
  region: string;
  name: string;
  status: string;
}

// 랜덤 데이터 풀
const REGIONS = [
  '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시',
  '대전광역시', '울산광역시', '세종특별자치시',
  '경기도 수원시', '경기도 성남시', '경기도 고양시', '경기도 용인시',
  '강원도 춘천시', '강원도 원주시',
  '충청북도 청주시', '충청북도 충주시',
  '충청남도 천안시', '충청남도 아산시', '충청남도 태안군',
  '전라북도 전주시', '전라북도 익산시',
  '전라남도 목포시', '전라남도 여수시',
  '경상북도 포항시', '경상북도 경주시',
  '경상남도 창원시', '경상남도 김해시', '경상남도 진주시',
  '제주특별자치도',
];

const LAST_NAMES = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권', '황', '안', '송', '류', '홍'];

const STATUSES = ['상담중', '처리중', '지급완료'];

// 오늘 날짜 포맷 (YYYY-MM-DD)
const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 랜덤 테이블 행 생성
const generateRandomRow = (): TableRow => {
  const randomRegion = REGIONS[Math.floor(Math.random() * REGIONS.length)];
  const randomLastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const randomStatus = STATUSES[Math.floor(Math.random() * STATUSES.length)];

  return {
    id: `${Date.now()}-${Math.random()}`, // 고유 ID 생성
    date: getTodayDate(),
    region: randomRegion,
    name: `${randomLastName} • •`,
    status: randomStatus,
  };
};

// 초기 테이블 데이터 생성 (50개)
const generateInitialTableData = (): TableRow[] => {
  return Array.from({ length: 50 }, () => generateRandomRow());
};

const SCREEN_HEIGHT = 1920;
const FOOTER_HEIGHT = 60;

export default function RealtimeApplicationsScreen({ onNext }: RealtimeApplicationsScreenProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [adData, setAdData] = useState<AdListResponse | null>(null);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [useFallbackVideo, setUseFallbackVideo] = useState(false);
  const [deviceSeed, setDeviceSeed] = useState<number>(0);
  const [companySeed, setCompanySeed] = useState<number>(0);
  const [tableData, setTableData] = useState<TableRow[]>(generateInitialTableData());
  const adStartTimeRef = useRef<string>(new Date().toISOString());

  // 광고 데이터 로드 및 인증 정보 로드
  useEffect(() => {
    initializeScreen();
  }, []);

  const initializeScreen = async () => {
    // 인증 토큰에서 device_seed와 company_seed 가져오기
    const tokens = await getStoredAuthTokens();
    if (tokens) {
      setDeviceSeed(tokens.device_seed);
      setCompanySeed(tokens.Seed);
    }

    // 광고 로드
    await loadAds();
  };

  // 광고 재생 시간 업데이트 (설정된 주기마다)
  useEffect(() => {
    const { FMAD_CONFIG } = require('../config/fmad.config');
    const interval = setInterval(() => {
      updatePlayTime();
    }, FMAD_CONFIG.UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // 테이블 자동 스크롤 (3초마다)
  useEffect(() => {
    const ROW_HEIGHT = 60; // 각 행의 높이
    const SCROLL_INTERVAL = 3000; // 3초
    const VISIBLE_ROWS = 5; // 화면에 보이는 행 수
    const TOTAL_ROWS = 50; // 전체 데이터 행 수
    const MAX_SCROLL = (TOTAL_ROWS - VISIBLE_ROWS) * ROW_HEIGHT; // 최대 스크롤 가능 거리
    let currentScrollY = 0;

    const interval = setInterval(() => {
      // 현재 스크롤 위치에서 ROW_HEIGHT만큼 아래로 이동
      currentScrollY += ROW_HEIGHT;

      // 끝에 도달하면 처음으로 되돌리기
      if (currentScrollY > MAX_SCROLL) {
        currentScrollY = 0;
      }

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: currentScrollY, animated: true });
      }
    }, SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // 데이터 업데이트 (1시간마다 10개 추가 및 10개 삭제)
  useEffect(() => {
    const DATA_UPDATE_INTERVAL = 60 * 60 * 1000; // 1시간 (밀리초)

    const interval = setInterval(() => {
      setTableData((prevData) => {
        // 새로운 10개 데이터 생성
        const newRows = Array.from({ length: 10 }, () => generateRandomRow());
        // 마지막 10개 삭제하고 앞에 새로운 10개 추가
        const updatedData = [...newRows, ...prevData.slice(0, -10)];
        return updatedData;
      });
    }, DATA_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const loadAds = async (retryCount = 0) => {
    try {
      const data = await fetchAdList();
      if (data && data.adList && data.adList.length > 0) {
        setAdData(data);
        setUseFallbackVideo(false);
        console.log(`[RealtimeScreen] FM AD 광고 로드 완료: ${data.adList.length}개`);
      } else {
        console.log('[RealtimeScreen] 광고 데이터 없음');

        // 첫 시도 실패 시 재인증 후 재시도
        if (retryCount === 0) {
          console.log('[RealtimeScreen] 재인증 후 광고 재로드 시도');
          const authSuccess = await initializeAuth();
          if (authSuccess) {
            return loadAds(1); // 재귀 호출 (1회만)
          }
        }

        console.log('[RealtimeScreen] 기본 비디오 사용');
        setUseFallbackVideo(true);
      }
    } catch (error) {
      console.error('[RealtimeScreen] 광고 로드 실패:', error);

      // 첫 시도 실패 시 재인증 후 재시도
      if (retryCount === 0) {
        console.log('[RealtimeScreen] 재인증 후 광고 재로드 시도');
        const authSuccess = await initializeAuth();
        if (authSuccess) {
          return loadAds(1); // 재귀 호출 (1회만)
        }
      }

      setUseFallbackVideo(true);
    }
  };

  const updatePlayTime = async () => {
    try {
      const playTime = new Date().toISOString();
      const data = await updateAdPlayTime(playTime);

      // 새로운 광고 목록이 있으면 업데이트
      if (data && data.adList && data.adList.length > 0) {
        setAdData(data);
        console.log('광고 목록 업데이트 완료');
      }
    } catch (error) {
      console.error('광고 재생 시간 업데이트 실패:', error);
    }
  };

  const handleAdComplete = () => {
    console.log('[RealtimeScreen] handleAdComplete 호출됨');
    if (!adData || !adData.adList || adData.adList.length === 0) {
      console.log('[RealtimeScreen] 광고 데이터 없음, 종료');
      return;
    }

    console.log(`[RealtimeScreen] 현재 광고 인덱스: ${currentAdIndex}, 전체 광고: ${adData.adList.length}개`);

    // 다음 광고 인덱스 계산
    const nextIndex = getNextAdIndex(
      currentAdIndex,
      adData.adList,
      adData.setting.RotationType
    );

    console.log(`[RealtimeScreen] 다음 광고 인덱스: ${nextIndex}`);
    setCurrentAdIndex(nextIndex);
  };

  const handleAdClick = async (clickUrl: string) => {
    console.log('광고 클릭:', clickUrl);
    // 클릭 이벤트 로깅 등 추가 가능
  };

  const handleButtonPress = () => {
    onNext();
  };

  // 테이블 + 버튼 높이 계산 (대략적)
  const tableHeight = 27 + 54 + 50 + (60 * 5); // paddingTop + title + header + 5 rows
  const buttonHeight = 81 + 20; // button + marginTop
  const videoHeight = SCREEN_HEIGHT - FOOTER_HEIGHT - tableHeight - buttonHeight;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.content}
        activeOpacity={1}
        onPress={handleButtonPress}
      >
        {/* Table Card */}
        <View style={styles.tableCard}>
          {/* Title inside card */}
          <Text style={styles.cardTitle}>실시간 보험금 신청자 현황</Text>

          {/* Table Header */}
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCell, styles.col1]}>날짜</Text>
            <Text style={[styles.tableHeaderCell, styles.col2]}>지역</Text>
            <Text style={[styles.tableHeaderCell, styles.col3]}>이름</Text>
            <Text style={[styles.tableHeaderCell, styles.col4]}>보험금 접수현황</Text>
          </View>

          {/* Table Data - Scrollable */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.tableScrollView}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          >
            {tableData.map((row) => (
              <View key={row.id} style={styles.tableDataRow}>
                <Text style={[styles.tableDataCell, styles.col1]}>{row.date}</Text>
                <Text style={[styles.tableDataCell, styles.col2]}>{row.region}</Text>
                <Text style={[styles.tableDataCell, styles.col3]}>{row.name}</Text>
                <View style={styles.col4}>
                  {row.status === '지급완료' ? (
                    <ShineText
                      style={[styles.tableDataCell, styles.completedStatus]}
                    >
                      {row.status}
                    </ShineText>
                  ) : (
                    <Text style={styles.tableDataCell}>
                      {row.status}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleButtonPress}
          activeOpacity={0.7}
        >
          <Text style={styles.ctaButtonText}>무료상담 신청하기 Click!</Text>
        </TouchableOpacity>

        {/* Video/Ad Section */}
        <View style={[styles.videoContainer, { height: videoHeight }]}>
          {!useFallbackVideo && adData && adData.adList && adData.adList.length > 0 ? (
            <AdMediaPlayer
              ad={adData.adList[currentAdIndex]}
              onAdComplete={handleAdComplete}
              displayDuration={adData.setting.RotationWaitTime}
              onAdClick={handleAdClick}
              clickUrl={
                adData.adList[currentAdIndex].LinkURL
                  ? buildAdClickUrl(
                      adData.redirect_url,
                      adData.adList[currentAdIndex],
                      deviceSeed,
                      companySeed
                    )
                  : ''
              }
              height={videoHeight}
            />
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#19CD72" />
              <Text style={styles.loadingText}>광고를 불러오는 중...</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Bottom Contact - Fixed */}
      <View style={styles.bottomContact}>
        <Text style={styles.contactText}>광고 및 제휴문의 대표번호 1833-8859</Text>
      </View>

      {/* Debug Panel (DEV_MODE only) */}
      <FMAdDebugPanel />
    </View>
  );
}
