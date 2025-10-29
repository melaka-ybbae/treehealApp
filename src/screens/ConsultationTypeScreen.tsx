import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CONSULTATION_TYPES } from '../utils/constants';
import { DynamicIcon } from '../components/Icons';
import { useInsurance } from '../context/InsuranceContext';
import { styles } from './ConsultationTypeScreen.styles';

interface ConsultationTypeScreenProps {
  onNext: () => void;
}

export default function ConsultationTypeScreen({ onNext }: ConsultationTypeScreenProps) {
  const { formData, updateFormData } = useInsurance();

  const handleSelect = (typeId: string) => {
    updateFormData({ consultationType: typeId });
  };

  const isValid = formData.consultationType !== '';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>상담 받고 싶은</Text>
      <Text style={styles.title}>항목을 선택해 주세요.</Text>
      <View style={styles.optionsRow}>
        {CONSULTATION_TYPES.map((type) => (
          <TouchableOpacity
            key={type.id}
            onPress={() => handleSelect(type.id)}
            style={[
              styles.optionCard,
              formData.consultationType === type.id && styles.optionCardSelected,
            ]}
          >
            <View
              style={[
                styles.iconCircle,
                formData.consultationType === type.id && styles.iconCircleSelected,
              ]}
            >
              <DynamicIcon
                name={type.icon as any}
                size={80}
                color={formData.consultationType === type.id ? '#fff' : '#666'}
              />
            </View>
            <Text style={styles.optionLabel}>{type.label}</Text>
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
