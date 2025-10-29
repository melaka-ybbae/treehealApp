# Expo Go 호환 가이드

이 프로젝트를 Expo Go와 호환되도록 수정했습니다.

## 변경 사항

### 1. **index.js** - Expo 엔트리 포인트 사용
- `registerRootComponent`를 사용하도록 변경
- Expo Go와 네이티브 빌드 모두에서 작동

### 2. **app.json** - Expo 설정 추가
- iOS/Android 번들 ID 설정
- 스플래시 스크린 배경색 설정
- 이미지 에셋 요구사항 제거 (선택사항으로 변경)

### 3. **package.json** - 스크립트 업데이트
- `npm start` → Expo 개발 서버 실행
- `npm run android` → Expo Go에서 Android 실행
- `npm run ios` → Expo Go에서 iOS 실행
- `npm run web` → 웹 브라우저에서 실행

## 실행 방법

### 단계 1: 의존성 설치

```bash
npm install
```

### 단계 2: Expo 서버 시작

```bash
npm start
```

또는

```bash
npx expo start
```

### 단계 3: Expo Go 앱에서 QR 코드 스캔

1. 스마트폰에 **Expo Go** 앱 설치
   - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. 터미널에 표시되는 QR 코드를 스캔
   - Android: Expo Go 앱에서 스캔
   - iOS: 카메라 앱으로 스캔

3. 앱이 자동으로 로드됩니다!

## 문제 해결

### "require" 오류가 발생하는 경우

이전에 발생했던 오류는 다음 변경으로 해결되었습니다:
- `index.js`를 Expo 호환 방식으로 변경
- `registerRootComponent` 사용

### Metro bundler가 느린 경우

```bash
npm start -- --clear
```

캐시를 삭제하고 다시 시작합니다.

### 네트워크 문제

같은 Wi-Fi에 연결되어 있는지 확인하세요. 안 되면:

```bash
npx expo start --tunnel
```

터널 모드로 실행하면 다른 네트워크에서도 작동합니다.

## 추가 옵션

### 웹에서 실행
```bash
npm run web
```

### 특정 플랫폼 지정
```bash
npx expo start --android  # Android만
npx expo start --ios      # iOS만
npx expo start --web      # 웹만
```

### 개발 중 유용한 단축키

Expo 서버 실행 후:
- `a` - Android 에뮬레이터에서 열기
- `i` - iOS 시뮬레이터에서 열기
- `w` - 웹 브라우저에서 열기
- `r` - 앱 새로고침
- `m` - 개발자 메뉴 토글
- `c` - Metro bundler 로그 지우기

## 아이콘 및 스플래시 이미지 추가 (선택사항)

나중에 앱 아이콘과 스플래시 이미지를 추가하려면:

1. `assets/` 폴더에 다음 이미지 추가:
   - `icon.png` - 1024x1024 px
   - `adaptive-icon.png` - 1024x1024 px (Android)
   - `splash.png` - 1284x2778 px
   - `favicon.png` - 48x48 px (웹)

2. `app.json`에서 주석 해제:
   ```json
   "icon": "./assets/icon.png",
   "splash": {
     "image": "./assets/splash.png",
     ...
   }
   ```

또는 자동 생성:
```bash
npx expo prebuild --clean
```

## 네이티브 빌드 (Expo Go 없이)

Expo Go 제한 없이 독립 앱으로 빌드하려면:

```bash
# 개발 클라이언트 설치
npx expo install expo-dev-client

# Android 빌드
npx expo run:android

# iOS 빌드 (macOS만)
npx expo run:ios
```

## 참고 자료

- [Expo 공식 문서](https://docs.expo.dev/)
- [Expo Go 사용법](https://expo.dev/go)
- [React Native 문서](https://reactnative.dev/)
