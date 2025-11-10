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
  },
  emptyText: {
    fontSize: scaleFont(44),
    color: '#6B7280',
    marginBottom: scaleSpacing(60),
    textAlign: 'center',
  },
  title: {
    fontSize: 77,
    fontWeight: 'regular',
    letterSpacing: 0,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: scaleSpacing(80),
    marginTop: scaleSpacing(270),
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionCard: {
    width: 400,
    height: 400,
    borderWidth: scale(4),
    borderColor: '#E5E7EB',
    borderRadius: scale(32),
    padding: scaleSpacing(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCardSelected: {
    borderColor: '#4CAF50',
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
  },
  iconCircleSelected: {
    backgroundColor: '#4CAF50',
  },
  optionLabel: {
    fontSize: scaleFont(32),
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: scaleSpacing(60),
    borderTopWidth: scale(2),
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 40,
    borderRadius: 500,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  buttonText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '600',
  },
});
