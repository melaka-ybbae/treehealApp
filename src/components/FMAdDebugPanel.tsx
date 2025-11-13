import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { clearAuthTokens, initializeAuth, getStoredAuthTokens } from '../services/fmadAuthService';
import { fetchAdList } from '../services/fmadService';
import { FMAD_CONFIG } from '../config/fmad.config';
import { styles } from './FMAdDebugPanel.styles';

/**
 * FM AD 디버깅 패널
 * DEV_MODE가 true일 때만 표시됨
 */
export default function FMAdDebugPanel() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('');

  if (!FMAD_CONFIG.DEV_MODE) {
    return null; // 개발 모드가 아니면 표시 안 함
  }

  const handleClearTokens = async () => {
    await clearAuthTokens();
    setStatus('토큰 삭제 완료');
  };

  const handleReAuth = async () => {
    setStatus('재인증 중...');
    const success = await initializeAuth();
    setStatus(success ? '재인증 성공' : '재인증 실패');
  };

  const handleCheckTokens = async () => {
    const tokens = await getStoredAuthTokens();
    if (tokens) {
      setStatus(`토큰 존재\nSeed: ${tokens.Seed}\nDevice: ${tokens.device_seed}`);
    } else {
      setStatus('저장된 토큰 없음');
    }
  };

  const handleTestAdList = async () => {
    setStatus('광고 목록 요청 중...');
    const data = await fetchAdList();
    if (data) {
      setStatus(`광고 ${data.adList?.length || 0}개 로드됨`);
    } else {
      setStatus('광고 로드 실패');
    }
  };

  return (
    <>
      {/* Floating Debug Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.floatingButtonText}>🐛</Text>
      </TouchableOpacity>

      {/* Debug Panel Modal */}
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.panel}>
            <Text style={styles.title}>FM AD 디버그</Text>

            {status ? (
              <View style={styles.statusBox}>
                <Text style={styles.statusText}>{status}</Text>
              </View>
            ) : null}

            <TouchableOpacity style={styles.button} onPress={handleCheckTokens}>
              <Text style={styles.buttonText}>토큰 확인</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleClearTokens}>
              <Text style={styles.buttonText}>토큰 삭제</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleReAuth}>
              <Text style={styles.buttonText}>재인증</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleTestAdList}>
              <Text style={styles.buttonText}>광고 목록 테스트</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.buttonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
