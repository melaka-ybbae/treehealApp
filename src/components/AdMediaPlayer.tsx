import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { AdItem } from '../utils/types';
import { getMediaType } from '../services/fmadService';
import { styles } from './AdMediaPlayer.styles';

interface AdMediaPlayerProps {
  ad: AdItem;
  onAdComplete: () => void; // 광고 재생 완료 시 호출
  displayDuration: number; // 이미지 광고 표시 시간(초)
  onAdClick?: (clickUrl: string) => void; // 광고 클릭 시 호출
  clickUrl: string; // 광고 클릭 URL (빈 문자열이면 클릭 불가)
  height: number; // 플레이어 높이
}

export default function AdMediaPlayer({
  ad,
  onAdComplete,
  displayDuration,
  onAdClick,
  clickUrl,
  height,
}: AdMediaPlayerProps) {
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'unknown'>('unknown');
  const videoRef = useRef<Video>(null);
  const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // 미디어 타입 결정
    const type = getMediaType(ad.Image);
    setMediaType(type);
    console.log(`[AdMediaPlayer] 광고 타입: ${type}, URL: ${ad.Image}`);

    // 이미지 광고인 경우 타이머 설정
    if (type === 'image') {
      console.log(`[AdMediaPlayer] 이미지 광고 타이머 설정: ${displayDuration}초`);
      imageTimerRef.current = setTimeout(() => {
        console.log('[AdMediaPlayer] 이미지 광고 시간 종료, 다음 광고로 전환');
        onAdComplete();
      }, displayDuration * 1000);
    }

    return () => {
      // 클린업
      if (imageTimerRef.current) {
        clearTimeout(imageTimerRef.current);
        imageTimerRef.current = null;
      }
    };
  }, [ad.Image, displayDuration]); // onAdComplete 제거!

  // 비디오 재생 시작 (mediaType이 설정된 후)
  useEffect(() => {
    if (mediaType === 'video' && videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current?.playAsync();
          console.log('[AdMediaPlayer] 비디오 재생 시작');
        } catch (err) {
          console.error('[AdMediaPlayer] 비디오 재생 실패:', err);
        }
      };

      // 약간의 딜레이 후 재생 (비디오 로드 대기)
      const timer = setTimeout(playVideo, 100);
      return () => clearTimeout(timer);
    }
  }, [mediaType]);

  const handleVideoPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      // 비디오 재생 완료
      onAdComplete();
    }
  };

  const handleAdPress = () => {
    if (clickUrl && clickUrl !== '' && onAdClick) {
      onAdClick(clickUrl);
      // 외부 브라우저로 링크 열기
      Linking.openURL(clickUrl).catch(err =>
        console.error('링크 열기 실패:', err)
      );
    }
  };

  const isClickable = clickUrl && clickUrl !== '';

  const containerStyle = [
    styles.container,
    { height },
    isClickable && styles.clickable,
  ];

  if (mediaType === 'video') {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={handleAdPress}
        activeOpacity={isClickable ? 0.8 : 1}
        disabled={!isClickable}
      >
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: ad.Image }}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={true}
          isLooping={false}
          isMuted={true}
          volume={0}
          rate={1.0}
          useNativeControls={false}
          onPlaybackStatusUpdate={handleVideoPlaybackStatusUpdate}
        />
      </TouchableOpacity>
    );
  }

  if (mediaType === 'image') {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={handleAdPress}
        activeOpacity={isClickable ? 0.8 : 1}
        disabled={!isClickable}
      >
        <Image
          source={{ uri: ad.Image }}
          style={styles.media}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }

  // 미디어 타입을 알 수 없는 경우 빈 화면
  return <View style={[styles.container, { height }]} />;
}
