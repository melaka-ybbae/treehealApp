import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DynamicIcon } from '../components/Icons';
import { useInsurance } from '../context/InsuranceContext';
import { getActiveDetailItems, DetailItem } from '../services/detailItemService';
import { styles } from './InterestsScreen.styles';

interface InterestsScreenProps {
  onNext: () => void;
}

export default function InterestsScreen({ onNext }: InterestsScreenProps) {
  const { formData, updateFormData } = useInsurance();
  const [detailItems, setDetailItems] = useState<DetailItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDetailItems();
  }, []);

  const loadDetailItems = async () => {
    setIsLoading(true);
    try {
      const data = await getActiveDetailItems();
      setDetailItems(data);
    } catch (error) {
      console.error('Failed to load detail items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 서버에서 받은 item_name이 선택되어 있는지 확인
  const isItemSelected = (itemName: string): boolean => {
    return formData.interests.includes(itemName);
  };

  const toggleInterest = (itemName: string) => {
    const newInterests = formData.interests.includes(itemName)
      ? formData.interests.filter((i) => i !== itemName)
      : [...formData.interests, itemName];
    updateFormData({ interests: newInterests });
  };

  const isValid = formData.interests.length > 0;

  // 아이콘 매핑 (item_icon이 없는 경우)
  const getIconForItem = (itemName: string): string => {
    if (itemName.includes('실손')) return 'shield';
    if (itemName.includes('수술')) return 'activity';
    if (itemName.includes('진단')) return 'heart';
    if (itemName.includes('기타')) return 'users';
    return 'file-text';
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#00AC46" />
        <Text style={styles.loadingText}>상담 분야 불러오는 중...</Text>
      </View>
    );
  }

  if (detailItems.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.emptyText}>상담 분야를 불러올 수 없습니다</Text>
        <TouchableOpacity style={styles.button} onPress={loadDetailItems}>
          <Text style={styles.buttonText}>다시 시도</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>상담 받고 싶은</Text>
      <Text style={styles.title}>분야를 모두 선택해주세요.</Text>
      <View style={styles.grid}>
        {detailItems.map((item) => (
          <TouchableOpacity
            key={item.item_id}
            onPress={() => toggleInterest(item.item_name)}
            style={[
              styles.card,
              isItemSelected(item.item_name) && styles.cardSelected,
            ]}
          >
            <View
              style={[
                styles.iconCircle,
                isItemSelected(item.item_name) && styles.iconCircleSelected,
              ]}
            >
              <DynamicIcon
                name={getIconForItem(item.item_name) as any}
                size={60}
                color={isItemSelected(item.item_name) ? '#fff' : '#666'}
              />
            </View>
            <Text style={styles.label}>{item.item_name}</Text>
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
