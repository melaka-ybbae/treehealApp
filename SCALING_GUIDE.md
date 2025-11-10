# 반응형 스케일링 가이드

TreeHeal 앱은 **1080 x 1920 해상도**를 기준으로 디자인되었지만, 다양한 화면 크기에서 자동으로 비율을 맞추는 반응형 스케일링 시스템을 제공합니다.

## 스케일링 시스템

### 기본 개념

모든 크기 값(폰트, 패딩, 마진, 너비, 높이 등)은 기준 해상도(1080x1920)를 기준으로 작성하고, 스케일링 함수를 통해 현재 디바이스 해상도에 맞게 자동 변환됩니다.

### 스케일링 함수

#### 1. `scaleFont(size)` - 폰트 크기
```typescript
fontSize: scaleFont(40)  // 1080px 기준 40 → 디바이스에 맞게 자동 조정
```

#### 2. `scaleSpacing(size)` - 간격 (패딩, 마진)
```typescript
padding: scaleSpacing(60)
marginTop: scaleSpacing(40)
gap: scaleSpacing(20)
```

#### 3. `scale(size)` - 일반 크기 (아이콘, 정사각형 요소)
```typescript
width: scale(150)
height: scale(150)
borderRadius: scale(24)
borderWidth: scale(2)
```

#### 4. `scaleWidth(size)` - 너비 기준 스케일링
```typescript
width: scaleWidth(500)
```

#### 5. `scaleHeight(size)` - 높이 기준 스케일링
```typescript
height: scaleHeight(800)
```

## 사용 방법

### 1. 기본 사용법

**Before (고정 크기):**
```typescript
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 56,
    marginBottom: 20,
  },
  button: {
    padding: 40,
    borderRadius: 24,
  },
});
```

**After (반응형):**
```typescript
import { StyleSheet } from 'react-native';
import { scaleFont, scaleSpacing, scale } from '../utils/scaling';

export const styles = StyleSheet.create({
  title: {
    fontSize: scaleFont(56),
    marginBottom: scaleSpacing(20),
  },
  button: {
    padding: scaleSpacing(40),
    borderRadius: scale(24),
  },
});
```

### 2. 완전한 예시

```typescript
import { StyleSheet } from 'react-native';
import { scaleFont, scaleSpacing, scale } from '../utils/scaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleSpacing(60),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: scaleFont(56),
    fontWeight: 'bold',
    marginBottom: scaleSpacing(20),
  },
  card: {
    padding: scaleSpacing(40),
    borderWidth: scale(4),
    borderRadius: scale(32),
    marginVertical: scaleSpacing(20),
  },
  icon: {
    width: scale(150),
    height: scale(150),
    borderRadius: scale(75),
  },
  buttonText: {
    fontSize: scaleFont(40),
    fontWeight: '600',
  },
});
```

## 함수 선택 가이드

| 속성 타입 | 사용할 함수 | 예시 |
|---------|-----------|------|
| 폰트 크기 | `scaleFont()` | `fontSize: scaleFont(40)` |
| 패딩/마진 | `scaleSpacing()` | `padding: scaleSpacing(60)` |
| Gap | `scaleSpacing()` | `gap: scaleSpacing(20)` |
| 보더 두께 | `scale()` | `borderWidth: scale(2)` |
| 보더 반경 | `scale()` | `borderRadius: scale(24)` |
| 아이콘 크기 | `scale()` | `width: scale(150)` |
| 정사각형 요소 | `scale()` | `width: scale(200), height: scale(200)` |

## 디바이스 정보

앱은 자동으로 다음 정보를 감지합니다:

```typescript
import { deviceInfo } from '../utils/scaling';

console.log(deviceInfo.width);        // 현재 디바이스 너비
console.log(deviceInfo.height);       // 현재 디바이스 높이
console.log(deviceInfo.widthScale);   // 너비 스케일 비율
console.log(deviceInfo.heightScale);  // 높이 스케일 비율
console.log(deviceInfo.isSmallDevice);  // 720px 미만
console.log(deviceInfo.isMediumDevice); // 720px ~ 1080px
console.log(deviceInfo.isLargeDevice);  // 1080px 이상
```

## 스케일링 정보 확인

앱 시작 시 콘솔에서 스케일링 정보를 확인할 수 있습니다:

```
=== Scaling Info ===
Base Resolution: 1080x1920
Device Resolution: 720x1280
Width Scale: 0.67x
Height Scale: 0.67x
Device Type: Small
==================
```

## 기존 스타일 마이그레이션

모든 `.styles.ts` 파일에 스케일링을 적용하려면:

1. 스케일링 함수 import 추가
2. 모든 숫자 값을 적절한 스케일링 함수로 감싸기

### 자동 변환 패턴

다음 정규식을 사용하여 일괄 변환할 수 있습니다:

```
fontSize: (\d+)       → fontSize: scaleFont($1)
padding: (\d+)        → padding: scaleSpacing($1)
margin: (\d+)         → margin: scaleSpacing($1)
borderRadius: (\d+)   → borderRadius: scale($1)
borderWidth: (\d+)    → borderWidth: scale($1)
```

## 주의사항

### 스케일링하지 말아야 할 경우

1. **flex 값**: `flex: 1`은 스케일링하지 않음
2. **퍼센트 값**: 이미 반응형이므로 스케일링 불필요
3. **aspectRatio**: 비율은 고정
4. **position 값**: `absolute`, `relative` 등
5. **zIndex**: 레이어 순서는 고정

```typescript
// ✅ 올바른 사용
container: {
  flex: 1,  // 스케일링 안 함
  padding: scaleSpacing(60),  // 스케일링
  aspectRatio: 1,  // 스케일링 안 함
}

// ❌ 잘못된 사용
container: {
  flex: scale(1),  // 불필요
  aspectRatio: scale(1),  // 잘못됨
}
```

## 해상도별 동작

| 디바이스 해상도 | 스케일 비율 | 예시 (fontSize: 40) |
|--------------|-----------|-------------------|
| 540 x 960 (Small) | 0.5x | 20px |
| 720 x 1280 (Medium) | 0.67x | 27px |
| 1080 x 1920 (Base) | 1.0x | 40px |
| 1440 x 2560 (Large) | 1.33x | 53px |

## 테스트

다양한 해상도에서 테스트하려면:

1. **Android Emulator**: 다양한 AVD 생성 (Small Phone, Medium Tablet, Large Tablet)
2. **Web**: 브라우저 개발자 도구에서 해상도 변경
3. **iOS Simulator**: 다양한 디바이스 선택

## 예시 프로젝트

ConsultationTypeScreen이 스케일링을 적용한 예시입니다:
- [src/screens/ConsultationTypeScreen.styles.ts](src/screens/ConsultationTypeScreen.styles.ts)

## 추가 리소스

- [src/utils/scaling.ts](src/utils/scaling.ts) - 스케일링 유틸리티 소스 코드
- [App.tsx](App.tsx) - 스케일링 정보 로그 출력
