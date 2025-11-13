import { scaleFont, scaleSpacing, scale } from "../utils/scaling";
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19CD72', // Fallback color
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
    paddingHorizontal: scaleSpacing(60),
  },
  logoTreeImage: {
    width: scale(264),
    height: scale(264),
    // marginBottom: -40, // 간격을 최대한 줄이기 위해 음수 마진
  },
  logoTextImage: {
    width: scale(368),
    height: scale(200),
    // marginTop: -40, // 나무 이미지와 겹치도록
  },
});
