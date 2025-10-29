/**
 * TreeHeal APP - Insurance Consultation Platform
 * React Native application with StyleSheet styling
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import InsuranceApp from './src/screens/InsuranceApp';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <InsuranceApp />
    </SafeAreaProvider>
  );
}

export default App;
