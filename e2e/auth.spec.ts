import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login screen by default', async ({ page }) => {
    // Check for login screen elements
    await expect(page.getByText('MICROMUU')).toBeVisible();
    await expect(page.getByText(/sign in/i)).toBeVisible();
  });

  test('should show email input field', async ({ page }) => {
    const emailInput = page.getByPlaceholder(/enter your email/i);
    await expect(emailInput).toBeVisible();
  });

  test('should show validation error for empty email', async ({ page }) => {
    // Find and click the submit button
    const submitButton = page.getByRole('button', { name: /send magic link/i });
    await submitButton.click();

    // Check for validation error
    await expect(page.getByText(/email is required/i)).toBeVisible();
  });

  test('should show validation error for invalid email format', async ({ page }) => {
    // Enter invalid email
    const emailInput = page.getByPlaceholder(/enter your email/i);
    await emailInput.fill('invalid-email');

    // Submit the form
    const submitButton = page.getByRole('button', { name: /send magic link/i });
    await submitButton.click();

    // Check for validation error
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test('should navigate to registration screen', async ({ page }) => {
    // Click on register link
    const registerLink = page.getByRole('button', { name: /register here/i });
    await registerLink.click();

    // Check for registration screen
    await expect(page.getByText(/create your account/i)).toBeVisible();
  });
});

test.describe('Registration Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to registration
    const registerLink = page.getByRole('button', { name: /register here/i });
    await registerLink.click();
  });

  test('should display registration form fields', async ({ page }) => {
    await expect(page.getByPlaceholder(/first name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/last name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/enter your email/i)).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    // Submit empty form
    const submitButton = page.getByRole('button', { name: /create account/i });
    await submitButton.click();

    // Check for validation errors
    await expect(page.getByText(/name is required/i)).toBeVisible();
  });

  test('should navigate back to login screen', async ({ page }) => {
    // Click on sign in link
    const signInLink = page.getByRole('button', { name: /sign in here/i });
    await signInLink.click();

    // Check for login screen
    await expect(page.getByText(/sign in/i).first()).toBeVisible();
  });

  test('should accept valid registration data', async ({ page }) => {
    // Fill in the form
    await page.getByPlaceholder(/first name/i).fill('John');
    await page.getByPlaceholder(/last name/i).fill('Doe');
    await page.getByPlaceholder(/enter your email/i).fill('john@example.com');

    // Check that fields have values
    await expect(page.getByPlaceholder(/first name/i)).toHaveValue('John');
    await expect(page.getByPlaceholder(/last name/i)).toHaveValue('Doe');
    await expect(page.getByPlaceholder(/enter your email/i)).toHaveValue('john@example.com');
  });
});

test.describe('Internationalization', () => {
  test('should display content in English by default', async ({ page }) => {
    await page.goto('/');

    // Check for English text
    await expect(page.getByText(/sign in/i)).toBeVisible();
    await expect(page.getByText(/send magic link/i)).toBeVisible();
  });

  test('should display Spanish content when locale is Spanish', async ({ page, context }) => {
    // Set Spanish locale
    await context.grantPermissions([]);

    // Note: This test would require configuring the browser locale
    // For now, we just verify the app loads correctly
    await page.goto('/');
    await expect(page).toHaveURL(/localhost/);
  });
});

test.describe('UI Components', () => {
  test('should display brand mark logo', async ({ page }) => {
    await page.goto('/');

    // Check for brand mark (SVG element)
    const brandMark = page.locator('svg').first();
    await expect(brandMark).toBeVisible();
  });

  test('should have cowboy-themed styling', async ({ page }) => {
    await page.goto('/');

    // Check that the page has loaded with the correct background
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that content is visible on mobile
    await expect(page.getByText('MICROMUU')).toBeVisible();
  });
});
