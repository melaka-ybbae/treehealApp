# TreeHeal Insurance Consultation APP

A comprehensive React Native insurance consultation platform built with **StyleSheet** (no Tailwind).

## Features

### Complete Multi-Step Insurance Consultation Flow

1. **Splash Screen** - Welcome screen with TreeHeal branding
2. **Realtime Dashboard** - Live insurance application status table
3. **Consultation Type Selection** - Choose between claim consultation or free consultation
4. **Interest Selection** - Select insurance categories (실손보험, 수술비, 진단비, etc.)
5. **Consultant Selection** - Browse and select from 10 professional consultants
6. **Consultant Profile** - View detailed consultant experience and qualifications
7. **User Information Form** - Collect customer details (name, birthdate, phone, region)
8. **Review Screen** - Review all entered information before submission
9. **Agreement Modal** - Handle privacy policy and terms agreements
10. **Confirmation** - Success screen with estimated response time

## Technology Stack

- **React Native** - Mobile framework
- **TypeScript** - Type safety
- **StyleSheet** - Native styling (NO Tailwind CSS)
- **React Native SVG** - Custom icons
- **React Navigation** - Navigation system
- **Expo** - Development and testing platform

## Project Structure

```
TreeHealAPP/
├── src/
│   ├── components/
│   │   ├── Button.tsx              # Reusable button component
│   │   ├── Button.styles.ts
│   │   └── Icons.tsx                # Custom SVG icons
│   ├── screens/
│   │   ├── InsuranceApp.tsx         # Main insurance app
│   │   ├── InsuranceApp.styles.ts   # App styles
│   │   ├── HomeScreen.tsx           # Example home screen
│   │   └── HomeScreen.styles.ts
│   ├── styles/
│   │   ├── colors.ts                # Color palette
│   │   ├── spacing.ts               # Spacing constants
│   │   └── index.ts
│   └── utils/
│       ├── types.ts                 # TypeScript types
│       └── constants.ts             # App constants
├── App.tsx                          # Main entry point
└── package.json
```

## Quick Start

### Option 1: Run with Expo Go (EASIEST - RECOMMENDED)

1. **Install Expo Go on your phone:**
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Scan the QR code** with Expo Go app (Android) or Camera app (iOS)

4. **The app loads instantly on your phone!**

### Option 2: Android Emulator

Requirements: Java JDK + Android Studio + Android SDK

```bash
npm run android
```

### Option 3: iOS Simulator (Mac only)

Requirements: Xcode

```bash
npm run ios
```

## Key Features Implemented

### 1. **No Tailwind CSS - Pure StyleSheet**
Every component uses React Native StyleSheet for styling:

```typescript
// Component
import { styles } from './Component.styles';

// Styles file
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
```

### 2. **Custom SVG Icons**
Replaced lucide-react with custom SVG components:
- HeartIcon, ShieldIcon, ActivityIcon, UsersIcon
- ChevronLeftIcon, ChevronRightIcon, CheckIcon

### 3. **Type-Safe with TypeScript**
Full TypeScript support with proper types:
- FormData interface
- Consultant interface
- Step types

### 4. **Responsive Design**
- Works on all screen sizes
- Dimensions-based calculations
- ScrollView for long content

### 5. **Real Korean Data**
- Korean regions (17 regions)
- Korean consultant names
- Korean UI text

## Data & Constants

### Consultants
10 professional insurance consultants with:
- Profile images
- Career information
- Experience & qualifications

### Consultation Types
- 보험금 청구 상담 (Claim consultation)
- 무료 보험 상담 (Free consultation)

### Interest Categories
- 실손보험 (Actual expense insurance)
- 수술비 (Surgery costs)
- 진단비 (Diagnosis costs)
- 기타상담 (Other consultations)

### Korean Regions
All 17 regions of South Korea including:
- 서울특별시, 부산광역시, etc.

## Development

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm start
```

### TypeScript Check
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

## Styling Pattern

Each screen/component follows this pattern:

**Component File (InsuranceApp.tsx):**
```typescript
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './InsuranceApp.styles';

export default function InsuranceApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Click</Text>
      </TouchableOpacity>
    </View>
  );
}
```

**Styles File (InsuranceApp.styles.ts):**
```typescript
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
```

## User Flow

1. **Splash** → Click "시작하기"
2. **Realtime Dashboard** → See live applications → Click "무료상담 신청하기"
3. **Select Consultation Type** → Choose claim or free
4. **Select Interests** → Choose insurance categories
5. **Select Consultant** → Pick from 10 consultants
6. **View Consultant Detail** → See qualifications → Confirm
7. **Enter User Info** → Name, birthdate, gender, phone, region
8. **Review Information** → Check all details
9. **Agree to Terms** → Accept privacy policy and terms
10. **Confirmation** → See success message

## Converting from Web to React Native

### What Changed from Your Web Code:

| Web (React) | React Native |
|-------------|--------------|
| `<div>` | `<View>` |
| `<button>` | `<TouchableOpacity>` |
| `<img>` | `<Image>` |
| `<input>` | `<TextInput>` |
| `<select>` | Custom picker/buttons |
| `className="..."` | `style={styles...}` |
| `lucide-react` icons | Custom SVG icons |
| Tailwind CSS | StyleSheet |

### Key Conversions:

**Before (Web):**
```jsx
<div className="flex flex-col bg-green-500 p-4">
  <button className="bg-white text-green-500">Click</button>
</div>
```

**After (React Native):**
```tsx
<View style={styles.container}>
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Click</Text>
  </TouchableOpacity>
</View>

// In styles file:
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#4CAF50',
    padding: 16,
  },
  button: {
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#4CAF50',
  },
});
```

## Next Steps

1. **Test on your phone** - Use Expo Go for instant testing
2. **Customize styling** - Modify StyleSheet files
3. **Add features** - Build on the existing structure
4. **Connect backend** - Add API integration
5. **Add analytics** - Track user behavior

## Troubleshooting

### Metro bundler issues
```bash
npm start -- --reset-cache
```

### Dependency issues
```bash
npm install
```

### TypeScript errors
```bash
npx tsc --noEmit
```

## Environment Requirements

- ✅ Node.js >= 20 (Installed)
- ✅ npm >= 10 (Installed)
- ✅ All dependencies installed
- ❌ Java JDK (only for Android native build)
- ❌ Android Studio (only for Android native build)
- ❌ Xcode (only for iOS native build)

**Use Expo Go to skip Java/Android Studio setup!**

## How to Run NOW:

```bash
# Start the app
npm start

# Then scan the QR code with Expo Go app on your phone
```

## Support

- React Native: https://reactnative.dev/docs/getting-started
- Expo: https://docs.expo.dev/
- React Native SVG: https://github.com/software-mansion/react-native-svg

---

Built with ❤️ using React Native + StyleSheet (NO Tailwind CSS)
