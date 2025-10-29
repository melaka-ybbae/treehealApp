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
  logoImage: {
    width: 640, // 피그마 max-w-[320px]를 DID 기준으로 확대
    height: 640, // 비율 유지
  },
  button: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    right: 40,
    backgroundColor: '#fff',
    paddingVertical: 40,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonText: {
    fontSize: 44,
    fontWeight: '600',
    color: '#22c55e', // Tailwind green-500
    textAlign: 'center',
  },
});
