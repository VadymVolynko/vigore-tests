import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('successful login', async ({ page }) => {
  await login(page);

  await page.waitForURL(/dev-dashboard\.vigore\.app/, {
    timeout: 15000,
  });

  await expect(page).toHaveURL(/dev-dashboard\.vigore\.app/);
});