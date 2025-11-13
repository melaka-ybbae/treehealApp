import { scaleFont, scaleSpacing, scale } from "../utils/scaling";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#19CD72',
    padding: scaleSpacing(30),
    paddingTop: scaleSpacing(60),
    alignItems: 'center',
  },
  title: {
    fontSize: scaleFont(32),
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: scaleSpacing(8),
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: '#ffffff',
    opacity: 0.9,
  },
  content: {
    padding: scaleSpacing(20),
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: scale(12),
    padding: scaleSpacing(20),
    marginBottom: scaleSpacing(16),
    shadowColor: '#000',
    shadowOffset: {
      width: scale(0),
      height: scale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: scaleFont(20),
    fontWeight: '600',
    color: '#333333',
    marginBottom: scaleSpacing(12),
  },
  cardText: {
    fontSize: scaleFont(15),
    color: '#666666',
    lineHeight: 22,
  },
});
