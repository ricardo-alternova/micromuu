# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Micromuu is a cattle inventory management app targeting Android, iOS, and Web platforms.

## Tech Stack

- **Framework**: Expo with React Native and React Native Web (TypeScript)
- **Backend**: Firebase (Firestore for database, Storage, Authentication, Notifications)
- **Design System**: Material Design 3
- **Internationalization**: English and Spanish (device language detection)
- **Testing**: Jest for unit tests, Playwright for e2e tests

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on specific platforms
npx expo start --android
npx expo start --ios
npx expo start --web

# Run tests
npm test                    # Unit tests
npx playwright test         # E2E tests

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## Architecture Notes

- Sprint-based development tracked in `context/sprint#.md` files
- Each sprint produces a `sprint#-plan.md` (implementation plan) and `sprint#-review.md` (completion guide with test coverage)
- Environment variables in `.env` - never commit secrets
- Strong Firestore security rules are a priority
- Passwordless authentication flow

## Key Constraints

- All secrets must be in `.env` and never exposed
- UI must support both English and Spanish based on device locale
- Database and storage rules must be thoroughly secured
