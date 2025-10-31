import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { useInsurance } from '../context/InsuranceContext';
import { getExpertById, Expert } from '../services/expertService';
import { styles } from './ConsultantDetailScreen.styles';

interface ConsultantDetailScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ConsultantDetailScreen({ onNext, onBack }: ConsultantDetailScreenProps) {
  const { formData } = useInsurance();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExpertDetail();
  }, [formData.consultant]);

  const loadExpertDetail = async () => {
    if (!formData.consultant) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getExpertById(formData.consultant);

      if (data) {
        setExpert(data);
      } else {
        Alert.alert('알림', '전문가 정보를 불러올 수 없습니다.', [
          { text: '확인', onPress: onBack }
        ]);
      }
    } catch (error) {
      console.error('Failed to load expert detail:', error);
      Alert.alert('오류', '전문가 정보를 불러오는 중 오류가 발생했습니다.', [
        { text: '확인', onPress: onBack }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#00AC46" />
        <Text style={styles.loadingText}>전문가 정보 불러오는 중...</Text>
      </View>
    );
  }

  if (!expert) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.emptyText}>전문가 정보를 찾을 수 없습니다</Text>
        <TouchableOpacity style={styles.buttonPrimary} onPress={onBack}>
          <Text style={styles.buttonPrimaryText}>뒤로 가기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // qualifications를 배열로 변환 (쉼표로 구분된 문자열인 경우)
  const qualificationsList = expert.qualifications
    ? expert.qualifications.split(',').map(q => q.trim())
    : [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Image
          source={{ uri: expert.profile_image }}
          style={styles.image}
        />
        <Text style={styles.name}>{expert.expert_name} 전문가</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>전문 분야</Text>
          <Text style={styles.sectionText}>{expert.specialization}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>자격내용</Text>
          {qualificationsList.map((qual, idx) => (
            <View key={idx} style={styles.expItem}>
              <View style={styles.bullet} />
              <Text style={styles.expText}>{qual}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>연락처</Text>
          <Text style={styles.sectionText}>{expert.contact_number}</Text>
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
