import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('Open Packages page', async ({ page }) => {
  await login(page);

  await page.waitForURL(/dev-dashboard\.vigore\.app\/schedules/, {
    timeout: 15000,
  });

  await expect(page).toHaveURL(/schedules/);

  await page.getByRole('button', { name: 'Packages' }).click();

  await expect(page).toHaveURL(/packages/);

  await expect(
    page.getByText('Packages', { exact: true }).first()
  ).toBeVisible();
});