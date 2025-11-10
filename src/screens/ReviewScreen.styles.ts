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
    fontSize: 64,
    fontWeight: 'regular',
    letterSpacing: 0,
    marginBottom: 92
  },
  section: {
    marginBottom: 48,
  },
  label: {
    fontSize: 28,
    color: '#000000ff',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#19CD720D',
    borderWidth: 3,
    borderColor: '#19CD72',
    borderRadius: 30,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  text: {
    fontSize: 36,
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
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 40,
    borderRadius: 500,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '600',
  },
});
