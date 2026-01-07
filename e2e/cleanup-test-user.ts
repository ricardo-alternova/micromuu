/**
 * Cleanup script to remove test user and their data before e2e tests
 *
 * Requires either:
 * - GOOGLE_APPLICATION_CREDENTIALS env var pointing to service account JSON file
 * - FIREBASE_SERVICE_ACCOUNT env var containing the service account JSON as a string
 */

import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

const TEST_USER_EMAIL = 'ricardo+test@alternova.com';
const TEST_USER_PASSWORD = 'Test123456!';

// Initialize Firebase Admin
function initializeAdmin(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.apps[0]!;
  }

  // Try to use service account from env var (JSON string)
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (serviceAccountJson) {
    const serviceAccount = JSON.parse(serviceAccountJson);
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });
  }

  // Fall back to GOOGLE_APPLICATION_CREDENTIALS file path
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }

  throw new Error(
    'Firebase Admin credentials not found. Set either:\n' +
    '  - FIREBASE_SERVICE_ACCOUNT (JSON string)\n' +
    '  - GOOGLE_APPLICATION_CREDENTIALS (path to service account file)'
  );
}

async function deleteTestUser(): Promise<void> {
  console.log(`\n🧹 Cleaning up test user: ${TEST_USER_EMAIL}\n`);

  const app = initializeAdmin();
  const auth = admin.auth(app);

  // Use the named database 'micromuu'
  const db = admin.firestore(app);
  db.settings({ databaseId: 'micromuu' });

  try {
    // Find user by email
    const userRecord = await auth.getUserByEmail(TEST_USER_EMAIL);
    console.log(`Found user with UID: ${userRecord.uid}`);

    // Delete user profile from Firestore
    const profileRef = db.collection('profiles').doc(userRecord.uid);
    const profileDoc = await profileRef.get();

    if (profileDoc.exists) {
      await profileRef.delete();
      console.log('✅ Deleted user profile from Firestore');
    } else {
      console.log('ℹ️  No profile found in Firestore');
    }

    // Delete user from Firebase Auth
    await auth.deleteUser(userRecord.uid);
    console.log('✅ Deleted user from Firebase Auth');

  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      console.log('ℹ️  Test user does not exist - nothing to clean up');
    } else {
      console.error('❌ Error during cleanup:', error.message);
      throw error;
    }
  }

  console.log('\n✨ Cleanup complete!\n');
}

// Export for use in tests
export { deleteTestUser, TEST_USER_EMAIL, TEST_USER_PASSWORD };

// Run directly if executed as script
if (require.main === module) {
  deleteTestUser()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
