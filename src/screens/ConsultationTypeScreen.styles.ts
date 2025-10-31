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
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 80,
  },
  optionCard: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 4,
    borderColor: '#E5E7EB',
    borderRadius: 32,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCardSelected: {
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
  optionLabel: {
    fontSize: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
