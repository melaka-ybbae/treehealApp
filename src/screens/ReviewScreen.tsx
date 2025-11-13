import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { CONSULTATION_TYPES, INTEREST_OPTIONS } from '../utils/constants';
import { CheckIcon } from '../components/Icons';
import { useInsurance } from '../context/InsuranceContext';
import AgreementModal from '../components/AgreementModal';
import { styles } from './ReviewScreen.styles';
import { submitConsultation } from '../services/consultationService';
import { getExpertById, Expert } from '../services/expertService';

interface ReviewScreenProps {
  onNext: () => void;
}

export default function ReviewScreen({ onNext }: ReviewScreenProps) {
  const { formData } = useInsurance();
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expert, setExpert] = useState<Expert | null>(null);

  useEffect(() => {
    console.log('ReviewScreen formData:', formData);
    console.log('consultationType:', formData.consultationType);
    console.log('consultationTypeName:', formData.consultationTypeName);
    console.log('interests:', formData.interests);
    console.log('consultant:', formData.consultant);

    const loadExpert = async () => {
      if (formData.consultant) {
        try {
          const expertData = await getExpertById(formData.consultant);
          setExpert(expertData);
        } catch (error) {
          console.error('전문가 정보 로드 실패:', error);
        }
      }
    };
    loadExpert();
  }, [formData.consultant]);

  // Get consultation type label - handle both ID and number formats
  const getConsultationTypeLabel = () => {
    if (!formData.consultationType) return '';

    // If it's a number (1 or 2), map to the array index
    if (typeof formData.consultationType === 'number') {
      const index = formData.consultationType - 1;
      return CONSULTATION_TYPES[index]?.label || '';
    }

    // If it's a string ID like 'claim' or 'free'
    return CONSULTATION_TYPES.find((t) => t.id === formData.consultationType)?.label || '';
  };

  // Get interests labels - handle both ID array and label array formats
  const getInterestsLabels = () => {
    if (!formData.interests || formData.interests.length === 0) return '';

    // Check if first item is already a label (Korean string)
    const firstItem = formData.interests[0];
    if (typeof firstItem === 'string' && /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(firstItem)) {
      // Already labels, just join them
      return formData.interests.join(', ');
    }

    // If they're IDs, map them to labels
    return formData.interests
      .map((id) => INTEREST_OPTIONS.find((opt) => opt.id === id)?.label)
      .filter(Boolean)
      .join(', ');
  };

  const handleSubmit = () => {
    console.log('===== handleSubmit 호출 =====');
    console.log('약관 모달 표시 시작');
    setShowAgreementModal(true);
  };

  const handleAgreementComplete = async () => {
    console.log('===== handleAgreementComplete 호출 =====');
    console.log('약관 동의 완료, 상담 신청 시작');
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
      <View style={styles.scrollView}>
        <Text style={styles.title}>입력한 정보가 맞나요?</Text>

        <View style={styles.section}>
          <Text style={styles.label}>휴대전화번호</Text>
          <View style={styles.card}>
            <View style={styles.cardInner}>
              <Text style={styles.text}>
                {formData.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3')}
              </Text>
              <View style={styles.check}>
                <CheckIcon size={40} color="#fff" />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>생년월일</Text>
          <View style={styles.card}>
            <View style={styles.cardInner}>
              <Text style={styles.text}>{formData.birthdate}</Text>
              <Text style={styles.gender}>{formData.gender === 'male' ? '남성' : '여성'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>성함</Text>
          <View style={styles.card}>
            <View style={styles.cardInner}>
              <Text style={styles.text}>{formData.name}</Text>
              <View style={styles.check}>
                <CheckIcon size={40} color="#fff" />
              </View>
            </View>
          </View>
        </View>


        {formData.consultationType && (
          <View style={styles.section}>
            <Text style={styles.label}>상담 항목</Text>
            <View style={styles.card}>
              <View style={styles.cardInner}>
                <Text style={styles.text}>{getConsultationTypeLabel()}</Text>
                <View style={styles.check}>
                  <CheckIcon size={40} color="#fff" />
                </View>
              </View>
            </View>
          </View>
        )}

        {formData.interests && formData.interests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.label}>상담 세부 항목</Text>
            <View style={styles.card}>
              <View style={styles.cardInner}>
                <Text style={styles.text}>
                  {getInterestsLabels()}
                </Text>
                <View style={styles.check}>
                  <CheckIcon size={40} color="#fff" />
                </View>
              </View>
            </View>
          </View>
        )}

        {expert && (
          <View style={styles.section}>
            <Text style={styles.label}>선택된 상담 전문가</Text>
            <View style={styles.card}>
              <View style={styles.cardInner}>
                <Text style={styles.text}>{expert.expert_name} 전문가</Text>
                <View style={styles.check}>
                  <CheckIcon size={40} color="#fff" />
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={{ height: 200 }} />
      </View>

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
