import { scaleFont, scaleSpacing, scale } from "../utils/scaling";
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleSpacing(60),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: scaleFont(77),
    fontWeight: 'regular',
    letterSpacing: 0,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(60),
    marginTop: scaleSpacing(80),
    paddingBottom: scaleSpacing(100),
    alignContent: 'center',
    justifyContent: 'center'
  },
  card: {
    width: scale(260),
    height: scale(340),
    borderWidth: 4,
    borderColor: '#E5E7EB',
    borderRadius: scale(32),
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardSelected: {
    borderColor: '#19CD72',
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
    paddingVertical: scaleSpacing(15),
    marginHorizontal: scaleSpacing(20),
    paddingHorizontal: scaleSpacing(20),
    borderRadius: scale(50),
    alignItems: 'center',
  },
  nameText: {
    fontSize: scaleFont(21),
    fontWeight: '500',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: scaleSpacing(60),
  },
  loadingText: {
    fontSize: scaleFont(32),
    color: '#666',
    marginTop: scaleSpacing(30),
    textAlign: 'center',
  },
  emptyText: {
    fontSize: scaleFont(36),
    color: '#666',
    textAlign: 'center',
    marginBottom: scaleSpacing(40),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: scale(30),
    marginTop: scaleSpacing(20),
    width: '100%',
    paddingHorizontal: scaleSpacing(40),
  },
  retryButton: {
    backgroundColor: '#19CD72',
    paddingVertical: scaleSpacing(40),
    paddingHorizontal: scaleSpacing(50),
    borderRadius: scale(500),
    flex: 1,
    minWidth: 250,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: scaleFont(40),
    fontWeight: '600',
    textAlign: 'center',
  },
  skipButton: {
    backgroundColor: '#6b7280',
    paddingVertical: scaleSpacing(40),
    paddingHorizontal: scaleSpacing(50),
    borderRadius: scale(500),
    flex: 1,
    minWidth: 250,
  },
  skipButtonText: {
    color: '#fff',
    fontSize: scaleFont(40),
    fontWeight: '600',
    textAlign: 'center',
  },
});
