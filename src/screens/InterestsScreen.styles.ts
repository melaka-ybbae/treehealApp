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
  tip: {
    fontSize: scaleFont(32),
    color: '#19CD72',
    marginTop: scaleSpacing(45),
    marginBottom: scaleSpacing(184),
    includeFontPadding: false,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scaleSpacing(70),
    justifyContent: 'center'
  },
  card: {
    width: scale(400),
    height: scale(400),
    borderRadius: scale(40),
    backgroundColor: '#E5E7EB',
    padding: scale(3),
    overflow: 'hidden',
    alignContent: 'center'
  },
  cardInner: {
    flex: 1,
    borderRadius: scale(36),
    backgroundColor: '#fff',
    padding: scaleSpacing(56),
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  cardSelected: {
    backgroundColor: '#19CD72',
  },
  cardSelectedInner: {
    backgroundColor: '#F0FDF4',
  },
  cardPressed: {
    opacity: 0.8,
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
  label: {
    fontSize: scaleFont(36),
    marginTop: scaleSpacing(30),
    includeFontPadding: false,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: scaleSpacing(60),
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
