/**
 * TreeHeal APP - Insurance Consultation Platform
 * React Native application with StyleSheet styling
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, Text, TextInput, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { activateKeepAwakeAsync } from 'expo-keep-awake';
import * as NavigationBar from 'expo-navigation-bar';
import { InsuranceProvider } from './src/context/InsuranceContext';
import InsuranceNavigator from './src/navigation/InsuranceNavigator';
import { logScalingInfo } from './src/utils/scaling';

function App() {
  const [fontsLoaded] = useFonts({
    'MinSans': require('./assets/fonts/MinSansVF.ttf'),
  });

  useEffect(() => {
    // 화면 꺼짐 방지 활성화
    activateKeepAwakeAsync();

    // Android 네비게이션 바 숨기기 (전체화면)
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
    }

    // 앱 시작 시 스케일링 정보 출력
    logScalingInfo();

    // Set default font family for all Text components after fonts are loaded
    if (Text.defaultProps == null) {
      Text.defaultProps = {};
      Text.defaultProps.style = {};
    }
    Text.defaultProps.style = { fontFamily: 'MinSansVF' };

    // Set default font family for all TextInput components
    if (TextInput.defaultProps == null) {
      TextInput.defaultProps = {};
      TextInput.defaultProps.style = {};
    }
    TextInput.defaultProps.style = { fontFamily: 'MinSansVF' };
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // 폰트 로딩 중
  }

  return (
    <SafeAreaProvider>
      <InsuranceProvider>
        <StatusBar hidden={true} />
        <InsuranceNavigator />
      </InsuranceProvider>
    </SafeAreaProvider>
  );
}

export default App;
