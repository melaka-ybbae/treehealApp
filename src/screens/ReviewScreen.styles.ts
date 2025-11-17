import { scaleFont, scaleSpacing, scale } from "../utils/scaling";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: scaleSpacing(60),
  },
  title: {
    fontSize: scaleFont(64),
    fontWeight: 'regular',
    letterSpacing: 0,
    marginBottom: scaleSpacing(92)
  },
  section: {
    marginBottom: scaleSpacing(48),
  },
  label: {
    fontSize: scaleFont(28),
    color: '#000000ff',
    marginBottom: scaleSpacing(20),
  },
  card: {
    backgroundColor: '#19CD72',
    borderRadius: scale(30),
    padding: scale(3),
    overflow: 'hidden',
    flexDirection: 'column',
  },
  cardInner: {
    flex: 1,
    backgroundColor: '#FFFFFFF6',
    borderRadius: scale(27),
    padding: scaleSpacing(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 70,
  },
  text: {
    fontSize: scaleFont(36),
    color: '#111827',
    flex: 1,
  },
  gender: {
    fontSize: scaleFont(36),
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#19CD72',
    paddingVertical: scaleSpacing(15),
    paddingHorizontal: scaleSpacing(40),
    borderRadius: scale(32),
  },
  check: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: '#19CD72',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: scaleSpacing(60),
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
