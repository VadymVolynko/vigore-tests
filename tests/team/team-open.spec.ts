import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('Open Team page', async ({ page }) => {
  await login(page);

  await page.waitForURL(/dev-dashboard\.vigore\.app\/schedules/, {
    timeout: 15000,
  });

  await page.getByRole('button', { name: 'Team' }).click();

  await expect(page).toHaveURL(/instructors/);

  await expect(
    page.getByRole('heading', { name: 'Team' })
  ).toBeVisible();
});
