import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './SplashScreen.styles';

interface SplashScreenProps {
  onNext: () => void;
}

export default function SplashScreen({ onNext }: SplashScreenProps) {
  return (
    <View style={styles.container}>
      {/* Gradient Background - from-green-400 to-green-500 */}
      <LinearGradient
        colors={['#4ade80', '#22c55e']} // Tailwind green-400 to green-500
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />

      {/* Logo Content */}
      <View style={styles.content}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImage}
          resizeMode="stretch"
        />
      </View>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}
