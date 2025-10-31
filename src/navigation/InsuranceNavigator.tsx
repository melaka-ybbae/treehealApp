import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from '../components/Icons';

import SplashScreen from '../screens/SplashScreen';
import RealtimeApplicationsScreen from '../screens/RealtimeApplicationsScreen';
import ConsultationTypeScreen from '../screens/ConsultationTypeScreen';
import InterestsScreen from '../screens/InterestsScreen';
import ConsultantSelectionScreen from '../screens/ConsultantSelectionScreen';
import ConsultantDetailScreen from '../screens/ConsultantDetailScreen';
import UserInfoFormScreen from '../screens/UserInfoFormScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';

type StepType =
  | 'splash'
  | 'realtime'
  | 'consultationType'
  | 'interests'
  | 'consultant'
  | 'consultantDetail'
  | 'userInfo'
  | 'review'
  | 'confirmation';

export default function InsuranceNavigator() {
  const [currentStep, setCurrentStep] = useState<StepType>('splash');

  const handleNext = (skipDetail?: boolean) => {
    const steps: StepType[] = [
      'splash',
      'realtime',
      'consultationType',
      'interests',
      'consultant',
      'consultantDetail',
      'userInfo',
      'review',
      'confirmation',
    ];
    const currentIndex = steps.indexOf(currentStep);

    // consultant 화면에서 skipDetail이 true면 consultantDetail 건너뛰기
    if (currentStep === 'consultant' && skipDetail) {
      setCurrentStep('userInfo');
      return;
    }

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: StepType[] = [
      'splash',
      'realtime',
      'consultationType',
      'interests',
      'consultant',
      'consultantDetail',
      'userInfo',
      'review',
      'confirmation',
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const showHeader = !['splash', 'realtime', 'confirmation'].includes(currentStep);
  const showProgress = !['splash', 'realtime', 'confirmation'].includes(currentStep);

  const getProgressPercent = () => {
    const progressSteps: StepType[] = [
      'consultationType',
      'interests',
      'consultant',
      'consultantDetail',
      'userInfo',
      'review',
    ];
    const index = progressSteps.indexOf(currentStep);
    if (index === -1) return 0;
    return ((index + 1) / progressSteps.length) * 100;
  };

  const handleComplete = () => {
    setCurrentStep('splash');
  };

  const renderScreen = () => {
    switch (currentStep) {
      case 'splash':
        return <SplashScreen onNext={handleNext} />;
      case 'realtime':
        return <RealtimeApplicationsScreen onNext={handleNext} />;
      case 'consultationType':
        return <ConsultationTypeScreen onNext={handleNext} />;
      case 'interests':
        return <InterestsScreen onNext={handleNext} />;
      case 'consultant':
        return <ConsultantSelectionScreen onNext={handleNext} />;
      case 'consultantDetail':
        return <ConsultantDetailScreen onNext={handleNext} onBack={handleBack} />;
      case 'userInfo':
        return <UserInfoFormScreen onNext={handleNext} />;
      case 'review':
        return <ReviewScreen onNext={handleNext} />;
      case 'confirmation':
        return <ConfirmationScreen onComplete={handleComplete} />;
      default:
        return <SplashScreen onNext={handleNext} />;
    }
  };

  if (!showHeader) {
    return renderScreen();
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <ChevronLeftIcon size={84} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      {showProgress && (
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { width: `${getProgressPercent()}%` }]}
          />
        </View>
      )}

      {/* Screen Content */}
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24, // 40 * 0.7 = 28 (30% 감소)
    paddingVertical: 12, // 30 * 0.7 = 21 (30% 감소)
    borderBottomWidth: 2, // 2 * 0.7 = 1.4 (30% 감소)
    borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    padding: 8,
  },
  progressBarContainer: {
    height: 16, // 10 * 0.7 = 7 (30% 감소)
    backgroundColor: '#E5E7EB',
  },
  progressBar: {
    height: 15, // 10 * 0.7 = 7 (30% 감소)
    backgroundColor: '#4CAF50',
  },
});
