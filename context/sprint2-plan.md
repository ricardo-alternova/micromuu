# Sprint 2 - Implementation Plan

## Overview

Implement a Dashboard with Farm management: list farms, create new farms, edit farms, and archive farms. Each farm has a Name, Location, and optional profile picture.

## Data Model

### Farm Type (`src/types/farms.ts`)
```typescript
interface Farm {
  id: string;
  userId: string;
  name: string;
  location: string;
  imageUrl?: string;  // Firebase Storage URL
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
}
```

### Firestore Structure
```
farms/{farmId}
  - id: string
  - userId: string (owner's UID)
  - name: string
  - location: string
  - imageUrl?: string (Firebase Storage URL)
  - status: 'active' | 'archived'
  - createdAt: timestamp
  - updatedAt: timestamp
  - archivedAt?: timestamp
```

### Storage Structure
```
farms/{userId}/{farmId}/profile.jpg
```

## Implementation Phases

### Phase 1: Types & Services

1. **Create `src/types/farms.ts`**
   - Farm interface with all fields
   - CreateFarmData type for new farms
   - UpdateFarmData type for edits

2. **Create `src/services/farms.ts`**
   - `createFarm(userId, data)` - Create new farm document
   - `getFarmsByUser(userId)` - Get all active farms for user (ordered by createdAt desc)
   - `getFarm(farmId)` - Get single farm by ID
   - `updateFarm(farmId, data)` - Update farm name/location/image
   - `archiveFarm(farmId)` - Set status to 'archived' with archivedAt timestamp
   - `uploadFarmImage(userId, farmId, uri)` - Upload image to Storage, return URL
   - `deleteFarmImage(userId, farmId)` - Delete image from Storage

3. **Update `firestore.rules`**
   - Add farms collection rules
   - Users can only read/write their own farms
   - Delete operations disabled (use archive instead)

4. **Update `storage.rules`**
   - Add farms image storage path
   - 5MB limit, images only
   - Users can only access their own farm images

5. **Install expo-image-picker**
   - For selecting photos from gallery/camera

### Phase 2: Navigation

1. **Update `src/types/navigation.ts`**
   - Add Dashboard, AddFarm, EditFarm routes

2. **Update `src/navigation/AppNavigator.tsx`**
   - Add new screens to MainStack
   - New users: Welcome -> Dashboard
   - Returning users: Direct to Dashboard

### Phase 3: Screens & Components

1. **Create `src/components/ImagePicker.tsx`**
   - Reusable image picker component
   - Shows current image or placeholder
   - Tap to select from gallery

2. **Create `src/screens/DashboardScreen.tsx`**
   - Header with "My Farms" title
   - FlatList displaying farm cards (thumbnail, name, location)
   - Empty state when no farms
   - FAB button to add new farm
   - Tap card to edit

3. **Create `src/screens/AddFarmScreen.tsx`**
   - ImagePicker at top
   - Name and Location text inputs
   - Validation (name required)
   - Save button creates farm and navigates back

4. **Create `src/screens/EditFarmScreen.tsx`**
   - Load farm by ID from route params
   - Pre-filled form with current values
   - Save button updates farm
   - Archive button with confirmation dialog

### Phase 4: i18n

Update `src/i18n/en.json` and `src/i18n/es.json` with:
- farms.title, farms.addFarm, farms.editFarm
- farms.name, farms.namePlaceholder, farms.nameRequired
- farms.location, farms.locationPlaceholder
- farms.image, farms.addImage, farms.changeImage
- farms.save, farms.archive, farms.archiveConfirm
- farms.emptyState, farms.farmCreated, farms.farmUpdated, farms.farmArchived
- farms.createError

### Phase 5: Update Welcome Flow

- Modify WelcomeScreen to navigate to Dashboard instead of staying
- AuthProvider determines initial route based on new user flag

### Phase 6: Testing

1. **Unit tests (`src/__tests__/farms.test.ts`)**
   - Farm type validation
   - Data transformation tests

2. **E2E tests (`e2e/farms.spec.ts`)**
   - Login/register helper
   - Navigate to dashboard after login
   - Create farm flow
   - Edit farm flow
   - Archive farm flow
   - Empty state verification

## Files to Create

- `src/types/farms.ts`
- `src/services/farms.ts`
- `src/components/ImagePicker.tsx`
- `src/screens/DashboardScreen.tsx`
- `src/screens/AddFarmScreen.tsx`
- `src/screens/EditFarmScreen.tsx`
- `src/__tests__/farms.test.ts`
- `e2e/farms.spec.ts`

## Files to Modify

- `src/types/navigation.ts` - Add farm routes
- `src/navigation/AppNavigator.tsx` - Add screens, update flow
- `src/screens/index.ts` - Export new screens
- `src/screens/WelcomeScreen.tsx` - Navigate to Dashboard
- `src/i18n/en.json` - Add farm translations
- `src/i18n/es.json` - Add farm translations
- `firestore.rules` - Add farms collection rules
- `storage.rules` - Add farms image storage rules

## UI Design

Following existing patterns:
- Use `Surface` with elevation for farm cards
- Use `TextInput` with `mode="outlined"` for forms
- Use `Button` with `mode="contained"` for primary actions
- Use `FAB` for add farm action
- Theme colors (primary: #8B4513 saddle brown)
- Max width 400px for forms on desktop
- Circular thumbnails (48x48) on dashboard
- Square image picker (120x120) on forms

## Deployment Requirements

After implementation, deploy Firebase rules:
```bash
firebase deploy --only firestore:rules,storage
```

May need to create Firestore composite index for farms query (userId + status + orderBy createdAt).
