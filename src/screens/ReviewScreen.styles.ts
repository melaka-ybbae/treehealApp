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
  section: {
    marginBottom: 50,
  },
  label: {
    fontSize: 30,
    color: '#6B7280',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#F3F4F6',
    borderRadius: 32,
    padding: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  gender: {
    fontSize: 36,
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 32,
  },
  check: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
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
