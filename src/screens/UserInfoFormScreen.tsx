import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { KOREAN_REGIONS } from '../utils/constants';
import { useInsurance } from '../context/InsuranceContext';
import { styles } from './UserInfoFormScreen.styles';
import { formatPhoneNumber, formatBirthDate, isValidPhoneNumber, isValidBirthDate } from '../utils/formatters';

interface UserInfoFormScreenProps {
  onNext: () => void;
}

export default function UserInfoFormScreen({ onNext }: UserInfoFormScreenProps) {
  const { formData, updateFormData } = useInsurance();

  const isValid =
    formData.name &&
    formData.birthdate &&
    isValidBirthDate(formData.birthdate) &&
    formData.gender &&
    formData.phone &&
    isValidPhoneNumber(formData.phone) &&
    formData.region;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>마지막으로 고객님</Text>
        <Text style={styles.title}>정보를 입력해주세요.</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            value={formData.name || ''}
            onChangeText={(text) => updateFormData({ name: text })}
            placeholder="홍길동"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formRow}>
          <View style={styles.formGroupHalf}>
            <Text style={styles.label}>생년월일</Text>
            <TextInput
              style={styles.input}
              value={formData.birthdate || ''}
              onChangeText={(text) => {
                const formatted = formatBirthDate(text);
                updateFormData({ birthdate: formatted });
              }}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          <View style={styles.formGroupHalf}>
            <Text style={styles.label}>성별</Text>
            <View style={styles.genderButtons}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  formData.gender === 'male' && styles.genderButtonSelected,
                ]}
                onPress={() => updateFormData({ gender: 'male' })}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    formData.gender === 'male' && styles.genderButtonTextSelected,
                  ]}
                >
                  남성
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  formData.gender === 'female' && styles.genderButtonSelected,
                ]}
                onPress={() => updateFormData({ gender: 'female' })}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    formData.gender === 'female' && styles.genderButtonTextSelected,
                  ]}
                >
                  여성
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>연락처</Text>
          <TextInput
            style={styles.input}
            value={formData.phone || ''}
            onChangeText={(text) => {
              const formatted = formatPhoneNumber(text);
              updateFormData({ phone: formatted });
            }}
            placeholder="010-1234-5678"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            maxLength={13}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>거주 지역</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.regionScroll}
          >
            {KOREAN_REGIONS.map((region) => (
              <TouchableOpacity
                key={region}
                style={[
                  styles.regionChip,
                  formData.region === region && styles.regionChipSelected,
                ]}
                onPress={() => updateFormData({ region })}
              >
                <Text
                  style={[
                    styles.regionChipText,
                    formData.region === region && styles.regionChipTextSelected,
                  ]}
                >
                  {region}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {formData.region && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>상세 지역</Text>
            <TextInput
              style={styles.input}
              value={formData.detailedRegion || ''}
              onChangeText={(text) => updateFormData({ detailedRegion: text })}
              placeholder="예: 성남시, 강남구 등"
              placeholderTextColor="#999"
            />
          </View>
        )}

        <View style={{ height: 200 }} />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={onNext}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>정보입력 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
