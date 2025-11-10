import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useInsurance } from '../context/InsuranceContext';
import { styles } from './ConsultantSelectionScreen.styles';
import { getActiveExperts, Expert } from '../services/expertService';
import { getDeviceSSAID } from '../utils/deviceUtils';
import { UserIcon } from '../components/Icons';

interface ConsultantSelectionScreenProps {
  onNext: (skipDetail?: boolean) => void;
}

export default function ConsultantSelectionScreen({ onNext }: ConsultantSelectionScreenProps) {
  const { formData, updateFormData } = useInsurance();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExperts();
  }, []);

  const loadExperts = async () => {
    setIsLoading(true);
    try {
      // 현재 기기 SSAID 가져오기
      const ssaid = await getDeviceSSAID();

      // ssaid가 있으면 해당 기기에 매핑된 전문가만 로드
      const data = await getActiveExperts(ssaid || undefined);
      setExperts(data);
    } catch (error) {
      console.error('전문가 목록 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (expertId: number) => {
    updateFormData({ consultant: expertId });
    onNext();
  };

  // 로딩 중일 때
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>전문가 목록을 불러오는 중...</Text>
      </View>
    );
  }

  // 전문가가 없을 때
  if (experts.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.emptyText}>등록된 전문가가 없습니다.</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.retryButton} onPress={loadExperts}>
            <Text style={styles.retryButtonText}>다시 시도</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton} onPress={() => {
            updateFormData({ consultant: 0 }); // 전문가 선택 안함
            onNext(true); // skipDetail = true로 전달
          }}>
            <Text style={styles.skipButtonText}>건너뛰기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>상담 받고 싶은</Text>
      <Text style={styles.title}>전문가를 선택해주세요.</Text>
      <View style={styles.grid}>
        {experts.map((expert) => (
          <View
            key={expert.expert_id}
            style={[
              styles.card,
              formData.consultant === expert.expert_id && styles.cardSelected,
            ]}
          >
            <TouchableOpacity
              onPress={() => handleSelect(expert.expert_id)}
              style={styles.cardTouchable}
            >
              {expert.profile_image ? (
                <Image
                  source={{ uri: expert.profile_image }}
                  style={styles.image}
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <UserIcon size={100} color='#FFFFFF'></UserIcon>
                </View>
              )}
              <View style={styles.nameTag}>
                <Text style={styles.nameText}>{expert.expert_name} 전문가</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
