# Micromuu

A cattle inventory management app built with Expo, React Native, and Firebase.

## About This Project

This project was created for **educational purposes** to demonstrate how to use AI-assisted coding tools to build a full-stack mobile application. The entire codebase was developed through pair programming with [Claude Code](https://claude.ai/code), showcasing how AI can assist in:

- Project architecture and planning
- Writing production-quality TypeScript code
- Implementing authentication and database operations
- Creating unit and E2E tests
- Debugging and troubleshooting issues
- Following best practices and security guidelines

## Tech Stack

- **Framework:** Expo SDK 54 with React Native (iOS, Android, Web)
- **Language:** TypeScript
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **UI Library:** React Native Paper (Material Design 3)
- **Navigation:** React Navigation
- **i18n:** i18next (English/Spanish)
- **Testing:** Jest (unit), Playwright (E2E)

## Features

- Email/password authentication
- User profile management
- Farm CRUD operations (Create, Read, Update, Archive)
- Farm profile pictures
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
- `sprint2.md` - Sprint 2 requirements (Farms)
- `sprint2-plan.md` - Sprint 2 implementation plan
- `sprint2-review.md` - Sprint 2 review and testing

## License

This project is licensed under the O'Saasy License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- Built with [Claude Code](https://claude.ai/code) by Anthropic
- UI components from [React Native Paper](https://reactnativepaper.com/)
- Backend powered by [Firebase](https://firebase.google.com/)
- Mobile framework by [Expo](https://expo.dev/)
