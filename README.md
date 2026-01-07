# Micromuu Template

A multi-platform starter template built with Expo, React Native, and Firebase. Use this as a foundation to build your own mobile/web application.

## About This Template

This template provides a **ready-to-use starting point** with authentication already configured. It was created for **educational purposes** to demonstrate how to use AI-assisted coding tools to build a full-stack mobile application. The entire codebase was developed through pair programming with [Claude Code](https://claude.ai/code).

**What's included:**
- Email/password authentication (Firebase Auth)
- User registration with profile creation
- Welcome screen after login
- Bilingual support (English/Spanish)
- Material Design 3 theming
- Unit and E2E test setup

**Start building from here** by adding your own screens, services, and features!

## Tech Stack

- **Framework:** Expo SDK 54 with React Native (iOS, Android, Web)
- **Language:** TypeScript
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **UI Library:** React Native Paper (Material Design 3)
- **Navigation:** React Navigation
- **i18n:** i18next (English/Spanish)
- **Testing:** Jest (unit), Playwright (E2E)

## Security

This project has been reviewed against [CVE-2025-55182, CVE-2025-55184, CVE-2025-55183, and CVE-2025-67779](https://expo.dev/changelog/mitigating-critical-security-vulnerability-in-react-server-components) (React Server Components vulnerabilities). These CVEs only affect projects using experimental RSC or Server Functions. This project is **not affected** as it is a client-side application that does not use `react-server-dom-webpack`, `expo-router`, or React Server Components.

**Recommendation:** Upgrade to Expo SDK 55 when available, as it will include all security patches by default.

## Features

- Email/password authentication
- User profile management (name storage in Firestore)
- Welcome screen with personalized greeting
- Bilingual support (English/Spanish based on device locale)
- Cross-platform (iOS, Android, Web)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Git**
- **Expo CLI** (`npm install -g expo-cli`)
- **Firebase CLI** (`npm install -g firebase-tools`)
- **iOS Simulator** (Mac only) or **Android Emulator** (optional, for mobile testing)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd micromuu
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Enable the following services:
   - **Authentication:** Enable Email/Password sign-in method
   - **Firestore Database:** Create a database (start in production mode)
   - **Storage:** Enable Cloud Storage

4. Get your Firebase configuration:
   - Go to Project Settings > General > Your apps
   - Click "Add app" and select Web (</>)
   - Copy the configuration values

### 4. Environment Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Firebase configuration:
   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   EXPO_PUBLIC_APP_SCHEME=micromuu
   ```

### 5. Deploy Firebase Rules

1. Login to Firebase CLI:
   ```bash
   firebase login
   ```

2. Initialize Firebase in the project (if not already done):
   ```bash
   firebase init
   ```
   - Select Firestore, Storage
   - Choose your project
   - Accept default file locations (firestore.rules, storage.rules)

3. Deploy rules and indexes:
   ```bash
   firebase deploy --only firestore:rules,firestore:indexes,storage
   ```

### 6. Run the Application

```bash
# Start development server
npm start

# Run on specific platform
npm run ios      # iOS Simulator (Mac only)
npm run android  # Android Emulator
npm run web      # Web browser
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run ios` | Run on iOS Simulator |
| `npm run android` | Run on Android Emulator |
| `npm run web` | Run in web browser |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run test:e2e:ui` | Run E2E tests with UI |
| `npm run typecheck` | Run TypeScript type checking |

## Running Tests

### Unit Tests

```bash
npm test
```

### E2E Tests

E2E tests require additional setup:

1. Create a Firebase service account:
   - Go to Firebase Console > Project Settings > Service accounts
   - Click "Generate new private key"
   - Save the JSON file securely

2. Set the environment variable:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
   ```

3. Install Playwright browsers (first time only):
   ```bash
   npx playwright install
   ```

4. Run the tests:
   ```bash
   npm run test:e2e
   ```

## Project Structure

```
micromuu/
├── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Translations (en.json, es.json)
│   ├── navigation/       # React Navigation setup
│   ├── screens/          # Screen components
│   ├── services/         # Firebase services
│   ├── theme/            # Material Design 3 theme
│   └── types/            # TypeScript type definitions
├── e2e/                  # Playwright E2E tests
├── context/              # Sprint documentation
├── firestore.rules       # Firestore security rules
├── storage.rules         # Storage security rules
└── App.tsx               # App entry point
```

## Sprint Documentation

Development progress is documented in the `context/` folder:

- `sprint1.md` - Sprint 1 requirements (Authentication)
- `sprint1-plan.md` - Sprint 1 implementation plan
- `sprint1-review.md` - Sprint 1 review and testing

> **Note:** This template branch contains only the authentication foundation (Sprint 1). See the `main` branch for the complete implementation including additional features.

## License

This project is licensed under the O'Saasy License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- Built with [Claude Code](https://claude.ai/code) by Anthropic
- UI components from [React Native Paper](https://reactnativepaper.com/)
- Backend powered by [Firebase](https://firebase.google.com/)
- Mobile framework by [Expo](https://expo.dev/)
