import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 77,
    fontWeight: 'regular',
    letterSpacing: 0,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 60,
    marginTop: 80,
    paddingBottom: 100,
    alignContent: 'center',
    justifyContent: 'center'
  },
  card: {
    width: 260,
    height: 340,
    borderWidth: 4,
    borderColor: '#E5E7EB',
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardSelected: {
    borderColor: '#4CAF50',
  },
  cardTouchable: {
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameTag: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 21,
    fontWeight: '500',
    textAlign: 'center',
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
    paddingVertical: 40,
    paddingHorizontal: 50,
    borderRadius: 500,
    flex: 1,
    minWidth: 250,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
  },
  skipButton: {
    backgroundColor: '#6b7280',
    paddingVertical: 40,
    paddingHorizontal: 50,
    borderRadius: 500,
    flex: 1,
    minWidth: 250,
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
  },
});
