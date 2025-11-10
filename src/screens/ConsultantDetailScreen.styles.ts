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
    padding: 60,
  },
  loadingText: {
    fontSize: 40,
    color: '#6B7280',
    marginTop: 40,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 44,
    color: '#6B7280',
    marginBottom: 60,
    textAlign: 'center',
  },
  content: {
    padding: 60,
    alignItems: 'center',
  },
  image: {
    width: 390,
    height: 510,
    borderRadius: 30,
    marginBottom: 60,
  },
  name: {
    fontSize: 50,
    fontWeight: 'regular',
    marginBottom: 80,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    marginBottom: 60,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 15,
  },
  dashedLine: {
    width: 200,
    height: 2,
    backgroundColor: '#19CD72',
  },
  sectionTitle: {
    fontSize: 30,
    color: '#059669',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  sectionText: {
    fontSize: 30,
    color: '#374151',
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#E5E7EB',
    marginVertical: 60,
  },
  expItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    marginRight: 15,
  },
  expText: {
    fontSize: 30,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 48,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 60,
    backgroundColor: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    gap: 30,
    width: '100%',
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: '#374151',
    paddingVertical: 40,
    borderRadius: 500,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#fff',
    fontSize: 46,
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 40,
    borderRadius: 500,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#fff',
    fontSize: 46,
  },
});
