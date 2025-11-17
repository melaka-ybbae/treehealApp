import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useInsurance } from '../context/InsuranceContext';
import { styles } from './UserInfoFormScreen.styles';
import { formatPhoneNumber, formatBirthDate, isValidPhoneNumber, isValidBirthDate } from '../utils/formatters';
import NumericKeypad from '../components/NumericKeypad';
import KoreanKeypad from '../components/KoreanKeypad';

interface UserInfoFormScreenProps {
  onNext: () => void;
}

type ActiveField = 'phone' | 'birthdate' | 'name' | null;

export default function UserInfoFormScreen({ onNext }: UserInfoFormScreenProps) {
  const { formData, updateFormData } = useInsurance();
  const [activeField, setActiveField] = useState<ActiveField>(null);

  const handleNumberPress = (num: string) => {
    if (activeField === 'phone') {
      const currentValue = formData.phone?.replace(/-/g, '') || '';
      if (currentValue.length < 11) {
        const newValue = currentValue + num;
        const formatted = formatPhoneNumber(newValue);
        updateFormData({ phone: formatted });
      }
    } else if (activeField === 'birthdate') {
      const currentValue = formData.birthdate?.replace(/-/g, '') || '';
      if (currentValue.length < 8) {
        const newValue = currentValue + num;
        const formatted = formatBirthDate(newValue);
        updateFormData({ birthdate: formatted });
      }
    }
  };

  const handleBackspace = () => {
    if (activeField === 'phone') {
      const currentValue = formData.phone?.replace(/-/g, '') || '';
      if (currentValue.length > 0) {
        const newValue = currentValue.slice(0, -1);
        const formatted = formatPhoneNumber(newValue);
        updateFormData({ phone: formatted });
      }
    } else if (activeField === 'birthdate') {
      const currentValue = formData.birthdate?.replace(/-/g, '') || '';
      if (currentValue.length > 0) {
        const newValue = currentValue.slice(0, -1);
        const formatted = formatBirthDate(newValue);
        updateFormData({ birthdate: formatted });
      }
    }
  };

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
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setActiveField('phone')}
          >
            <View style={[styles.input, activeField === 'phone' && styles.inputActive]}>
              <Text style={[styles.inputText, !formData.phone && styles.inputPlaceholder]}>
                {formData.phone || '010-1234-5678'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.formRow}>
          <View style={styles.formGroupHalf}>
            <Text style={styles.label}>생년월일</Text>
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={() => setActiveField('birthdate')}
            >
              <View style={[styles.input, activeField === 'birthdate' && styles.inputActive]}>
                <Text style={[styles.inputText, !formData.birthdate && styles.inputPlaceholder]}>
                  {formData.birthdate || 'YYYY-MM-DD'}
                </Text>
              </View>
            </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setActiveField('name')}
          >
            <View style={[styles.input, activeField === 'name' && styles.inputActive]}>
              <Text style={[styles.inputText, !formData.name && styles.inputPlaceholder]}>
                {formData.name || '홍길동'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <NumericKeypad
        visible={activeField === 'phone' || activeField === 'birthdate'}
        onNumberPress={handleNumberPress}
        onBackspace={handleBackspace}
        onClose={() => setActiveField(null)}
      />

      <KoreanKeypad
        visible={activeField === 'name'}
        value={formData.name || ''}
        onChangeText={(text) => updateFormData({ name: text })}
        onClose={() => setActiveField(null)}
      />

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
