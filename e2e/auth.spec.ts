import { test, expect } from '@playwright/test';

const TEST_USER = {
  email: 'ricardo+test@alternova.com',
  password: 'Test123456!',
  firstName: 'Ricardo',
  lastName: 'Test',
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

test.describe('Auth Flow', () => {
  test('should register and login successfully', async ({ page }) => {
    await page.goto('/');
    await waitForApp(page);

    // Navigate to registration
    await page.getByRole('button', { name: /register/i }).click();
    await expect(page.getByText(/create your account/i)).toBeVisible({ timeout: 10000 });

    // Fill registration form
    await fillInput(page, /first name/i, TEST_USER.firstName);
    await fillInput(page, /last name/i, TEST_USER.lastName);
    await fillInput(page, /enter your email/i, TEST_USER.email);
    await fillInput(page, /enter your password/i, TEST_USER.password);
    await fillInput(page, /confirm your password/i, TEST_USER.password);

    // Submit registration
    await page.getByRole('button', { name: /create account/i }).click();

    // Wait for welcome screen
    await expect(page.getByText(/welcome/i)).toBeVisible({ timeout: 15000 });
  });

  test('should login with registered user', async ({ page }) => {
    await page.goto('/');
    await waitForApp(page);

    // Fill login form
    await fillInput(page, /enter your email/i, TEST_USER.email);
    await fillInput(page, /enter your password/i, TEST_USER.password);

    // Submit login
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait for welcome/home screen
    await expect(page.getByText(/welcome/i)).toBeVisible({ timeout: 15000 });
  });
});
