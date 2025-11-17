import { StyleSheet } from 'react-native';
import { scaleFont, scaleSpacing, scale } from '../utils/scaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleSpacing(60),
    backgroundColor: '#fff',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: scaleFont(40),
    color: '#6B7280',
    marginTop: scaleSpacing(40),
    includeFontPadding: false,
  },
  emptyText: {
    fontSize: scaleFont(44),
    color: '#6B7280',
    marginBottom: scaleSpacing(60),
    textAlign: 'center',
    includeFontPadding: false,
  },
  title: {
    fontSize: scaleFont(77),
    fontWeight: 'regular',
    letterSpacing: 0,
    includeFontPadding: false,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: scaleSpacing(70),
    marginTop: scaleSpacing(270),
    justifyContent: 'center',
    // alignItems: 'center',
  },
  optionCard: {
    width: scale(400),
    height: scale(400),
    borderRadius: scale(40),
    backgroundColor: '#E5E7EB',
    padding: scale(4),
    overflow: 'hidden',
    alignContent: 'center'
  },
  optionCardInner: {
    flex: 1,
    borderRadius: scale(36),
    backgroundColor: '#fff',
    padding: scaleSpacing(56),
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  optionCardSelected: {
    backgroundColor: '#19CD72',
  },
  optionCardSelectedInner: {
    backgroundColor: '#F0FDF4',
  },
  iconCircle: {
    width: scale(150),
    height: scale(150),
    borderRadius: scale(75),
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scaleSpacing(30),
    overflow: 'hidden',
  },
  iconCircleSelected: {
    backgroundColor: '#19CD72',
  },
  optionLabel: {
    fontSize: scaleFont(36),
    textAlign: 'center',
    marginTop: scaleSpacing(30),
    includeFontPadding: false,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: scaleSpacing(60),
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#19CD72',
    paddingVertical: scaleSpacing(40),
    borderRadius: scale(500),
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleFont(40),
    fontWeight: '600',
    includeFontPadding: false,
  },
});
