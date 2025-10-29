import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Top Image Section - h-[55vh] ~ h-[60vh]
  imageContainer: {
    height: height * 0.65, // 65vh - 동영상 영역 확대
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  // Bottom Section - rounded-t-3xl shadow-xl
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 48, // rounded-t-3xl
    borderTopRightRadius: 48,
    marginTop: -60, // -mt-6 sm:-mt-8 확대
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    position: 'relative',
    zIndex: 10,
  },
  contentInner: {
    padding: 40, // 60 → 40 (패딩 축소)
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 32, // 38 → 32 (폰트 축소)
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 30, // 50 → 30 (여백 축소)
  },
  tableContainer: {
    flex: 1,
    marginBottom: 30, // 50 → 30 (여백 축소)
  },
  table: {
    borderWidth: 2,
    borderColor: '#E5E7EB', // border-gray-200
    borderRadius: 24, // rounded-xl
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4', // bg-green-50
    paddingVertical: 20, // 30 → 20 (패딩 축소)
    paddingHorizontal: 20, // 30 → 20 (패딩 축소)
  },
  tableHeaderText: {
    fontSize: 24, // 28 → 24 (폰트 축소)
    fontWeight: '600',
    color: '#15803d', // text-green-700
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6', // border-gray-100
    paddingVertical: 10, // 28 → 18 (패딩 축소)
    paddingHorizontal: 20, // 30 → 20 (패딩 축소)
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 22, // 26 → 22 (폰트 축소)
    color: '#4B5563', // text-gray-600, text-gray-900
  },
  tableCol1: {
    flex: 2,
    paddingRight: 10,
  },
  tableCol2: {
    flex: 3,
    paddingHorizontal: 10,
  },
  tableCol3: {
    flex: 2,
    paddingHorizontal: 10,
  },
  tableCol4: {
    flex: 2,
    paddingLeft: 10,
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 24, // px-2 sm:px-3 확대
    paddingVertical: 10, // py-0.5 sm:py-1 확대
    borderRadius: 20, // rounded-full
    minWidth: 120, // min-w-[52px] sm:min-w-[60px] 확대
    alignItems: 'center',
  },
  statusBadgeBlue: {
    backgroundColor: '#DBEAFE', // bg-blue-100
  },
  statusBadgeYellow: {
    backgroundColor: '#FEF3C7', // bg-yellow-100
  },
  statusBadgeGreen: {
    backgroundColor: '#D1FAE5', // bg-green-100
  },
  statusText: {
    fontSize: 24, // text-[9px] sm:text-xs 확대
    fontWeight: '500',
    color: '#000',
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 30, // 40 → 30 (패딩 축소)
    backgroundColor: '#000', // bg-black
    borderRadius: 24, // rounded-xl
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 32, // 36 → 32 (폰트 축소)
    fontWeight: '600',
    textAlign: 'center',
  },
});
