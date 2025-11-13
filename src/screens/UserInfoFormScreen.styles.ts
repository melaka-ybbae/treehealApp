import { scaleFont, scaleSpacing, scale } from "../utils/scaling";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: scaleSpacing(60),
    alignItems: 'center',
  },
  titleContainer: {
    padding: scaleSpacing(60)
  },
  title: {
    fontSize: scaleFont(64),
    fontWeight: 'regular',
    letterSpacing: 0,
  },
  formGroup: {
    marginBottom: scaleSpacing(50),
    width: scale(900),
  },
  formRow: {
    flexDirection: 'row',
    gap: scale(30),
    marginBottom: scaleSpacing(50),
    width: scale(900),
  },
  formGroupHalf: {
    flex: 1,
  },
  label: {
    fontSize: scaleFont(28),
    color: '#000000ff',
    marginBottom: scaleSpacing(20),
  },
  inputWrapper: {
    borderRadius: scale(24),
    backgroundColor: '#E5E7EB',
    padding: scale(4),
    overflow: 'hidden',
  },
  input: {
    borderRadius: scale(20),
    backgroundColor: '#fff',
    padding: scaleSpacing(36),
    fontSize: scaleFont(40),
    color: '#000',
    borderWidth: 0,
    // @ts-ignore - Web specific property
    outlineStyle: 'none',
  } as any,
  genderButtons: {
    flexDirection: 'row',
    gap: scale(20),
  },
  genderButton: {
    flex: 1,
    borderRadius: scale(24),
    backgroundColor: '#E5E7EB',
    padding: scale(4),
    overflow: 'hidden',
  },
  genderButtonInner: {
    borderRadius: scale(20),
    backgroundColor: '#fff',
    paddingVertical: scaleSpacing(36),
    alignItems: 'center',
    overflow: 'hidden',
  },
  genderButtonSelected: {
    backgroundColor: '#19CD72',
  },
  genderButtonSelectedInner: {
    backgroundColor: '#F0FDF4',
  },
  genderButtonText: {
    fontSize: scaleFont(36),
    color: '#6B7280',
  },
  genderButtonTextSelected: {
    color: '#19CD72',
    fontWeight: '600',
  },
  regionScroll: {
    marginTop: scaleSpacing(20),
  },
  regionChip: {
    borderRadius: scale(40),
    backgroundColor: '#E5E7EB',
    padding: scale(4),
    marginRight: scaleSpacing(20),
    overflow: 'hidden',
  },
  regionChipInner: {
    borderRadius: scale(36),
    backgroundColor: '#fff',
    paddingVertical: scaleSpacing(21),
    paddingHorizontal: scaleSpacing(36),
    overflow: 'hidden',
  },
  regionChipSelected: {
    backgroundColor: '#19CD72',
  },
  regionChipSelectedInner: {
    backgroundColor: '#F0FDF4',
  },
  regionChipText: {
    fontSize: scaleFont(32),
    color: '#6B7280',
  },
  regionChipTextSelected: {
    color: '#19CD72',
    fontWeight: '600',
  },
  buttonContainer: {
    padding: scaleSpacing(60),
    borderTopWidth: scale(2),
    borderTopColor: '#E5E7EB',
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
  },
});
