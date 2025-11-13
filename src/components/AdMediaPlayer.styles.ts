import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clickable: {
    cursor: 'pointer',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9, // 기본 비율, 실제 비디오 비율에 맞게 조정됨
  },
});
