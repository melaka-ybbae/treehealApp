import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, TouchableWithoutFeedback } from 'react-native';
import { styles } from './KoreanKeypad.styles';
import { XIcon } from './Icons';
import { scale } from '../utils/scaling';

interface KoreanKeypadProps {
  visible: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onClose: () => void;
}

// 한글 조합을 위한 유니코드 상수
const HANGUL_BASE = 0xAC00;
const CHOSUNG_BASE = 0x1100;
const JUNGSUNG_BASE = 0x1161;
const JONGSUNG_BASE = 0x11A7;

const CHOSUNG_LIST = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const JUNGSUNG_LIST = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const JONGSUNG_LIST = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

// Map으로 빠른 검색
const CHOSUNG_MAP = new Map(CHOSUNG_LIST.map((char, idx) => [char, idx]));
const JUNGSUNG_MAP = new Map(JUNGSUNG_LIST.map((char, idx) => [char, idx]));
const JONGSUNG_MAP = new Map(JONGSUNG_LIST.map((char, idx) => [char, idx]));

// 쌍자음/복합모음 조합
const DOUBLE_CHOSUNG: { [key: string]: string } = {
  'ㄱㄱ': 'ㄲ', 'ㄷㄷ': 'ㄸ', 'ㅂㅂ': 'ㅃ', 'ㅅㅅ': 'ㅆ', 'ㅈㅈ': 'ㅉ'
};

const COMPLEX_JUNGSUNG: { [key: string]: string } = {
  'ㅗㅏ': 'ㅘ', 'ㅗㅐ': 'ㅙ', 'ㅗㅣ': 'ㅚ',
  'ㅜㅓ': 'ㅝ', 'ㅜㅔ': 'ㅞ', 'ㅜㅣ': 'ㅟ',
  'ㅡㅣ': 'ㅢ'
};

const COMPLEX_JONGSUNG: { [key: string]: string } = {
  'ㄱㅅ': 'ㄳ', 'ㄴㅈ': 'ㄵ', 'ㄴㅎ': 'ㄶ',
  'ㄹㄱ': 'ㄺ', 'ㄹㅁ': 'ㄻ', 'ㄹㅂ': 'ㄼ', 'ㄹㅅ': 'ㄽ', 'ㄹㅌ': 'ㄾ', 'ㄹㅍ': 'ㄿ', 'ㄹㅎ': 'ㅀ',
  'ㅂㅅ': 'ㅄ'
};

// Shift 키로 입력할 쌍자음 매핑
const SHIFT_CONSONANTS: { [key: string]: string } = {
  'ㄱ': 'ㄲ', 'ㄷ': 'ㄸ', 'ㅂ': 'ㅃ', 'ㅅ': 'ㅆ', 'ㅈ': 'ㅉ'
};

