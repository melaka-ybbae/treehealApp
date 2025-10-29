# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TreeHeal is a React Native insurance consultation platform built with TypeScript and StyleSheet (no Tailwind CSS). The app implements a multi-step insurance consultation flow in Korean, allowing users to select consultation types, browse consultants, and submit their information for insurance advice.

## Development Commands

### Running the App

```bash
# Start Metro bundler
npm start

# Run on Android emulator (requires Android Studio + Java JDK)
npm run android

# Run on iOS simulator (requires Xcode, macOS only)
npm run ios

# Run web version (using Expo)
npm run web
```

### Development Tools

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Run tests
npm test

# Clear Metro cache (when experiencing bundler issues)
npm start -- --reset-cache
```

### iOS Setup (First time or after dependency changes)

```bash
# Install Ruby bundler for CocoaPods
bundle install

# Install iOS dependencies
bundle exec pod install
```

## Architecture

### Application Flow

The app is a single-page application built around a step-based state machine in [src/screens/InsuranceApp.tsx](src/screens/InsuranceApp.tsx):

1. **Splash Screen** - Welcome/branding screen
2. **Realtime Dashboard** - Live table of insurance applications
3. **Consultation Type** - Choose claim or free consultation
4. **Interest Selection** - Select insurance categories (실손보험, 수술비, 진단비, etc.)
5. **Consultant Selection** - Browse 10 professional consultants
6. **Consultant Detail** - View detailed consultant qualifications
7. **User Info Form** - Collect customer details (name, birthdate, phone, region)
8. **Review** - Review all entered information
9. **Agreement Modal** - Privacy policy and terms acceptance
10. **Confirmation** - Success screen with estimated response time

The state is managed via a single `currentStep` state variable and `formData` object. Navigation is handled through conditional rendering based on `steps[currentStep]`.

### Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Button.tsx    # Custom button with companion styles file
│   └── Icons.tsx     # Custom SVG icon components (no external icon library)
├── screens/          # Main application screens
│   ├── InsuranceApp.tsx        # Primary app with all consultation flow steps
│   └── HomeScreen.tsx          # Example screen (not currently used)
├── styles/           # Global style constants
│   ├── colors.ts     # Color palette definitions
│   ├── spacing.ts    # Spacing/padding constants
│   └── index.ts      # Style exports
└── utils/
    ├── types.ts      # TypeScript interfaces (FormData, Consultant, StepType, etc.)
    └── constants.ts  # App data (CONSULTANTS, KOREAN_REGIONS, etc.)
```

Entry point: [App.tsx](App.tsx) renders `InsuranceApp` wrapped in `SafeAreaProvider`.

### Styling Pattern

**All styling uses React Native StyleSheet API** - no Tailwind CSS, no CSS-in-JS libraries.

Each screen/component follows this pattern:
- Component file: `ComponentName.tsx`
- Styles file: `ComponentName.styles.ts`

Component imports styles with:
```typescript
import { styles } from './ComponentName.styles';
```

Styles file exports:
```typescript
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
```

Global colors and spacing are available in [src/styles/](src/styles/).

### Key Technical Decisions

1. **No Navigation Library**: App uses conditional rendering based on step index instead of React Navigation
2. **Custom SVG Icons**: Icons are custom SVG components in [src/components/Icons.tsx](src/components/Icons.tsx) instead of using lucide-react or other icon libraries
3. **StyleSheet Only**: Pure React Native StyleSheet for all styling, no Tailwind or styled-components
4. **Single Screen State Machine**: The entire consultation flow is managed in one component with step-based state
5. **Korean Localization**: All UI text, consultant data, and regions are in Korean

### Data & Constants

Static data is defined in [src/utils/constants.ts](src/utils/constants.ts):

- `CONSULTANTS` - 10 professional insurance consultants with profiles and qualifications
- `CONSULTATION_TYPES` - Claim vs. free consultation options
- `INTEREST_OPTIONS` - Insurance categories
- `KOREAN_REGIONS` - 17 regions of South Korea
- `REALTIME_APPLICATIONS` - Mock realtime application data for dashboard

## TypeScript

The project extends `@react-native/typescript-config`. Key interfaces in [src/utils/types.ts](src/utils/types.ts):

- `FormData` - All user input state
- `Consultant` - Consultant profile structure
- `StepType` - Union type of all step names
- `RealtimeApplication` - Dashboard application structure

## Testing & Building

The app uses Jest for testing. Test files are located in `__tests__/` directory.

## Platform Requirements

- Node.js >= 20 (specified in package.json engines)
- For Android: Java JDK + Android Studio + Android SDK
- For iOS: Xcode (macOS only)
- For quick testing: Use Expo Go app on phone (recommended, no native setup required)

## React Native Version

- React Native: 0.81.5
- React: 19.1.0
- Expo: ^54.0.20 (for web and development tools)
