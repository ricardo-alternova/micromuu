/**
 * Global setup for Playwright tests
 * Runs before all tests to clean up the test user
 */

import { deleteTestUser } from './cleanup-test-user';

async function globalSetup(): Promise<void> {
  console.log('\n🚀 Running global setup...\n');

  try {
    await deleteTestUser();
  } catch (error) {
    console.error('Global setup failed:', error);
    // Don't fail the entire test suite if cleanup fails
    // The test user might not exist yet
  }
}

export default globalSetup;
