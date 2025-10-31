import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    width: 400,
    height: 400,
    borderRadius: 40,
    marginBottom: 60,
  },
  name: {
    fontSize: 58,
    fontWeight: '600',
    marginBottom: 80,
  },
  section: {
    width: '100%',
    marginBottom: 60,
  },
  sectionTitle: {
    fontSize: 36,
    color: '#059669',
    marginBottom: 30,
  },
  sectionText: {
    fontSize: 40,
    color: '#374151',
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
  },
  bullet: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    marginRight: 30,
  },
  expText: {
    fontSize: 40,
    color: '#374151',
  },
  buttons: {
    flexDirection: 'row',
    gap: 30,
    width: '100%',
    marginTop: 80,
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: '#374151',
    paddingVertical: 40,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '600',
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 40,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '600',
  },
});
