import { scaleFont, scaleSpacing, scale } from "../utils/scaling";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleSpacing(60),
  },
  loadingText: {
    fontSize: scaleFont(40),
    color: '#6B7280',
    marginTop: scaleSpacing(40),
    textAlign: 'center',
    includeFontPadding: false,
  },
  emptyText: {
    fontSize: scaleFont(44),
    color: '#6B7280',
    marginBottom: scaleSpacing(60),
    textAlign: 'center',
    includeFontPadding: false,
  },
  content: {
    padding: scaleSpacing(60),
    alignItems: 'center',
  },
  image: {
    width: scale(390),
    height: scale(510),
    borderRadius: scale(30),
    marginBottom: scaleSpacing(60),
  },
  name: {
    fontSize: scaleFont(50),
    fontWeight: 'regular',
    marginBottom: scaleSpacing(80),
    textAlign: 'center',
    includeFontPadding: false,
  },
  section: {
    width: '100%',
    marginBottom: scaleSpacing(60),
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scaleSpacing(30),
    gap: scale(15),
  },
  dashedLine: {
    width: scale(200),
    height: scale(2),
    backgroundColor: '#19CD72',
  },
  sectionTitle: {
    fontSize: scaleFont(30),
    color: '#19CD72',
    textAlign: 'center',
    paddingHorizontal: scaleSpacing(10),
    includeFontPadding: false,
  },
  sectionText: {
    fontSize: scaleFont(30),
    color: '#374151',
    textAlign: 'center',
    includeFontPadding: false,
  },
  divider: {
    width: '100%',
    height: scale(2),
    backgroundColor: '#E5E7EB',
    marginVertical: scaleSpacing(60),
  },
  expItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleSpacing(30),
    justifyContent: 'center',
  },
  bullet: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(8),
    backgroundColor: '#19CD72',
    marginRight: scaleSpacing(15),
  },
  expText: {
    fontSize: scaleFont(30),
    color: '#374151',
    textAlign: 'center',
    includeFontPadding: false,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: scaleSpacing(60),
    backgroundColor: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    gap: scale(30),
    width: '100%',
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: '#374151',
    paddingVertical: scaleSpacing(40),
    borderRadius: scale(500),
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#fff',
    fontSize: scaleFont(46),
    includeFontPadding: false,
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: '#19CD72',
    paddingVertical: scaleSpacing(40),
    borderRadius: scale(500),
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#fff',
    fontSize: scaleFont(46),
    includeFontPadding: false,
  },
});
