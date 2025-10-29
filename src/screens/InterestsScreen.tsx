import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { INTEREST_OPTIONS } from '../utils/constants';
import { DynamicIcon } from '../components/Icons';
import { useInsurance } from '../context/InsuranceContext';
import { styles } from './InterestsScreen.styles';

interface InterestsScreenProps {
  onNext: () => void;
}

export default function InterestsScreen({ onNext }: InterestsScreenProps) {
  const { formData, updateFormData } = useInsurance();

  const toggleInterest = (id: string) => {
    const newInterests = formData.interests.includes(id)
      ? formData.interests.filter((i) => i !== id)
      : [...formData.interests, id];
    updateFormData({ interests: newInterests });
  };

  const isValid = formData.interests.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>상담 받고 싶은</Text>
      <Text style={styles.title}>분야를 모두 선택해주세요.</Text>
      <View style={styles.grid}>
        {INTEREST_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => toggleInterest(option.id)}
            style={[
              styles.card,
              formData.interests.includes(option.id) && styles.cardSelected,
            ]}
          >
            <View
              style={[
                styles.iconCircle,
                formData.interests.includes(option.id) && styles.iconCircleSelected,
              ]}
            >
              <DynamicIcon
                name={option.icon as any}
                size={60}
                color={formData.interests.includes(option.id) ? '#fff' : '#666'}
              />
            </View>
            <Text style={styles.label}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={onNext}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>계속하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
