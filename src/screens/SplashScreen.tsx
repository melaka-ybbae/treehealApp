import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './SplashScreen.styles';
import { initializeDeviceRegistration } from '../services/deviceService';

interface SplashScreenProps {
  onNext: () => void;
}

export default function SplashScreen({ onNext }: SplashScreenProps) {
  const logoOpacity = useRef(new Animated.Value(0)).current; // 로고 투명도
  const textOpacity = useRef(new Animated.Value(0)).current; // 글씨 투명도
  const screenOpacity = useRef(new Animated.Value(1)).current; // 전체 화면 투명도

  useEffect(() => {
    // 컴포넌트 마운트 시 애니메이션 시작
    startAnimationSequence();
  }, []);

  const startAnimationSequence = async () => {
    // 1. 로고 페이드인 (0.5초 대기 후 0.6초 동안)
    await new Promise<void>(resolve => setTimeout(() => resolve(), 700));
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // 2. 글씨 페이드인 (로고 시작 후 0.3초 대기 후 0.6초 동안)
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // 3. 기기 등록 처리
    try {
      const success = await initializeDeviceRegistration();
      if (success) {
        console.log('기기 등록 완료, 다음 화면으로 이동');
      } else {
        console.log('기기 등록 실패, 계속 진행');
      }
    } catch (error) {
      console.error('기기 등록 중 오류:', error);
    }

    // 4. 최소 2초 표시 후 페이드아웃
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));

    // 5. 전체 화면 페이드아웃 (0.5초)
    Animated.timing(screenOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // 애니메이션 완료 후 다음 화면으로 이동
      onNext();
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      {/* Gradient Background - from-green-400 to-green-500 */}
      <LinearGradient
        colors={['#4ade80', '#22c55e']} // Tailwind green-400 to green-500
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />

      {/* Logo Content */}
      <View style={styles.content}>
        <Animated.Image
          source={require('../../assets/logo_tree.svg')}
          style={[styles.logoTreeImage, { opacity: logoOpacity }]}
          resizeMode="contain"
        />

        <Animated.Image
          source={require('../../assets/logo_text.svg')}
          style={[styles.logoTextImage, { opacity: textOpacity }]}
          resizeMode="contain"
        />
      </View>
    </Animated.View>
  );
}
