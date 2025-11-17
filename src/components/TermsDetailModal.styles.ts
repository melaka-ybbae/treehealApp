import { StyleSheet } from 'react-native';
import { scaleFont, scaleSpacing, scale } from '../utils/scaling';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleSpacing(40),
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: scale(24),
    width: '100%',
    maxHeight: '90%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scaleSpacing(40),
    borderBottomWidth: scale(2),
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: scaleFont(44),
    fontWeight: '600',
    color: '#111',
    flex: 1,
    includeFontPadding: false,
  },
  requiredBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: scaleSpacing(16),
    paddingVertical: scaleSpacing(8),
    borderRadius: scale(12),
    marginLeft: scaleSpacing(16),
  },
  requiredText: {
    color: '#fff',
    fontSize: scaleFont(24),
    fontWeight: '600',
    includeFontPadding: false,
  },
  contentContainer: {
    maxHeight: '70%',
    padding: scaleSpacing(40),
  },
  content: {
    fontSize: scaleFont(32),
    color: '#374151',
    includeFontPadding: false,
  },
  closeButton: {
    backgroundColor: '#19CD72',
    margin: scaleSpacing(40),
    marginTop: scaleSpacing(20),
    paddingVertical: scaleSpacing(32),
    borderRadius: scale(24),
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: scaleFont(36),
    fontWeight: '600',
    includeFontPadding: false,
  },
});
