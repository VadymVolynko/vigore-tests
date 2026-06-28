import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

/**
 * Smoke test for Settings page.
 * Verifies that an authenticated user can open the Settings page.
 */
test('settings page opens', async ({ page }) => {
  await test.step('Log in with valid credentials', async () => {
    await login(page);

    await page.waitForURL(/dev-dashboard\.vigore\.app/, {
      timeout: 15000,
    });
  });

  await test.step('Open Settings page', async () => {
    await page.goto('https://dev-dashboard.vigore.app/settings');
  });

  await test.step('Verify Settings page URL', async () => {
    await expect(page).toHaveURL(/settings/);
  });

  await test.step('Verify Settings page title is visible', async () => {
    await expect(
      page.getByRole('heading', { name: /settings/i })
    ).toBeVisible();
  });
});