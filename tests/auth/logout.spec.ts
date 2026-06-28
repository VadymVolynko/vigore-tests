import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('successful logout', async ({ page }) => {
  await login(page);

  await page.waitForURL(/dev-dashboard\.vigore\.app/, {
    timeout: 15000,
  });

  await page.goto(`${process.env.DASHBOARD_URL}/schedules`);

  // TODO: Replace CSS class selectors below with data-testid attributes once
  // the dev team adds them to the user avatar and logout components.

  // Click user profile icon to open dropdown menu
  await page.locator('._icon_17i8r_62').click();

  // Click the logout section inside the dropdown
  await page.locator('._logout_ivmp4_17 > ._sm_8399k_16').click();

  await Promise.all([
    page.waitForURL(/dev-landing\.vigore\.app\/login/, {
      timeout: 20000,
    }),
    page.getByRole('button', { name: 'Log out' }).click(),
  ]);

  await expect(page).toHaveURL(/\/login/);
});
