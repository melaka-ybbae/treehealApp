import { Dimensions, PixelRatio } from 'react-native';

// 기준 디자인 해상도 (1080 x 1920)
const BASE_WIDTH = 1080;
const BASE_HEIGHT = 1864;

// 현재 디바이스 해상도
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

// 스케일 비율 계산
const WIDTH_SCALE = DEVICE_WIDTH / BASE_WIDTH;
const HEIGHT_SCALE = DEVICE_HEIGHT / BASE_HEIGHT;

/**
 * 너비 기준으로 스케일링 (소수점 유지)
 * @param size 기준 해상도(1080px)에서의 크기
 * @returns 현재 디바이스에 맞게 스케일된 크기
 */
export const scaleWidth = (size: number): number => {
  // return size * WIDTH_SCALE;
  return size;
};

/**
 * 높이 기준으로 스케일링 (소수점 유지)
 * @param size 기준 해상도(1920px)에서의 크기
 * @returns 현재 디바이스에 맞게 스케일된 크기
 */
export const scaleHeight = (size: number): number => {
  // return size * HEIGHT_SCALE;
  return size;
};

/**
 * 폰트 크기 스케일링 (너비 기준)  
 * @param size 기준 해상도에서의 폰트 크기
 * @returns 현재 디바이스에 맞게 스케일된 폰트 크기
 */
export const scaleFont = (size: number): number => {
  // return scaleWidth(size);
  return size;
};

/**
 * 일반적인 크기 스케일링 (너비와 높이 중 작은 비율 사용)
 * 정사각형 요소나 아이콘 등에 사용
 * @param size 기준 크기
 * @returns 스케일된 크기
 */
export const scale = (size: number): number => {
  const minScale = Math.min(WIDTH_SCALE, HEIGHT_SCALE);
  // return size * minScale;
  return size;
};

/**
 * 반응형 간격 (패딩, 마진 등)
 * 너비 기준으로 스케일링
 */
export const scaleSpacing = (size: number): number => {
  // return scaleWidth(size);
  return size;
};

/**
 * 디바이스 정보
 */
export const deviceInfo = {
  width: DEVICE_WIDTH,
  height: DEVICE_HEIGHT,
  widthScale: WIDTH_SCALE,
  heightScale: HEIGHT_SCALE,
  isSmallDevice: DEVICE_WIDTH < 720, // 720px 미만
  isMediumDevice: DEVICE_WIDTH >= 720 && DEVICE_WIDTH < 1080,
  isLargeDevice: DEVICE_WIDTH >= 1080,
};

/**
 * 디버그 정보 출력
 */
export const logScalingInfo = () => {
  console.log('=== Scaling Info ===');
  console.log(`Base Resolution: ${BASE_WIDTH}x${BASE_HEIGHT}`);
  console.log(`Device Resolution: ${DEVICE_WIDTH}x${DEVICE_HEIGHT}`);
  console.log(`Width Scale: ${WIDTH_SCALE.toFixed(2)}x`);
  console.log(`Height Scale: ${HEIGHT_SCALE.toFixed(2)}x`);
  console.log(`Device Type: ${
    deviceInfo.isSmallDevice ? 'Small' :
    deviceInfo.isMediumDevice ? 'Medium' : 'Large'
  }`);
  console.log('==================');
};
