import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50', // Fallback color
    position: 'relative',
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
  logoTreeImage: {
    width: 264,
    height: 264,
    // marginBottom: -40, // 간격을 최대한 줄이기 위해 음수 마진
  },
  logoTextImage: {
    width: 368,
    height: 200,
    // marginTop: -40, // 나무 이미지와 겹치도록
  },
});
