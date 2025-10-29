import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { CONSULTANTS } from '../utils/constants';
import { useInsurance } from '../context/InsuranceContext';
import { styles } from './ConsultantSelectionScreen.styles';

interface ConsultantSelectionScreenProps {
  onNext: () => void;
}

export default function ConsultantSelectionScreen({ onNext }: ConsultantSelectionScreenProps) {
  const { formData, updateFormData } = useInsurance();

  const handleSelect = (consultantId: number) => {
    updateFormData({ consultant: consultantId });
    onNext();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>상담 받고 싶은</Text>
      <Text style={styles.title}>전문가를 선택해주세요.</Text>
      <View style={styles.grid}>
        {CONSULTANTS.map((consultant) => (
          <TouchableOpacity
            key={consultant.id}
            onPress={() => handleSelect(consultant.id)}
            style={styles.card}
          >
            <Image
              source={{ uri: consultant.image }}
              style={[
                styles.image,
                formData.consultant === consultant.id && styles.imageSelected,
              ]}
            />
            <View style={styles.nameTag}>
              <Text style={styles.nameText}>{consultant.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
