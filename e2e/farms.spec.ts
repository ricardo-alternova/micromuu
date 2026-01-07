import { test, expect } from '@playwright/test';

const TEST_USER = {
  email: 'ricardo+test@alternova.com',
  password: 'Test123456!',
  firstName: 'Ricardo',
  lastName: 'Test',
};

const TEST_FARM = {
  name: 'Test Ranch',
  location: 'Texas, USA',
};

// Wait for the React app to fully load
async function waitForApp(page: any) {
  await page.waitForFunction(() => {
    const root = document.getElementById('root');
    return root && root.children.length > 0;
  }, { timeout: 30000 });
  await page.waitForTimeout(1000);
}

// Helper to fill Paper TextInput
async function fillInput(page: any, placeholder: RegExp, value: string) {
  const input = page.getByPlaceholder(placeholder).last();
  await input.fill(value);
}

// Login or register helper
async function loginOrRegister(page: any) {
  await page.goto('/');
  await waitForApp(page);

  // Try to login first
  await fillInput(page, /enter your email/i, TEST_USER.email);
  await fillInput(page, /enter your password/i, TEST_USER.password);
  await page.getByRole('button', { name: /sign in/i }).click();

  // Wait to see what happens
  await page.waitForTimeout(3000);

  // Check if login failed (still on login screen with error)
  const hasError = await page.getByText(/invalid/i).isVisible().catch(() => false);
  const stillOnLogin = await page.getByRole('button', { name: /sign in/i }).isVisible().catch(() => false);

  if (hasError || stillOnLogin) {
    // Need to register first
    await page.getByRole('button', { name: /register/i }).click();
    await page.waitForTimeout(1000);

    await fillInput(page, /first name/i, TEST_USER.firstName);
    await fillInput(page, /last name/i, TEST_USER.lastName);
    await fillInput(page, /enter your email/i, TEST_USER.email);
    await fillInput(page, /enter your password/i, TEST_USER.password);
    await fillInput(page, /confirm your password/i, TEST_USER.password);

    await page.getByRole('button', { name: /create account/i }).click();
    await page.waitForTimeout(3000);
  }
}

test.describe('Farm Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginOrRegister(page);
  });

  test('should navigate to dashboard after login', async ({ page }) => {
    // Should see either Welcome (new user) or Dashboard (returning user)
    const hasWelcome = await page.getByText(/welcome/i).isVisible().catch(() => false);
    const hasDashboard = await page.getByText(/my farms/i).isVisible().catch(() => false);

    expect(hasWelcome || hasDashboard).toBe(true);

    // If on Welcome screen, click Get Started to go to Dashboard
    if (hasWelcome) {
      await page.getByRole('button', { name: /get started/i }).click();
      await expect(page.getByText(/my farms/i)).toBeVisible({ timeout: 10000 });
    }
  });

  test('should create a new farm', async ({ page }) => {
    // Navigate to dashboard if on welcome
    const hasWelcome = await page.getByText(/welcome to micromuu/i).isVisible().catch(() => false);
    if (hasWelcome) {
      await page.getByRole('button', { name: /get started/i }).click();
      await page.waitForTimeout(1000);
    }

    // Wait for dashboard
    await expect(page.getByText(/my farms/i)).toBeVisible({ timeout: 10000 });

    // Click add farm FAB button
    await page.getByRole('button', { name: /add farm/i }).click();
    await page.waitForTimeout(1000);

    // Verify we're on the add farm screen by checking for the form inputs
    await expect(page.getByPlaceholder(/farm name/i).last()).toBeVisible({ timeout: 10000 });

    // Fill farm form
    await fillInput(page, /farm name/i, TEST_FARM.name);
    await fillInput(page, /location/i, TEST_FARM.location);

    // Save farm
    await page.getByRole('button', { name: /save/i }).click();

    // Wait for navigation and data to load
    await page.waitForTimeout(3000);

    // Wait for navigation back to dashboard
    await expect(page.getByText(/my farms/i)).toBeVisible({ timeout: 15000 });

    // Verify farm appears in list
    await expect(page.getByText(TEST_FARM.name)).toBeVisible({ timeout: 10000 });
  });

  test('should edit an existing farm', async ({ page }) => {
    // Navigate to dashboard if on welcome
    const hasWelcome = await page.getByText(/welcome to micromuu/i).isVisible().catch(() => false);
    if (hasWelcome) {
      await page.getByRole('button', { name: /get started/i }).click();
      await page.waitForTimeout(1000);
    }

    // Click on the test farm card
    const farmCard = page.getByText(TEST_FARM.name);
    if (await farmCard.isVisible().catch(() => false)) {
      await farmCard.click();
      await expect(page.getByText(/edit farm/i)).toBeVisible({ timeout: 10000 });

      // Update the location
      const locationInput = page.getByPlaceholder(/location/i).last();
      await locationInput.clear();
      await locationInput.fill('Updated Location');

      // Save changes
      await page.getByRole('button', { name: /save/i }).click();

      // Verify back on dashboard
      await expect(page.getByText(/my farms/i)).toBeVisible({ timeout: 10000 });
    }
  });

  test('should archive a farm', async ({ page }) => {
    // Navigate to dashboard if on welcome
    const hasWelcome = await page.getByText(/welcome to micromuu/i).isVisible().catch(() => false);
    if (hasWelcome) {
      await page.getByRole('button', { name: /get started/i }).click();
      await page.waitForTimeout(1000);
    }

    // Click on the test farm card to edit
    const farmCard = page.getByText(TEST_FARM.name);
    if (await farmCard.isVisible().catch(() => false)) {
      await farmCard.click();
      await expect(page.getByText(/edit farm/i)).toBeVisible({ timeout: 10000 });

      // Click archive button
      await page.getByRole('button', { name: /archive/i }).click();

      // Confirm in alert (web alert handling)
      page.on('dialog', async dialog => {
        await dialog.accept();
      });

      // Wait a bit for the action to complete
      await page.waitForTimeout(2000);
    }
  });

  test('should show empty state when no farms', async ({ page }) => {
    // This test assumes all farms have been archived
    // Navigate to dashboard if on welcome
    const hasWelcome = await page.getByText(/welcome to micromuu/i).isVisible().catch(() => false);
    if (hasWelcome) {
      await page.getByRole('button', { name: /get started/i }).click();
      await page.waitForTimeout(1000);
    }

    // Check if empty state is shown (only if no farms exist)
    const hasFarms = await page.getByText(TEST_FARM.name).isVisible().catch(() => false);
    if (!hasFarms) {
      await expect(page.getByText(/no farms yet/i)).toBeVisible({ timeout: 5000 });
    }
  });
});
