import { scaleFont, scaleSpacing, scale } from "../utils/scaling";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#19CD72',
    paddingVertical: scaleSpacing(14),
    paddingHorizontal: scaleSpacing(24),
    borderRadius: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonSecondary: {
    backgroundColor: '#2196F3',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#19CD72',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    borderColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#ffffff',
  },
  buttonTextOutline: {
    color: '#19CD72',
  },
  buttonTextDisabled: {
    color: '#666666',
  },
});
