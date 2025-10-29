import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { CheckIcon } from './Icons';
import { useInsurance } from '../context/InsuranceContext';
import { styles } from './AgreementModal.styles';

interface AgreementModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function AgreementModal({ visible, onClose, onComplete }: AgreementModalProps) {
  const { formData, updateFormData } = useInsurance();

  const toggleAgreement = (key: keyof typeof formData.agreements) => {
    const newAgreements = {
      ...formData.agreements,
      [key]: !formData.agreements[key],
    };
    newAgreements.all =
      newAgreements.privacy &&
      newAgreements.terms &&
      newAgreements.consultation &&
      newAgreements.marketing;
    updateFormData({ agreements: newAgreements });
  };

  const toggleAllAgreements = (checked: boolean) => {
    updateFormData({
      agreements: {
        all: checked,
        privacy: checked,
        terms: checked,
        consultation: checked,
        marketing: checked,
      },
    });
  };

  const handleSubmit = () => {
    if (
      formData.agreements.privacy &&
      formData.agreements.terms &&
      formData.agreements.consultation
    ) {
      onComplete();
    }
  };

  const isValid =
    formData.agreements.privacy &&
    formData.agreements.terms &&
    formData.agreements.consultation;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.handle} />
          <Text style={styles.title}>약관 동의</Text>
          <ScrollView style={styles.list}>
            <TouchableOpacity
              style={styles.itemAll}
              onPress={() => toggleAllAgreements(!formData.agreements.all)}
            >
              <View
                style={[styles.checkbox, formData.agreements.all && styles.checkboxChecked]}
              >
                {formData.agreements.all && <CheckIcon size={40} color="#fff" />}
              </View>
              <Text style={styles.text}>모든 약관에 동의합니다</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.item} onPress={() => toggleAgreement('privacy')}>
              <View
                style={[
                  styles.checkbox,
                  formData.agreements.privacy && styles.checkboxChecked,
                ]}
              >
                {formData.agreements.privacy && <CheckIcon size={40} color="#fff" />}
              </View>
              <Text style={styles.text}>
                개인정보 수집·이용 동의 <Text style={styles.required}>[필수]</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => toggleAgreement('terms')}>
              <View
                style={[styles.checkbox, formData.agreements.terms && styles.checkboxChecked]}
              >
                {formData.agreements.terms && <CheckIcon size={40} color="#fff" />}
              </View>
              <Text style={styles.text}>
                서비스 이용 약관 <Text style={styles.required}>[필수]</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              onPress={() => toggleAgreement('consultation')}
            >
              <View
                style={[
                  styles.checkbox,
                  formData.agreements.consultation && styles.checkboxChecked,
                ]}
              >
                {formData.agreements.consultation && <CheckIcon size={40} color="#fff" />}
              </View>
              <Text style={styles.text}>
                상담 안내 메세지 수신 동의 <Text style={styles.required}>[필수]</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => toggleAgreement('marketing')}>
              <View
                style={[
                  styles.checkbox,
                  formData.agreements.marketing && styles.checkboxChecked,
                ]}
              >
                {formData.agreements.marketing && <CheckIcon size={40} color="#fff" />}
              </View>
              <Text style={styles.text}>
                마케팅/이벤트 안내 수신 동의 <Text style={styles.optional}>[선택]</Text>
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
              <Text style={styles.buttonCancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonSubmit, !isValid && styles.buttonSubmitDisabled]}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonSubmitText}>동의하고 신청하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
