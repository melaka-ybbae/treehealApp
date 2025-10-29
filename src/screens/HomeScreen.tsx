import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './HomeScreen.styles';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TreeHeal APP</Text>
        <Text style={styles.subtitle}>Welcome to your React Native app</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Getting Started</Text>
          <Text style={styles.cardText}>
            This is a React Native app using StyleSheet for styling instead of Tailwind.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Features</Text>
          <Text style={styles.cardText}>
            - TypeScript support{'\n'}
            - Separate StyleSheet files{'\n'}
            - Clean component structure{'\n'}
            - Ready for development
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
