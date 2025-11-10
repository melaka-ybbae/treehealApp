import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DynamicIcon } from '../components/Icons';
import { useInsurance } from '../context/InsuranceContext';
import { getActiveCategories, ConsultationCategory } from '../services/categoryService';
import { styles } from './ConsultationTypeScreen.styles';

interface ConsultationTypeScreenProps {
  onNext: () => void;
}

export default function ConsultationTypeScreen({ onNext }: ConsultationTypeScreenProps) {
  const { formData, updateFormData } = useInsurance();
  const [categories, setCategories] = useState<ConsultationCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const data = await getActiveCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (categoryId: number, categoryName: string) => {
    // 무료상담 선택 시 전문가를 null로 초기화
    const isFreeConsultation = categoryName.includes('무료');
    updateFormData({
      consultationType: categoryId,
      consultationTypeName: categoryName,
      consultant: isFreeConsultation ? null : formData.consultant,
    });
  };

  const isValid = formData.consultationType !== '' && formData.consultationType !== 0;

  // 기본 아이콘 매핑 (category_icon이 없는 경우)
  const getIconForCategory = (categoryName: string): string => {
    if (categoryName.includes('보상') || categoryName.includes('청구')) {
      return 'activity';
    }
    if (categoryName.includes('무료')) {
      return 'heart';
    }
    return 'file-text';
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#00AC46" />
        <Text style={styles.loadingText}>상담 구분 불러오는 중...</Text>
      </View>
    );
  }

  if (categories.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.emptyText}>상담 구분을 불러올 수 없습니다</Text>
        <TouchableOpacity style={styles.button} onPress={loadCategories}>
          <Text style={styles.buttonText}>다시 시도</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>상담 받고 싶은</Text>
      <Text style={styles.title}>항목을 선택해 주세요.</Text>
      <View style={styles.optionsRow}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.category_id}
            onPress={() => handleSelect(category.category_id, category.category_name)}
            style={[
              styles.optionCard,
              formData.consultationType === category.category_id && styles.optionCardSelected,
            ]}
          >
            <View
              style={[
                styles.iconCircle,
                formData.consultationType === category.category_id && styles.iconCircleSelected,
              ]}
            >
              <DynamicIcon
                name={getIconForCategory(category.category_name) as any}
                size={80}
                color={formData.consultationType === category.category_id ? '#fff' : '#666'}
              />
            </View>
            <Text style={styles.optionLabel}>{category.category_name}</Text>
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
