import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CONSULTATION_TYPES } from '../utils/constants';
import { CheckIcon } from '../components/Icons';
import { useInsurance } from '../context/InsuranceContext';
import AgreementModal from '../components/AgreementModal';
import { styles } from './ReviewScreen.styles';

interface ReviewScreenProps {
  onNext: () => void;
}

export default function ReviewScreen({ onNext }: ReviewScreenProps) {
  const { formData } = useInsurance();
  const [showAgreementModal, setShowAgreementModal] = useState(false);

  const handleSubmit = () => {
    setShowAgreementModal(true);
  };

  const handleAgreementComplete = () => {
    setShowAgreementModal(false);
    onNext();
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
