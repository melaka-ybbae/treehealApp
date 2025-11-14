import { scaleFont, scaleSpacing, scale } from "../utils/scaling";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    padding: scaleSpacing(60),
    maxHeight: '80%',
  },
  handle: {
    width: scale(120),
    height: scale(10),
    backgroundColor: '#E5E7EB',
    borderRadius: scale(5),
    alignSelf: 'center',
    marginBottom: scaleSpacing(40),
  },
  title: {
    fontSize: scaleFont(46),
    fontWeight: '600',
    marginBottom: scaleSpacing(50),
    includeFontPadding: false,
  },
  list: {
    marginBottom: scaleSpacing(50),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaleSpacing(100),
  },
  loadingText: {
    marginTop: scaleSpacing(30),
    fontSize: scaleFont(32),
    color: '#6B7280',
    includeFontPadding: false,
  },
  itemAll: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleSpacing(30),
    backgroundColor: '#F9FAFB',
    borderRadius: scale(24),
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleSpacing(30),
    flex: 1,
  },
  viewButton: {
    paddingHorizontal: scaleSpacing(30),
    paddingVertical: scaleSpacing(20),
    backgroundColor: '#F3F4F6',
    borderRadius: scale(16),
    marginRight: scaleSpacing(30),
  },
  viewButtonText: {
    fontSize: scaleFont(28),
    fontWeight: '500',
    color: '#4B5563',
    includeFontPadding: false,
  },
  divider: {
    height: scale(2),
    backgroundColor: '#E5E7EB',
    marginVertical: scaleSpacing(30),
  },
  checkbox: {
    width: scale(50),
    height: scale(50),
    borderWidth: 3,
    borderColor: '#D1D5DB',
    borderRadius: scale(10),
    marginRight: scaleSpacing(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#19CD72',
    borderColor: '#19CD72',
  },
  text: {
    fontSize: scaleFont(32),
    color: '#111827',
    flex: 1,
    includeFontPadding: false,
  },
  required: {
    fontSize: scaleFont(28),
    color: '#19CD72',
    includeFontPadding: false,
  },
  optional: {
    fontSize: scaleFont(28),
    color: '#9CA3AF',
    includeFontPadding: false,
  },
  buttons: {
    flexDirection: 'row',
    gap: scale(30),
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: scaleSpacing(35),
    borderRadius: scale(24),
    alignItems: 'center',
  },
  buttonCancelText: {
    color: '#374151',
    fontSize: scaleFont(36),
    fontWeight: '600',
    includeFontPadding: false,
  },
  buttonSubmit: {
    flex: 1,
    backgroundColor: '#19CD72',
    paddingVertical: scaleSpacing(35),
    borderRadius: scale(24),
    alignItems: 'center',
  },
  buttonSubmitDisabled: {
    backgroundColor: '#D1D5DB',
  },
  buttonSubmitText: {
    color: '#fff',
    fontSize: scaleFont(36),
    fontWeight: '600',
    includeFontPadding: false,
  },
});
