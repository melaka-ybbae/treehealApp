import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, TouchableWithoutFeedback } from 'react-native';
import { styles } from './NumericKeypad.styles';
import { XIcon } from './Icons';
import { scale } from '../utils/scaling';

interface NumericKeypadProps {
  visible: boolean;
  onNumberPress: (num: string) => void;
  onBackspace: () => void;
  onClose: () => void;
}

export default function NumericKeypad({ visible, onNumberPress, onBackspace, onClose }: NumericKeypadProps) {
  const slideAnim = useRef(new Animated.Value(500)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

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

  const numbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['✓', '0', '←'],
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
                <Text style={styles.headerTitle}>숫자 입력</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <XIcon size={scale(32)} color="#000" />
                </TouchableOpacity>
              </View>
              {numbers.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((num, colIndex) => {
                    const isBackspace = num === '←';
                    const isConfirm = num === '✓';

                    return (
                      <TouchableOpacity
                        key={colIndex}
                        style={styles.button}
                        onPress={() => {
                          if (isBackspace) {
                            onBackspace();
                          } else if (isConfirm) {
                            onClose();
                          } else {
                            onNumberPress(num);
                          }
                        }}
                      >
                        <View style={[styles.buttonInner, isConfirm && styles.buttonConfirm]}>
                          <Text style={[styles.buttonText, isConfirm && styles.buttonTextConfirm]}>{num}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
