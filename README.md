# Stuff Happens Mobile App

A React Native mobile application built with Expo and TypeScript for managing and organizing your stuff.

<!-- SSH push access configured: 2025-08-08 -->

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device (for testing)

### Installation & Setup

**Step 1: Install Dependencies**

```bash
npm install
```

**Step 2: Start the Development Server**

```bash
npm start
```

or

```bash
npx expo start
```

## 📱 Testing Instructions

**IMPORTANT**: All testing must be done via Windows Command Prompt. Follow these steps:

### 1. Install Dependencies

Open Windows Command Prompt and run:

```cmd
npm install
```

### 2. Start Development Server

```cmd
npm start
```

### 3. Test on Mobile Device

1. Install "Expo Go" app from App Store (iOS) or Google Play Store (Android)
2. After running `npm start`, a QR code will appear in the terminal
3. Scan the QR code with your device:
   - **iOS**: Use the built-in Camera app
   - **Android**: Use the Expo Go app scanner
4. The app should load on your device

### 4. Test on Web Browser

```cmd
npm run web
```

### 5. Test App Features

#### Navigation Testing:

- ✅ Tap each of the 5 bottom tabs (Home, Stuff, Add, List, Preferences)
- ✅ Verify "Coming Soon" appears on Home, Stuff, Add, and List tabs
- ✅ Verify Preferences tab shows admin menu list

#### Preferences Screen Testing:

- ✅ Tap on "Design System" - should show colors, typography, and components
- ✅ Tap on "Authentication" - should show login/register form placeholders
- ✅ Tap on "App Settings" - should show toggle switches and setting options
- ✅ Tap on "About" - should show app information and version details
- ✅ Tap on "Developer Tools" - should show debug options and system info
- ✅ Test back navigation on all admin screens

#### UI/UX Testing:

- ✅ Verify smooth tab transitions
- ✅ Check that all text is readable
- ✅ Verify icons appear correctly
- ✅ Test touch interactions (buttons, switches, lists)
- ✅ Ensure proper spacing and alignment

### 6. TypeScript Checking

```cmd
npm run type-check
```

### 7. Running Tests

```cmd
npm test
```

## 🏗️ Project Structure

```
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── stuff.tsx      # Stuff screen
│   │   ├── add.tsx        # Add screen
│   │   ├── list.tsx       # List screen
│   │   └── preferences.tsx # Preferences screen
│   ├── _layout.tsx        # Root layout
│   ├── design-system.tsx  # Design system showcase
│   ├── authentication.tsx # Auth placeholder screens
│   ├── app-settings.tsx   # App settings screen
│   ├── about.tsx          # About screen
│   └── developer-tools.tsx # Developer tools screen
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   ├── screens/          # Screen components
│   ├── navigation/       # Navigation configuration
│   ├── services/         # API and external services
│   ├── store/           # State management
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript definitions
│   ├── constants/       # App constants
│   └── hooks/           # Custom React hooks
├── assets/              # Static assets (images, fonts)
├── CLAUDE.md           # Claude Code development guidelines
└── README.md           # This file
```

## 🎨 Features Implemented

### ✅ Phase 1: Core Project Setup

- [x] Expo React Native project with TypeScript
- [x] Git integration with proper .gitignore
- [x] Main navigation with 5 tabs (Home, Stuff, Add, List, Preferences)
- [x] Placeholder screens for first 4 tabs
- [x] Preferences screen with admin navigation

### ✅ Phase 2: Admin Screens

- [x] Design System showcase screen
- [x] Authentication placeholder screens
- [x] App Settings with toggle switches
- [x] About screen with app information
- [x] Developer Tools with debug options

### 🚧 Planned Features (Future Phases)

- [ ] Code quality tools (ESLint, Prettier, Husky)
- [ ] Environment configuration
- [ ] State management with Zustand
- [ ] API layer foundation
- [ ] Testing framework setup
- [ ] Supabase integration

## 🛠️ Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator (macOS only)
- `npm run web` - Run in web browser
- `npm test` - Run tests
- `npm run lint` - Lint code (when configured)
- `npm run type-check` - TypeScript type checking

### Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Icons**: Material Icons (@expo/vector-icons)
- **UI**: React Native built-in components
- **State Management**: Zustand (planned)
- **Testing**: Jest + React Native Testing Library (planned)

## 📋 User Stories Status

### ✅ Completed

- User Story 1: Initialize React Native Project with Expo ✅
- User Story 2: Connect Project to GitHub Repository ✅
- User Story 3: Implement Main Navigation Structure ✅
- User Story 6: Preferences Screen with Admin Navigation ✅
- User Story 7: Design System Placeholder Screen ✅
- User Story 8: Basic Authentication UI (Placeholder) ✅

### 🚧 In Progress

- User Story 4: Development Tools and Code Quality
- User Story 5: Environment Configuration
- User Story 9: State Management Setup
- User Story 10: API Layer Foundation

## 🤝 Contributing

1. Follow the development principles outlined in `CLAUDE.md`
2. Use TypeScript strictly - avoid `any` types
3. Keep functions small and focused (10-20 lines ideal)
4. Write meaningful component and variable names
5. Test all changes manually using the testing instructions above

## 📄 License

This project is for educational and demonstration purposes.

---

**Next Steps**: Run `npm install` followed by `npm start` to begin development and testing!
