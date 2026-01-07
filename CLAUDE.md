# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Micromuu is a cattle inventory management app targeting Android, iOS, and Web platforms.

## Tech Stack

- **Framework**: Expo SDK 54 with React Native and React Native Web (TypeScript)
- **Backend**: Firebase (Firestore database named 'micromuu', Storage, Authentication with email/password)
- **Design System**: Material Design 3 via react-native-paper, with custom cowboy-themed components
- **Internationalization**: i18next with English and Spanish (device language detection)
- **Testing**: Jest for unit tests, Playwright for e2e tests

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platforms
npm run ios
npm run android
npm run web

# Run tests
npm test                    # Unit tests
npm run test:coverage       # Unit tests with coverage
npm run test:e2e           # E2E tests (requires web running)

# Type checking
npm run typecheck
```

## Project Structure

```
src/
  components/           # UI components (ImagePicker, cowboy-themed components)
  hooks/                # useAuth, useAuthContext
  i18n/                 # Translation files (en.json, es.json)
  navigation/           # React Navigation setup (AppNavigator)
  screens/              # LoginScreen, RegisterScreen, WelcomeScreen, DashboardScreen, AddFarmScreen, EditFarmScreen
  services/             # Firebase, auth, profile, farms services
  theme/                # Material Design 3 cowboy theme
  types/                # TypeScript type definitions (auth, navigation, farms)
context/                # Sprint documentation
e2e/                    # Playwright e2e tests (auth.spec.ts, farms.spec.ts)
```

## Architecture Notes

- Sprint-based development tracked in `context/sprint#.md` files
- Each sprint produces `sprint#-plan.md` and `sprint#-review.md`
- Environment variables in `.env` (copy from `.env.example`)
- Firestore rules in `firestore.rules`, Storage rules in `storage.rules`
- Email/password authentication via Firebase Auth
- AuthProvider wraps the app providing auth state via context
- Farms belong to users (userId field), soft-deleted via archive (status: 'archived')
- Farm images stored in Firebase Storage at `farms/{userId}/{farmId}/profile.jpg`

## Key Constraints

- All secrets must be in `.env` and never exposed
- UI must support both English and Spanish based on device locale
- Database and storage rules must be thoroughly secured
- O'Saasy license - allows use but not competing SaaS offerings
