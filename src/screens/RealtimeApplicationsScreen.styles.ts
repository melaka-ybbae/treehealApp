import { scaleFont, scaleSpacing, scale } from "../utils/scaling";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: '#19CD72',
  },
  content: {
    flex: 1,
    paddingTop: scaleSpacing(27),
  },

  // Table Card
  tableCard: {
    width: scale(1000),
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    marginHorizontal: scaleSpacing(40),
  },

  // Card Title (카드 내부 상단)
  cardTitle: {
    fontSize: scaleFont(34),
    fontWeight: '400',
    textAlign: 'center',
    color: '#19CD72',
    paddingTop: scaleSpacing(20),
    paddingBottom: scaleSpacing(20),
  },

  // Table Header
  tableHeaderRow: {
    flexDirection: 'row',
    height: scale(50),
    backgroundColor: 'rgba(25, 205, 114, 0.1)',
    alignItems: 'center',
    paddingHorizontal: scaleSpacing(20),
  },
  tableHeaderCell: {
    fontSize: scaleFont(28),
    fontWeight: '400',
    color: '#19CD72',
    textAlign: 'center',
  },

  // Table ScrollView
  tableScrollView: {
    height: scale(300), // 5개 행 표시 (60px * 5)
  },

  // Table Data Row
  tableDataRow: {
    flexDirection: 'row',
    height: scale(60), // 고정 높이 (스크롤 계산용)
    paddingHorizontal: scaleSpacing(20),
    alignItems: 'center',
  },
  tableDataCell: {
    fontSize: scaleFont(28),
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
    lineHeight: 40,
  },

  // 지급완료 상태 (반짝임 효과만)
  completedStatus: {
    fontWeight: '400',
  },

  // Status Container (상태 + 회색 박스를 담는 컨테이너)
  statusContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Gray Box (4, 5번째 행 가운데)
  grayBox: {
    width: scale(159),
    height: scale(36),
    backgroundColor: '#D9D9D9',
  },

  // Column widths
  col1: {
    flex: 2, // 날짜
  },
  col2: {
    flex: 3, // 지역
  },
  col3: {
    flex: 2, // 이름
  },
  col4: {
    flex: 3, // 보험금 접수현황
  },

  // CTA Button
  ctaButton: {
    width: scale(1000),
    height: scale(81),
    backgroundColor: 'black',
    borderWidth: 3,
    borderColor: '#19CD72',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSpacing(0),
    marginBottom: -60,
    marginHorizontal: scaleSpacing(40),
    zIndex: 10, // 동영상 위에 표시
    elevation: 10, // Android에서도 위에 표시
  },
  ctaButtonText: {
    fontSize: scaleFont(47),
    fontWeight: '400',
    color: '#19CD72',
    textAlign: 'center',
  },

  // Video Section (버튼과 푸터 사이 꽉 차게, 좌우 패딩 없음)
  videoContainer: {
    width: '100%', // 전체 너비
    marginTop: scaleSpacing(20),
    flex: 1, // 남은 공간 모두 차지
    minHeight: 400, // 최소 높이 설정
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%', // 컨테이너 높이 꽉 채우기
    backgroundColor: '#D9D9D9',
  },

  // Loading Container
  loadingContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: scaleFont(32),
    fontWeight: '400',
    color: '#19CD72',
    marginTop: scaleSpacing(20),
  },

  // Bottom Contact - Fixed at bottom
  bottomContact: {
    position: 'absolute',
    bottom: 20, // 더 낮춤 (0 -> 20)
    left: 0,
    right: 0,
    width: scale(1080),
    height: scale(50), //
    backgroundColor: '#19CD72',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactText: {
    fontSize: scaleFont(28),
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
    lineHeight: 80, // 높이와 동일하게 설정해서 가운데 정렬
  },
});
