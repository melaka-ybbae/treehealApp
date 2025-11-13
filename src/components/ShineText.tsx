import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

interface ShineTextProps {
  children: string;
  style?: any;
}

/**
 * 좌상단에서 우하단으로 대각선 반짝임 효과가 있는 텍스트
 */
export default function ShineText({ children, style }: ShineTextProps) {
  const shineAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    // 2초마다 반짝임 효과 반복
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shineAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.delay(1000), // 2초 대기
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [shineAnim]);

  // 좌상단에서 우하단까지 이동 (텍스트 전체 커버)
  const translateX = shineAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 800], // 더 넓은 범위
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>{children}</Text>

      {/* 반짝임 오버레이 */}
      <Animated.View
        style={[
          styles.shine,
          {
            transform: [
              { translateX: translateX },
              { translateY: translateX }, // 대각선 이동
              { rotate: '45deg' },
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%', // 전체 너비 사용
  },
  text: {
    // 부모에서 스타일 적용
  },
  shine: {
    position: 'absolute',
    top: -150,
    left: -100,
    width: 100, // 더 넓게 (긴 텍스트 커버)
    height: 400, // 더 길게
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    opacity: 1,
  },
});
