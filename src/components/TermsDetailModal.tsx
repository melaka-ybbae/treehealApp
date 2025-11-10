import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { ConsentItem } from '../services/consentService';
import { styles } from './TermsDetailModal.styles';

interface TermsDetailModalProps {
  visible: boolean;
  consentItem: ConsentItem | null;
  onClose: () => void;
}

export default function TermsDetailModal({ visible, consentItem, onClose }: TermsDetailModalProps) {
  if (!consentItem) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* 헤더 */}
          <View style={styles.header}>
            <Text style={styles.title}>{consentItem.item_title}</Text>
            {consentItem.is_required && (
              <View style={styles.requiredBadge}>
                <Text style={styles.requiredText}>필수</Text>
              </View>
            )}
          </View>

          {/* 약관 내용 */}
          <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={true}>
            <Text style={styles.content}>{consentItem.item_content}</Text>
          </ScrollView>

          {/* 닫기 버튼 */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
