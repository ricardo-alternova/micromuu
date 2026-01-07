# Sprint 2 - Review

## Summary

Sprint 2 successfully implemented the Farm management features of the Micromuu cattle inventory app:

- Dashboard screen with farm list
- Farm CRUD operations (Create, Read, Update, Archive)
- Farm profile pictures with image picker
- Firestore composite indexes for efficient queries
- Safe area support for mobile devices (notch, home indicator)
- Unit tests (45 total) and E2E tests (7 total) with Playwright

## Features Implemented

### Dashboard Screen
- Displays list of user's active farms as cards
- Each card shows: thumbnail image (or placeholder), name, location
- Pull-to-refresh functionality
- Empty state when no farms exist
- FAB button to add new farm
- Tap card to edit farm
- Sign out button

### Add Farm Screen
- Image picker for farm profile picture (gallery access)
- Form with Name (required) and Location fields
- Validation with error messages
- Creates farm in Firestore with userId association

### Edit Farm Screen
- Pre-populated form with current farm data
- Update name, location, or image
- Archive button with confirmation dialog
- Archived farms are soft-deleted (hidden from list)

### Data Model
```typescript
interface Farm {
  id: string;
  userId: string;
  name: string;
  location: string;
  imageUrl?: string;
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
}
```

---

## Step-by-Step Setup Guide

### 1. Deploy Firebase Rules and Indexes

After Sprint 1 setup, deploy the updated rules and indexes:

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

This deploys:
- Firestore rules for farms collection
- Composite index for farms query (userId + status + createdAt)
- Storage rules for farm images (10MB limit)

### 2. Verify Firestore Index

The farms query requires a composite index. Check Firebase Console > Firestore > Indexes to verify the index is "Enabled":

| Collection | Fields |
|------------|--------|
| farms | userId (Asc), status (Asc), createdAt (Desc) |

If not present, create it manually or run the app and click the error link in console.

### 3. Test the Features

```bash
npm run web
```

1. **Login** with an existing account or register a new one
2. **Dashboard** should appear showing "My Farms" (empty for new users)
3. **Add Farm:**
   - Click the "Add Farm" FAB button
   - Optionally select a photo
   - Enter farm name and location
   - Click Save
4. **Edit Farm:**
   - Tap on a farm card
   - Modify name, location, or image
   - Click Save
5. **Archive Farm:**
   - Tap on a farm card
   - Click "Archive Farm"
   - Confirm in dialog
   - Farm disappears from list

---

## Tests Performed

### Unit Tests

All unit tests passed: **45 tests across 4 test suites**

Run tests with:
```bash
npm test
```

#### Test Suite: Farm Tests (`farms.test.ts`) - 17 tests

| Test | Description |
|------|-------------|
| Farm validation - valid data | Accepts correctly formatted farm data |
| Farm validation - empty name | Rejects missing farm name |
| Farm validation - whitespace name | Rejects whitespace-only names |
| Farm validation - name length | Enforces 200 character limit |
| Farm validation - location optional | Accepts empty location |
| Farm validation - location length | Enforces 500 character limit |
| Farm validation - valid status | Accepts 'active' and 'archived' |
| Farm validation - invalid status | Rejects invalid status values |
| Farm validation - imageUrl optional | Accepts missing imageUrl |
| Farm validation - imageUrl format | Validates URL format |
| Data transformation - trimming | Trims whitespace from fields |
| Data transformation - empty location | Converts empty location to empty string |
| CreateFarmData - minimal | Accepts name-only data |
| CreateFarmData - full | Accepts complete data with image |
| UpdateFarmData - partial | Accepts partial updates |
| UpdateFarmData - name only | Accepts name-only update |
| UpdateFarmData - imageUrl only | Accepts image-only update |

#### Previous Test Suites (28 tests)
- Validation Tests: 7 tests
- i18n Tests: 6 tests
- Profile Tests: 15 tests

### E2E Tests (Playwright)

All E2E tests passed: **7 tests**

Run tests with:
```bash
npm run test:e2e
```

| Test | Description |
|------|-------------|
| Register and login successfully | Full registration flow with email/password |
| Login with registered user | Login and navigate to dashboard |
| Navigate to dashboard after login | Verifies dashboard appears after auth |
| Create a new farm | Full add farm flow: form, save, verify in list |
| Edit an existing farm | Update farm location, save, verify |
| Archive a farm | Archive farm via edit screen |
| Show empty state when no farms | Verifies empty state message |

**Test Configuration:**
- Global setup cleans up test user before each run
- Tests run sequentially to maintain state between farm operations
- Automatic web server startup via Playwright config

---

## Test Coverage

```
-----------------------|---------|----------|---------|---------|
File                   | % Stmts | % Branch | % Funcs | % Lines |
-----------------------|---------|----------|---------|---------|
Test files             |   100%  |   100%   |   100%  |   100%  |
-----------------------|---------|----------|---------|---------|
```

---

## Files Created/Modified

### New Files
- `src/types/farms.ts` - Farm TypeScript types
- `src/services/farms.ts` - Farm CRUD operations and image upload
- `src/components/ImagePicker.tsx` - Reusable image picker component
- `src/screens/DashboardScreen.tsx` - Farm list dashboard
- `src/screens/AddFarmScreen.tsx` - Add farm form
- `src/screens/EditFarmScreen.tsx` - Edit/archive farm form
- `src/__tests__/farms.test.ts` - Farm unit tests
- `e2e/farms.spec.ts` - Farm E2E tests
- `context/sprint2-plan.md` - Sprint 2 implementation plan

### Modified Files
- `src/types/navigation.ts` - Added Dashboard, AddFarm, EditFarm routes
- `src/navigation/AppNavigator.tsx` - Added new screens, updated initial route logic
- `src/screens/index.ts` - Export new screens
- `src/screens/WelcomeScreen.tsx` - Navigate to Dashboard on "Get Started"
- `src/screens/LoginScreen.tsx` - Added SafeAreaView
- `src/screens/RegisterScreen.tsx` - Added SafeAreaView
- `src/i18n/en.json` - Added farm translations
- `src/i18n/es.json` - Added farm translations (Spanish)
- `firestore.rules` - Added farms collection rules
- `firestore.indexes.json` - Added composite index for farms query
- `storage.rules` - Added farms image storage rules, increased limit to 10MB
- `claude.md` - Updated project documentation

---

## Known Limitations

1. **Image Compression:** Images are uploaded at full resolution; consider adding compression
2. **Offline Support:** Farm operations require network connectivity
3. **Pagination:** Farm list loads all farms; may need pagination for large datasets
4. **Image Deletion:** Archived farms retain their images in Storage

---

## Next Steps (Sprint 3)

1. Implement cattle inventory within farms
2. Add cattle CRUD operations (add, edit, archive cattle)
3. Cattle data model with fields: name, breed, birthdate, weight, etc.
4. Dashboard statistics (total cattle count per farm)
5. Search/filter functionality for cattle
