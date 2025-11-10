import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import { styles } from './RealtimeApplicationsScreen.styles';

interface RealtimeApplicationsScreenProps {
  onNext: () => void;
}

// 테이블 데이터 (점 표시로 변경)
const TABLE_DATA = [
  { date: '2025-09-18', region: '충청남도 천안시', name: '손 • •', status: '상담중', showBox: false },
  { date: '2025-09-18', region: '대구광역시', name: '김 • •', status: '처리중', showBox: false },
  { date: '2025-09-18', region: '충청남도 태안군', name: '홍 • •', status: '처리중', showBox: false },
  { date: '2025-09-18', region: '경기도 성남시', name: '이 • •', status: '', showBox: true },
  { date: '2025-09-18', region: '서울특별시', name: '정 • •', status: '', showBox: true },
];

const SCREEN_HEIGHT = 1920;
const FOOTER_HEIGHT = 60;

export default function RealtimeApplicationsScreen({ onNext }: RealtimeApplicationsScreenProps) {
  const videoRef = useRef<Video>(null);

  const handleButtonPress = () => {
    onNext();
  };

  // 테이블 + 버튼 높이 계산 (대략적)
  const tableHeight = 27 + 54 + 50 + (60 * 5); // paddingTop + title + header + 5 rows
  const buttonHeight = 81 + 20; // button + marginTop
  const videoHeight = SCREEN_HEIGHT - FOOTER_HEIGHT - tableHeight - buttonHeight;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
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

          {/* Table Data */}
          {TABLE_DATA.map((row, idx) => (
            <View key={idx} style={styles.tableDataRow}>
              <Text style={[styles.tableDataCell, styles.col1]}>{row.date}</Text>
              <Text style={[styles.tableDataCell, styles.col2]}>{row.region}</Text>
              <Text style={[styles.tableDataCell, styles.col3]}>{row.name}</Text>
              <View style={styles.statusContainer}>
                {row.showBox ? (
                  <View style={styles.grayBox} />
                ) : (
                  <Text style={[styles.tableDataCell, styles.col4]}>{row.status}</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleButtonPress}
          activeOpacity={0.7}
        >
          <Text style={styles.ctaButtonText}>무료상담 신청하기 Click!</Text>
        </TouchableOpacity>

        {/* Video Section */}
        <View style={[styles.videoContainer, { height: videoHeight }]}>
          <Video
            ref={videoRef}
            style={styles.videoPlaceholder}
            source={require('../../assets/adsample.mp4')}
            resizeMode={ResizeMode.COVER}
            isLooping={true}
            shouldPlay={true}
            isMuted={true}
            volume={1.0}
            rate={1.0}
          />
        </View>
      </View>

      {/* Bottom Contact - Fixed */}
      <View style={styles.bottomContact}>
        <Text style={styles.contactText}>광고 및 제휴문의 대표번호 1833-8859</Text>
      </View>
    </SafeAreaView>
  );
}
