import { test, expect } from '@playwright/test';

test('successful logout', async ({ page }) => {
  await page.goto('https://dev-landing.vigore.app/en/login');

  await page
    .getByRole('textbox', { name: 'Email' })
    .fill('vadymvolynko+741@gmail.com');

  await page
    .getByRole('textbox', { name: 'Password' })
    .fill('Test12345');

  await page.getByRole('button', { name: 'Log in' }).click();

  await page.waitForURL(/dev-dashboard\.vigore\.app/, {
    timeout: 15000,
  });

  await page.goto('https://dev-dashboard.vigore.app/schedules');

  await page.locator('._icon_17i8r_62').click();

  await page
    .locator('._logout_ivmp4_17 > ._sm_8399k_16')
    .click();

  await Promise.all([
    page.waitForURL(/dev-landing\.vigore\.app\/login/, {
      timeout: 20000,
    }),
    page.getByRole('button', { name: 'Log out' }).click(),
  ]);

  await expect(page).toHaveURL(/\/login/);
});