import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckIcon } from '../components/Icons';
import { styles } from './ConfirmationScreen.styles';

interface ConfirmationScreenProps {
  onComplete: () => void;
}

export default function ConfirmationScreen({ onComplete }: ConfirmationScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckIcon size={120} color="#fff" />
        </View>
        <Text style={styles.title}>상담 신청 완료</Text>
        <Text style={styles.text}>전문가가 확인 후</Text>
        <Text style={styles.text}>빠른 시일 내에 연락드리겠습니다.</Text>
        <View style={styles.note}>
          <Text style={styles.noteText}>
            📞 평균 <Text style={styles.bold}>1-2일 이내</Text> 연락드립니다
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onComplete}>
          <Text style={styles.buttonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
