import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('Main dashboard navigation', async ({ page }) => {
  await login(page);

  await page.waitForURL(/dev-dashboard\.vigore\.app/, {
    timeout: 15000,
  });

  await test.step('Schedules page', async () => {
    await expect(page).toHaveURL(/schedules/);

    await expect(
      page.getByText('Schedules', { exact: true }).first()
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Create' })
    ).toBeVisible();
  });

  await test.step('Reservations page', async () => {
    await page.getByRole('button', { name: 'Reservations' }).click();

    await expect(page).toHaveURL(/reservations/);

    await expect(
      page.getByText('Reservations', { exact: true }).first()
    ).toBeVisible();
  });

  await test.step('Services page', async () => {
    await page.getByRole('button', { name: 'Services' }).click();

    await expect(page).toHaveURL(/services/);

    await expect(
      page.getByText('Services', { exact: true }).first()
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Create a service' })
    ).toBeVisible();
  });

  await test.step('Team page', async () => {
    await page.getByRole('button', { name: 'Team' }).click();

    await expect(page).toHaveURL(/instructors/);

    await expect(
      page.getByText('Team', { exact: true }).first()
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Add a team member' })
    ).toBeVisible();
  });

  await test.step('Packages page', async () => {
    await page.getByRole('button', { name: 'Packages' }).click();

    await expect(page).toHaveURL(/packages/);

    await page.waitForLoadState('networkidle');

    await expect(
      page.getByText('Packages', { exact: true }).first()
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Create a package' }).first()
    ).toBeVisible();
  });

  await test.step('Customers page', async () => {
    await page.getByRole('button', { name: 'Customers' }).click();

    await expect(page).toHaveURL(/customers/);

    await expect(
      page.getByText('Customers', { exact: true }).first()
    ).toBeVisible();
  });

  await test.step('Settings page', async () => {
    await page.getByRole('button', { name: 'Settings' }).click();

    await expect(page).toHaveURL(/settings/);

    await expect(
      page.getByText('Settings', { exact: true }).first()
    ).toBeVisible();

    await expect(page.getByText('User profile')).toBeVisible();
    await expect(page.getByText('Booking page')).toBeVisible();
    await expect(page.getByText('Notifications')).toBeVisible();
  });
});