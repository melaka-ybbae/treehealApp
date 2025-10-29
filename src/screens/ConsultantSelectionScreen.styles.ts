import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 30,
    marginTop: 80,
    paddingBottom: 100,
  },
  card: {
    width: (width - 180) / 3,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 32,
  },
  imageSelected: {
    borderWidth: 4,
    borderColor: '#4CAF50',
  },
  nameTag: {
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  nameText: {
    fontSize: 30,
    fontWeight: '500',
  },
});
