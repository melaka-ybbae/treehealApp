import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './SplashScreen.styles';
import { initializeDeviceRegistration } from '../services/deviceService';
import { initializeAuth } from '../services/fmadAuthService';
import LogoTree from '../../assets/logo_tree.svg';
import LogoText from '../../assets/logo_text.svg';

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
    console.log('[SplashScreen] 애니메이션 시작');

    // 1. 로고 페이드인 (0.5초 대기 후 0.6초 동안)
    await new Promise<void>(resolve => setTimeout(() => resolve(), 700));
    console.log('[SplashScreen] 로고 페이드인 시작');
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => console.log('[SplashScreen] 로고 페이드인 완료'));

    // 2. 글씨 페이드인 (로고 시작 후 0.3초 대기 후 0.6초 동안)
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
    console.log('[SplashScreen] 텍스트 페이드인 시작');
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => console.log('[SplashScreen] 텍스트 페이드인 완료'));

    // 3. 기기 등록 처리 (백그라운드에서 실행)
    initializeDeviceRegistration()
      .then(success => {
        if (success) {
          console.log('기기 등록 완료');
        } else {
          console.log('기기 등록 실패, 계속 진행');
        }
      })
      .catch(error => console.error('기기 등록 중 오류:', error));

    // 4. FM AD 인증 처리 (백그라운드에서 실행)
    initializeAuth()
      .then(authSuccess => {
        if (authSuccess) {
          console.log('FM AD 인증 완료');
        } else {
          console.log('FM AD 인증 실패, 광고 없이 진행');
        }
      })
      .catch(error => console.error('FM AD 인증 중 오류:', error));

    // 5. 최소 2초 표시 후 페이드아웃
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));

    // 6. 전체 화면 페이드아웃 (0.5초)
    console.log('[SplashScreen] 화면 페이드아웃 시작');
    Animated.timing(screenOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      console.log('[SplashScreen] 화면 페이드아웃 완료, 다음 화면으로 이동');
      // 애니메이션 완료 후 다음 화면으로 이동
      onNext();
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      {/* Gradient Background - from-green-400 to-green-500 */}
      <LinearGradient
        colors={['#19CD72', '#19CD72']} // Tailwind green-400 to green-500
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />

      {/* Logo Content */}
      <View style={styles.content}>
        <Animated.View style={{ opacity: logoOpacity }}>
          <LogoTree width={264} height={264} />
        </Animated.View>

        <Animated.View style={{ opacity: textOpacity }}>
          <LogoText width={368} height={200} />
        </Animated.View>
      </View>
    </Animated.View>
  );
}
