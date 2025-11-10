import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { CheckIcon } from './Icons';
import { useInsurance } from '../context/InsuranceContext';
import { getActiveConsentItems, ConsentItem } from '../services/consentService';
import TermsDetailModal from './TermsDetailModal';
import { styles } from './AgreementModal.styles';

interface AgreementModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function AgreementModal({ visible, onClose, onComplete }: AgreementModalProps) {
  const { formData, updateFormData } = useInsurance();
  const [consentItems, setConsentItems] = useState<ConsentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ConsentItem | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [agreements, setAgreements] = useState<{ [key: number]: boolean }>({});
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    console.log('===== AgreementModal useEffect =====');
    console.log('visible:', visible);
    if (visible) {
      console.log('약관 항목 로딩 시작');
      loadConsentItems();
    }
  }, [visible]);

  const loadConsentItems = async () => {
    console.log('loadConsentItems 시작');
    setIsLoading(true);
    try {
      const items = await getActiveConsentItems();
      console.log('약관 항목 로드 완료:', items.length, '개');
      setConsentItems(items);

      // 초기 동의 상태 설정
      const initialAgreements: { [key: number]: boolean } = {};
      items.forEach(item => {
        initialAgreements[item.consent_item_id] = false;
      });
      setAgreements(initialAgreements);
    } catch (error) {
      console.error('약관 항목 로드 실패:', error);
    } finally {
      setIsLoading(false);
      console.log('loadConsentItems 완료');
    }
  };

  const toggleAgreement = (itemId: number) => {
    const newAgreements = {
      ...agreements,
      [itemId]: !agreements[itemId],
    };
    setAgreements(newAgreements);

    // 모두 동의 체크박스 업데이트
    const allChecked = consentItems.every(item => newAgreements[item.consent_item_id]);
    setAllChecked(allChecked);
  };

  const toggleAllAgreements = (checked: boolean) => {
    const newAgreements: { [key: number]: boolean } = {};
    consentItems.forEach(item => {
      newAgreements[item.consent_item_id] = checked;
    });
    setAgreements(newAgreements);
    setAllChecked(checked);
  };

  const handleViewDetails = (item: ConsentItem) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleSubmit = () => {
    // 필수 항목 모두 동의했는지 확인
    const requiredItems = consentItems.filter(item => item.is_required);
    const allRequiredChecked = requiredItems.every(item => agreements[item.consent_item_id]);

    if (allRequiredChecked) {
      onComplete();
    }
  };

  // 필수 항목 모두 동의했는지 확인
  const requiredItems = consentItems.filter(item => item.is_required);
  const isValid = requiredItems.every(item => agreements[item.consent_item_id]);

  return (
    <>
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View style={styles.overlay}>
          <View style={styles.content}>
            <View style={styles.handle} />
            <Text style={styles.title}>약관 동의</Text>

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>약관 불러오는 중...</Text>
              </View>
            ) : (
              <>
                <ScrollView style={styles.list}>
                  {/* 전체 동의 */}
                  <TouchableOpacity
                    style={styles.itemAll}
                    onPress={() => toggleAllAgreements(!allChecked)}
                  >
                    <View style={[styles.checkbox, allChecked && styles.checkboxChecked]}>
                      {allChecked && <CheckIcon size={40} color="#fff" />}
                    </View>
                    <Text style={styles.text}>모든 약관에 동의합니다</Text>
                  </TouchableOpacity>

                  <View style={styles.divider} />

                  {/* 개별 약관 */}
                  {consentItems.map((item) => (
                    <View key={item.consent_item_id} style={styles.itemRow}>
                      <TouchableOpacity
                        style={styles.item}
                        onPress={() => toggleAgreement(item.consent_item_id)}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            agreements[item.consent_item_id] && styles.checkboxChecked,
                          ]}
                        >
                          {agreements[item.consent_item_id] && <CheckIcon size={40} color="#fff" />}
                        </View>
                        <Text style={styles.text}>
                          {item.item_title}{' '}
                          <Text style={item.is_required ? styles.required : styles.optional}>
                            {item.is_required ? '[필수]' : '[선택]'}
                          </Text>
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() => handleViewDetails(item)}
                      >
                        <Text style={styles.viewButtonText}>보기</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
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
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* 약관 상세 모달 */}
      <TermsDetailModal
        visible={showDetailModal}
        consentItem={selectedItem}
        onClose={() => setShowDetailModal(false)}
      />
    </>
  );
}
