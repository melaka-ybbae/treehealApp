import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { CONSULTATION_TYPES } from '../utils/constants';
import { CheckIcon } from '../components/Icons';
import { useInsurance } from '../context/InsuranceContext';
import AgreementModal from '../components/AgreementModal';
import { styles } from './ReviewScreen.styles';
import { submitConsultation } from '../services/consultationService';

interface ReviewScreenProps {
  onNext: () => void;
}

export default function ReviewScreen({ onNext }: ReviewScreenProps) {
  const { formData } = useInsurance();
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setShowAgreementModal(true);
  };

  const handleAgreementComplete = async () => {
    setShowAgreementModal(false);
    setIsSubmitting(true);

    try {
      // 서버에 상담 신청
      const result = await submitConsultation(formData);

      if (result.success) {
        console.log('상담 신청 완료:', result.request_number);
        // 성공 화면으로 이동
        onNext();
      } else {
        // 실패 시 경고
        Alert.alert(
          '신청 실패',
          result.message || '상담 신청에 실패했습니다. 다시 시도해주세요.',
          [
            {
              text: '확인',
              onPress: () => setIsSubmitting(false),
            },
          ]
        );
      }
    } catch (error) {
      console.error('상담 신청 오류:', error);
      Alert.alert(
        '오류',
        '상담 신청 중 오류가 발생했습니다.',
        [
          {
            text: '확인',
            onPress: () => setIsSubmitting(false),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>입력한 정보가 맞나요?</Text>

        {formData.consultationType && (
          <View style={styles.section}>
            <Text style={styles.label}>상담유형</Text>
            <View style={styles.card}>
              <Text style={styles.text}>
                {CONSULTATION_TYPES.find((t) => t.id === formData.consultationType)?.label}
              </Text>
              <View style={styles.check}>
                <CheckIcon size={40} color="#fff" />
              </View>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.label}>이름</Text>
          <View style={styles.card}>
            <Text style={styles.text}>{formData.name}</Text>
            <View style={styles.check}>
              <CheckIcon size={40} color="#fff" />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>생년월일 및 성별</Text>
          <View style={styles.card}>
            <Text style={styles.text}>{formData.birthdate}</Text>
            <Text style={styles.gender}>{formData.gender === 'male' ? '남성' : '여성'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>전화번호</Text>
          <View style={styles.card}>
            <Text style={styles.text}>
              {formData.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3')}
            </Text>
            <View style={styles.check}>
              <CheckIcon size={40} color="#fff" />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>지역</Text>
          <View style={styles.card}>
            <Text style={styles.text}>
              {formData.region} {formData.detailedRegion}
            </Text>
            <View style={styles.check}>
              <CheckIcon size={40} color="#fff" />
            </View>
          </View>
        </View>

        <View style={{ height: 200 }} />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>상담 신청하기</Text>
        </TouchableOpacity>
      </View>

      <AgreementModal
        visible={showAgreementModal}
        onClose={() => setShowAgreementModal(false)}
        onComplete={handleAgreementComplete}
      />
    </View>
  );
}
