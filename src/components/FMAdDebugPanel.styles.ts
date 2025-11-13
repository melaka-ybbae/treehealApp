import { scaleFont, scaleSpacing, scale } from "../utils/scaling";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: '#19CD72',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: scale(0), height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 9999,
  },
  floatingButtonText: {
    fontSize: scaleFont(24),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel: {
    backgroundColor: '#fff',
    borderRadius: scale(12),
    padding: scaleSpacing(20),
    width: '80%',
    maxWidth: scale(400),
  },
  title: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    marginBottom: scaleSpacing(20),
    textAlign: 'center',
  },
  statusBox: {
    backgroundColor: '#f3f4f6',
    padding: scaleSpacing(12),
    borderRadius: scale(8),
    marginBottom: scaleSpacing(16),
  },
  statusText: {
    fontSize: scaleFont(14),
    color: '#374151',
  },
  button: {
    backgroundColor: '#19CD72',
    padding: scaleSpacing(12),
    borderRadius: scale(8),
    marginBottom: scaleSpacing(10),
  },
  closeButton: {
    backgroundColor: '#6b7280',
    marginTop: scaleSpacing(10),
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: '600',
    textAlign: 'center',
  },
});
