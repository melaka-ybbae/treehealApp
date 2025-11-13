import { scaleFont, scaleSpacing, scale } from "../utils/scaling";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleSpacing(120),
    paddingHorizontal: scaleSpacing(60),
  },
  iconContainer: {
    width: scale(240),
    height: scale(240),
    borderRadius: scale(120),
    backgroundColor: '#19CD72',
    padding: scale(4),
    marginBottom: scaleSpacing(60),
    overflow: 'hidden',
  },
  iconContainerInner: {
    flex: 1,
    borderRadius: scale(116),
    backgroundColor: '#19CD72',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: scaleFont(77),
    fontWeight: 'regular',
    letterSpacing: 0,
  },
  text: {
    fontSize: scaleFont(40),
    color: '#6B7280',
    marginBottom: scaleSpacing(10),
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: scaleSpacing(60),
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#19CD72',
    paddingVertical: scaleSpacing(40),
    borderRadius: scale(500),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleFont(40),
    fontWeight: '600',
  },
});
