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
    padding: 60,
    maxHeight: '80%',
  },
  handle: {
    width: 120,
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 46,
    fontWeight: '600',
    marginBottom: 50,
  },
  list: {
    marginBottom: 50,
  },
  itemAll: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
  },
  divider: {
    height: 2,
    backgroundColor: '#E5E7EB',
    marginVertical: 30,
  },
  checkbox: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    marginRight: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  text: {
    fontSize: 32,
    color: '#111827',
    flex: 1,
  },
  required: {
    fontSize: 28,
    color: '#059669',
  },
  optional: {
    fontSize: 28,
    color: '#9CA3AF',
  },
  buttons: {
    flexDirection: 'row',
    gap: 30,
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 35,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonCancelText: {
    color: '#374151',
    fontSize: 36,
    fontWeight: '600',
  },
  buttonSubmit: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 35,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonSubmitDisabled: {
    backgroundColor: '#D1D5DB',
  },
  buttonSubmitText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '600',
  },
});