export default function KoreanKeypad({ visible, value, onChangeText, onClose }: KoreanKeypadProps) {
  const slideAnim = useRef(new Animated.Value(500)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [isShiftPressed, setIsShiftPressed] = React.useState(false);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 500,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const isHangul = (char: string) => {
    const code = char.charCodeAt(0);
    return code >= HANGUL_BASE && code <= HANGUL_BASE + 11172;
  };

  const isJamoConsonant = (char: string) => {
    return CHOSUNG_LIST.includes(char) || JONGSUNG_LIST.includes(char);
  };

  const isJamoVowel = (char: string) => {
    return JUNGSUNG_LIST.includes(char);
  };

  const decompose = (char: string): [string, string, string] | null => {
    if (!isHangul(char)) return null;

    const code = char.charCodeAt(0) - HANGUL_BASE;
    const chosungIndex = Math.floor(code / 588);
    const jungsungIndex = Math.floor((code % 588) / 28);
    const jongsungIndex = code % 28;

    return [
      CHOSUNG_LIST[chosungIndex],
      JUNGSUNG_LIST[jungsungIndex],
      JONGSUNG_LIST[jongsungIndex]
    ];
  };

  const compose = useCallback((chosung: string, jungsung: string, jongsung: string): string => {
    const chosungIndex = CHOSUNG_MAP.get(chosung);
    const jungsungIndex = JUNGSUNG_MAP.get(jungsung);
    const jongsungIndex = JONGSUNG_MAP.get(jongsung);

    if (chosungIndex === undefined || jungsungIndex === undefined || jongsungIndex === undefined) {
      return '';
    }

    const code = HANGUL_BASE + (chosungIndex * 588) + (jungsungIndex * 28) + jongsungIndex;
    return String.fromCharCode(code);
  }, []);

  const handleKeyPress = useCallback((key: string) => {
    // Shift 키가 눌려있고 쌍자음 변환 가능한 경우
    let actualKey = key;
    if (isShiftPressed && SHIFT_CONSONANTS[key]) {
      actualKey = SHIFT_CONSONANTS[key];
      setIsShiftPressed(false); // Shift 키 해제
    } else if (isShiftPressed) {
      setIsShiftPressed(false); // 쌍자음 아닌 키 누르면 Shift 해제
    }

    if (!value) {
      onChangeText(actualKey);
      return;
    }

    const lastChar = value[value.length - 1];
    const beforeLast = value.slice(0, -1);

    // 마지막 글자가 한글인 경우
    if (isHangul(lastChar)) {
      const decomposed = decompose(lastChar);
      if (!decomposed) return;

      const [cho, jung, jong] = decomposed;

      // 자음 입력
      if (isJamoConsonant(actualKey)) {
        // 종성이 없는 경우 -> 종성 추가
        if (jong === '') {
          const newChar = compose(cho, jung, actualKey);
          if (newChar) {
            onChangeText(beforeLast + newChar);
          } else {
            onChangeText(value + actualKey);
          }
        }
        // 종성이 있는 경우 -> 복합 종성 시도, 실패시 새 글자
        else {
          const complex = COMPLEX_JONGSUNG[jong + actualKey];
          if (complex) {
            const newChar = compose(cho, jung, complex);
            onChangeText(beforeLast + newChar);
          } else {
            onChangeText(value + actualKey);
          }
        }
      }
      // 모음 입력
      else if (isJamoVowel(actualKey)) {
        // 종성이 있는 경우 -> 종성을 초성으로, 새 모음 추가
        if (jong !== '') {
          const newPrevChar = compose(cho, jung, '');
          onChangeText(beforeLast + newPrevChar + compose(jong, actualKey, ''));
        }
        // 종성이 없는 경우 -> 복합 모음 시도
        else {
          const complex = COMPLEX_JUNGSUNG[jung + actualKey];
          if (complex) {
            const newChar = compose(cho, complex, '');
            onChangeText(beforeLast + newChar);
          } else {
            onChangeText(value + actualKey);
          }
        }
      }
    }
    // 마지막 글자가 자모인 경우
    else if (isJamoConsonant(lastChar)) {
      // 자음 + 모음 -> 한글 조합
      if (isJamoVowel(actualKey)) {
        const newChar = compose(lastChar, actualKey, '');
        if (newChar) {
          onChangeText(beforeLast + newChar);
        } else {
          onChangeText(value + actualKey);
        }
      }
      // 자음 + 자음 -> 그냥 추가
      else {
        onChangeText(value + actualKey);
      }
    }
    // 마지막 글자가 모음인 경우
    else if (isJamoVowel(lastChar)) {
      // 모음 + 모음 -> 복합 모음 시도
      if (isJamoVowel(actualKey)) {
        const complex = COMPLEX_JUNGSUNG[lastChar + actualKey];
        if (complex) {
          onChangeText(beforeLast + complex);
        } else {
          onChangeText(value + actualKey);
        }
      }
      // 모음 + 자음 -> 그냥 추가
      else {
        onChangeText(value + actualKey);
      }
    }
    // 기타 (영문, 숫자 등)
    else {
      onChangeText(value + actualKey);
    }
  }, [value, isShiftPressed, onChangeText, compose]);

  const handleBackspace = useCallback(() => {
    if (!value) return;

    const lastChar = value[value.length - 1];
    const beforeLast = value.slice(0, -1);

    // 마지막 글자가 한글인 경우 -> 분해
    if (isHangul(lastChar)) {
      const decomposed = decompose(lastChar);
      if (!decomposed) {
        onChangeText(beforeLast);
        return;
      }

      const [cho, jung, jong] = decomposed;

      // 종성이 있으면 종성 제거
      if (jong !== '') {
        const newChar = compose(cho, jung, '');
        onChangeText(beforeLast + newChar);
      }
      // 중성만 있으면 중성 제거 -> 초성만 남김
      else {
        onChangeText(beforeLast + cho);
      }
    }
    // 일반 문자는 그냥 삭제
    else {
      onChangeText(beforeLast);
    }
  }, [value, onChangeText, compose]);

  const handleSpace = useCallback(() => {
    onChangeText(value + ' ');
  }, [value, onChangeText]);

  const consonants = [
    ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'],
    ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'],
    ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'],
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.container,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>이름 입력</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <XIcon size={scale(32)} color="#000" />
                </TouchableOpacity>
              </View>

              {consonants.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((key, colIndex) => (
                    <TouchableOpacity
                      key={colIndex}
                      style={styles.button}
                      onPress={() => handleKeyPress(key)}
                    >
                      <View style={styles.buttonInner}>
                        <Text style={styles.buttonText}>{key}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}

              <View style={styles.row}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonWide]}
                  onPress={() => setIsShiftPressed(!isShiftPressed)}
                >
                  <View style={[styles.buttonInner, isShiftPressed && styles.buttonShiftActive]}>
                    <Text style={[styles.buttonTextSmall, isShiftPressed && styles.buttonTextShiftActive]}>Shift</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonWide]}
                  onPress={handleBackspace}
                >
                  <View style={styles.buttonInner}>
                    <Text style={styles.buttonText}>←</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonWide]}
                  onPress={handleSpace}
                >
                  <View style={styles.buttonInner}>
                    <Text style={styles.buttonTextSmall}>스페이스</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonWide]}
                  onPress={onClose}
                >
                  <View style={[styles.buttonInner, styles.buttonConfirm]}>
                    <Text style={[styles.buttonText, styles.buttonTextConfirm]}>✓</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
