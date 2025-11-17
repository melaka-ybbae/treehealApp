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
    gap: scale(20),
    marginBottom: scale(20),
  },
  button: {
    width: scale(200),
    height: scale(120),
    borderRadius: scale(20),
    backgroundColor: '#E5E7EB',
    padding: scale(3),
    overflow: 'hidden',
  },
  buttonInner: {
    flex: 1,
    borderRadius: scale(17),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonConfirm: {
    backgroundColor: '#19CD72',
  },
  buttonText: {
    fontSize: scaleFont(56),
    color: '#000',
    fontWeight: '600',
    includeFontPadding: false,
  },
  buttonTextConfirm: {
    color: '#fff',
  },
});
