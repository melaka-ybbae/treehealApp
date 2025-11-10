import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    backgroundColor: '#fff',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 40,
    color: '#6B7280',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 44,
    color: '#6B7280',
    marginBottom: 60,
    textAlign: 'center',
  },
  title: {
    fontSize: 77,
    fontWeight: 'regular',
    letterSpacing: 0
  },
  tip: {
    fontSize: 32,
    color: '#19CD72',
    marginTop: 45,
    marginBottom: 184
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 70,
    justifyContent: 'center'
  },
  card: {
    width: 400,
    height: 400,
    padding: 60,
    borderWidth: 4,
    borderColor: '#E5E7EB',
    borderRadius: 32,
    alignItems: 'center',
  },
  cardSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#F0FDF4',
  },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  iconCircleSelected: {
    backgroundColor: '#4CAF50',
  },
  label: {
    fontSize: 36,
    marginTop: 30,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 60,
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
