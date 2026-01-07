# Sprint 1 - Implementation Plan

## Overview
Set up the Micromuu cattle inventory app with Expo, Firebase authentication (email/password), user registration, and bilingual support (English/Spanish).

## Phase 1: Project Setup

### 1.1 Create Expo Project
- Initialize Expo project with TypeScript template
- Configure for Android, iOS, and Web platforms
- Set up directory structure:
  ```
  src/
    components/     # Reusable UI components
    screens/        # Screen components
    navigation/     # Navigation configuration
    services/       # Firebase and API services
    hooks/          # Custom React hooks
    i18n/           # Internationalization files
    types/          # TypeScript type definitions
    utils/          # Utility functions
  ```

### 1.2 Install Dependencies
- Firebase SDK (@react-native-firebase/* for native, firebase for web)
- Navigation (react-navigation)
- Material Design 3 (react-native-paper)
- i18n (i18next, react-i18next, expo-localization)
- Testing (jest, @testing-library/react-native, playwright)
- Environment variables (react-native-dotenv)

### 1.3 Environment Configuration
- Create `.env` file for Firebase configuration
- Create `.env.example` with placeholder values
- Add `.env` to `.gitignore`

## Phase 2: Firebase Setup

### 2.1 Firebase Configuration
- Set up Firebase config using environment variables
- Initialize Firebase app with platform detection
- Configure Firestore with offline persistence

### 2.2 Firestore Security Rules
- Create rules for `profiles` collection:
  - Users can only read/write their own profile
  - Validate required fields (name, lastName)
  - Prevent direct user creation without authentication

### 2.3 Authentication Setup
- Configure Firebase Auth for email/password sign-in
- Set up auth persistence with AsyncStorage for React Native

## Phase 3: Internationalization

### 3.1 i18n Configuration
- Set up i18next with device locale detection
- Create translation files:
  - `en.json` (English)
  - `es.json` (Spanish)
- Implement language fallback (default to English)

### 3.2 Translation Keys
- Authentication screens (login, register)
- Welcome screen
- Form labels and validation messages
- Error messages

## Phase 4: Authentication Flow

### 4.1 Navigation Structure
- Auth stack (unauthenticated users):
  - Login screen
  - Registration screen
- Main stack (authenticated users):
  - Welcome screen
  - (Future: Home/Dashboard)

### 4.2 Login Screen
- Email input field
- Password input field with show/hide toggle
- "Sign In" button
- Link to registration for new users
- Form validation and error handling

### 4.3 Registration Screen
- Form fields: Name, Last Name, Email, Password, Confirm Password
- Form validation (required fields, email format, password match, min length)
- Submit creates user and profile in one flow
- Automatic login after successful registration

### 4.4 Profile Creation
- On successful authentication after registration:
  - Create profile document in Firestore
  - Store: name, lastName, email, createdAt, userId
- Automatic login after registration

## Phase 5: Welcome Screen

### 5.1 Welcome Screen
- Display personalized welcome message with user's name
- Localized content based on device language
- Navigation to main app (placeholder for Sprint 2)

## Phase 6: UI/UX - Cowboy Style

### 6.1 Theme Configuration
- Material Design 3 custom theme with cowboy aesthetic
- Color palette: earthy browns, tan, rust, cream
- Typography: western-inspired fonts where available
- Custom component styling

### 6.2 Visual Elements
- Cowboy-themed decorative elements
- Branded splash screen
- Consistent styling across all screens

## Phase 7: Testing

### 7.1 Unit Tests
- Authentication service functions
- Form validation logic
- i18n configuration
- Custom hooks

### 7.2 Integration Tests
- Registration flow
- Login flow
- Profile creation

### 7.3 E2E Tests (Playwright)
- Complete registration journey
- Complete login journey
- Language switching verification

## Deliverables
1. Fully configured Expo project with Expo SDK 54
2. Working email/password authentication with Firebase
3. Registration with profile creation in Firestore
4. Bilingual support (EN/ES) with device locale detection
5. Cowboy-styled UI with Material Design 3 "Dusty Trail" theme
6. Test suite: 28 unit tests + 2 E2E tests with Playwright
