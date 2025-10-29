import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 120,
    paddingHorizontal: 60,
  },
  iconContainer: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  text: {
    fontSize: 40,
    color: '#6B7280',
    marginBottom: 10,
  },
  note: {
    backgroundColor: '#F0FDF4',
    borderRadius: 24,
    padding: 40,
    marginTop: 80,
  },
  noteText: {
    fontSize: 36,
    color: '#059669',
  },
  bold: {
    fontWeight: 'bold',
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
  buttonText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '600',
  },
});
