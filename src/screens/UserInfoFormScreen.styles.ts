import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 60,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 50,
  },
  formRow: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 50, // 연락처와의 간격
  },
  formGroupHalf: {
    flex: 1,
  },
  label: {
    fontSize: 36,
    color: '#6B7280',
    marginBottom: 20,
  },
  input: {
    borderWidth: 3,
    borderColor: '#E5E7EB',
    borderRadius: 24,
    padding: 40,
    fontSize: 40,
    color: '#000',
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 40,
    borderWidth: 3,
    borderColor: '#E5E7EB',
    borderRadius: 24,
    alignItems: 'center',
  },
  genderButtonSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#F0FDF4',
  },
  genderButtonText: {
    fontSize: 36,
    color: '#6B7280',
  },
  genderButtonTextSelected: {
    color: '#059669',
    fontWeight: '600',
  },
  regionScroll: {
    marginTop: 20,
  },
  regionChip: {
    paddingVertical: 25,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 40,
    marginRight: 20,
  },
  regionChipSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#F0FDF4',
  },
  regionChipText: {
    fontSize: 32,
    color: '#6B7280',
  },
  regionChipTextSelected: {
    color: '#059669',
    fontWeight: '600',
  },
  buttonContainer: {
    padding: 60,
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 40,
    borderRadius: 24,
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
