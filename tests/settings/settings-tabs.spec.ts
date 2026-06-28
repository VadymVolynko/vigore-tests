import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('Settings tabs navigation', async ({ page }) => {
  await test.step('Login', async () => {
    await login(page);
    await page.waitForURL(/dev-dashboard\.vigore\.app\/schedules/);
  });

  await test.step('Open Settings page', async () => {
    await page.getByRole('button', { name: 'Settings' }).click();
    await expect(page).toHaveURL(/settings/);
    await expect(page.getByText('User profile')).toBeVisible();
  });

  await test.step('Open Booking page tab', async () => {
    await page.getByText('Booking page').click();
    await expect(page.getByText('Booking page').nth(1)).toBeVisible();
    await expect(page.getByText('WordPress plugin')).toBeVisible();
  });

  await test.step('Open Location tab', async () => {
    await page.getByText('Location', { exact: true }).click();
    await expect(page.getByText('Location details')).toBeVisible();
  });

  await test.step('Open Payment tab', async () => {
    await page.getByText('Payment', { exact: true }).click();
    await expect(
      page.getByText(/Set up your payment account|Commission Revenue/)
    ).toBeVisible();
  });

  await test.step('Open Notifications tab', async () => {
    await page.getByText('Notifications', { exact: true }).click();
    await expect(page.getByText('Notification Preference')).toBeVisible();
  });

  await test.step('Open Integrations tab', async () => {
    await page.getByText('Integrations').click();
    await expect(page.getByText('Calendar Sync')).toBeVisible();
    await expect(page.getByText('Google Calendar')).toBeVisible();
    await expect(page.getByText('Outlook Calendar')).toBeVisible();
  });
});