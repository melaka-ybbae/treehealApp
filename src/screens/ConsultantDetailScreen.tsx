import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { CONSULTANTS } from '../utils/constants';
import { useInsurance } from '../context/InsuranceContext';
import { styles } from './ConsultantDetailScreen.styles';

interface ConsultantDetailScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ConsultantDetailScreen({ onNext, onBack }: ConsultantDetailScreenProps) {
  const { formData } = useInsurance();

  const selectedConsultant = CONSULTANTS.find((c) => c.id === formData.consultant);

  if (!selectedConsultant) {
    return null;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Image
          source={{ uri: selectedConsultant.image }}
          style={styles.image}
        />
        <Text style={styles.name}>{selectedConsultant.name} 전문가</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>약력</Text>
          <Text style={styles.sectionText}>{selectedConsultant.career}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>자격내용</Text>
          {selectedConsultant.experience.map((exp, idx) => (
            <View key={idx} style={styles.expItem}>
              <View style={styles.bullet} />
              <Text style={styles.expText}>{exp}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonSecondary} onPress={onBack}>
            <Text style={styles.buttonSecondaryText}>다른 전문가 선택</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPrimary} onPress={onNext}>
            <Text style={styles.buttonPrimaryText}>선택완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
