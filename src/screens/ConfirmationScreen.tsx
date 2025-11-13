import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckIcon } from '../components/Icons';
import { styles } from './ConfirmationScreen.styles';

interface ConfirmationScreenProps {
  onComplete: () => void;
}

export default function ConfirmationScreen({ onComplete }: ConfirmationScreenProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconContainerInner}>
            <CheckIcon size={120} color="#fff" />
          </View>
        </View>
        <Text style={styles.title}>상담 신청 완료</Text>
        <Text style={styles.text}>전문상담사가 곧 연락드려 상담을 도와드립니다.</Text>
        <Text style={styles.text}>빠르고 정확한 상담을 위해 잠시만 기다려주세요.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onComplete}>
          <Text style={styles.buttonText}>{countdown}초 후 닫힘</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
