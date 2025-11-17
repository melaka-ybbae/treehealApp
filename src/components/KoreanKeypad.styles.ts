import { StyleSheet } from 'react-native';
import { scale, scaleFont, scaleSpacing } from '../utils/scaling';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: scale(40),
    borderTopRightRadius: scale(40),
    paddingVertical: scale(40),
    paddingBottom: scale(60),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleSpacing(60),
    paddingBottom: scale(30),
  },
  headerTitle: {
    fontSize: scaleFont(48),
    fontWeight: '600',
    color: '#000',
    includeFontPadding: false,
  },
  closeButton: {
    padding: scale(10),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(10),
    marginBottom: scale(15),
  },
  button: {
    width: scale(90),
    height: scale(100),
    borderRadius: scale(15),
    backgroundColor: '#E5E7EB',
    padding: scale(3),
    overflow: 'hidden',
  },
  buttonWide: {
    width: scale(200),
  },
  buttonInner: {
    flex: 1,
    borderRadius: scale(12),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonConfirm: {
    backgroundColor: '#19CD72',
  },
  buttonShiftActive: {
    backgroundColor: '#FCD34D',
  },
  buttonText: {
    fontSize: scaleFont(44),
    color: '#000',
    fontWeight: '600',
    includeFontPadding: false,
  },
  buttonTextSmall: {
    fontSize: scaleFont(28),
    color: '#000',
    fontWeight: '600',
    includeFontPadding: false,
  },
  buttonTextConfirm: {
    color: '#fff',
  },
  buttonTextShiftActive: {
    color: '#000',
  },
});
