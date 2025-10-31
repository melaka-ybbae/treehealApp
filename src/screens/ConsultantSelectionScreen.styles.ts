import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 30,
    marginTop: 80,
    paddingBottom: 100,
  },
  card: {
    width: (width - 180) / 3,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 32,
  },
  imageSelected: {
    borderWidth: 4,
    borderColor: '#4CAF50',
  },
  nameTag: {
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  nameText: {
    fontSize: 30,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 60,
  },
  loadingText: {
    fontSize: 32,
    color: '#666',
    marginTop: 30,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 36,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 40,
  },
  retryButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 35,
    paddingHorizontal: 50,
    borderRadius: 24,
    flex: 1,
    minWidth: 250,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '600',
    textAlign: 'center',
  },
  skipButton: {
    backgroundColor: '#6b7280',
    paddingVertical: 35,
    paddingHorizontal: 50,
    borderRadius: 24,
    flex: 1,
    minWidth: 250,
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '600',
    textAlign: 'center',
  },
});
