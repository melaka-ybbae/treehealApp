import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './SplashScreen.styles';
import { initializeDeviceRegistration } from '../services/deviceService';

interface SplashScreenProps {
  onNext: () => void;
}

export default function SplashScreen({ onNext }: SplashScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    setIsLoading(true);

    try {
      // 기기 등록 및 인증
      const success = await initializeDeviceRegistration();

      if (success) {
        console.log('기기 등록 완료, 다음 화면으로 이동');
        onNext();
      } else {
        // 등록 실패 시 경고 표시 (선택사항)
        Alert.alert(
          '알림',
          '기기 등록에 실패했습니다. 계속 진행하시겠습니까?',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '계속',
              onPress: () => onNext(),
            },
          ]
        );
      }
    } catch (error) {
      console.error('기기 등록 중 오류:', error);
      // 오류 발생 시에도 앱 사용 가능하도록 처리
      onNext();
    } finally {
      setIsLoading(false);
    }
  };

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
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleStart}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>시작하기</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
