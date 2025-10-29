/**
 * TreeHeal APP - Insurance Consultation Platform
 * React Native application with StyleSheet styling
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InsuranceProvider } from './src/context/InsuranceContext';
import InsuranceNavigator from './src/navigation/InsuranceNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <InsuranceProvider>
        <StatusBar barStyle="dark-content" />
        <InsuranceNavigator />
      </InsuranceProvider>
    </SafeAreaProvider>
  );
}

export default App;
