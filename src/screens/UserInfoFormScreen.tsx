import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
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
    isValidPhoneNumber(formData.phone);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>마지막으로</Text>
        <Text style={styles.title}>고객님 정보를 입력해주세요.</Text>
      </View>
      <View style={styles.scrollView}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>휴대전화번호</Text>
          <View style={styles.inputWrapper}>
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
        </View>

        <View style={styles.formRow}>
          <View style={styles.formGroupHalf}>
            <Text style={styles.label}>생년월일</Text>
            <View style={styles.inputWrapper}>
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
                <View
                  style={[
                    styles.genderButtonInner,
                    formData.gender === 'male' && styles.genderButtonSelectedInner,
                  ]}
                >
                  <Text
                    style={[
                      styles.genderButtonText,
                      formData.gender === 'male' && styles.genderButtonTextSelected,
                    ]}
                  >
                    남성
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  formData.gender === 'female' && styles.genderButtonSelected,
                ]}
                onPress={() => updateFormData({ gender: 'female' })}
              >
                <View
                  style={[
                    styles.genderButtonInner,
                    formData.gender === 'female' && styles.genderButtonSelectedInner,
                  ]}
                >
                  <Text
                    style={[
                      styles.genderButtonText,
                      formData.gender === 'female' && styles.genderButtonTextSelected,
                    ]}
                  >
                    여성
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>성함</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={formData.name || ''}
              onChangeText={(text) => updateFormData({ name: text })}
              placeholder="홍길동"
              placeholderTextColor="#999"
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={onNext}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>상담 신청 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
