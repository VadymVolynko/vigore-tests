import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('Services page opens', async ({ page }) => {
  await test.step('Login', async () => {
    await login(page);

    await page.waitForURL(/dev-dashboard\.vigore\.app\/schedules/, {
      timeout: 15000,
    });
  });

  await test.step('Open Services page', async () => {
    await page.goto(`${process.env.DASHBOARD_URL}/services`);

    await expect(page).toHaveURL(/services/);
  });

  await test.step('Verify Services page elements', async () => {
    await expect(
      page.getByRole('heading', { name: 'Services' })
    ).toBeVisible();

    await expect(
      page.getByText(/Private Services/)
    ).toBeVisible();

    await expect(
      page.getByText(/Group Services/)
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: /Create a service/i })
    ).toBeVisible();
  });
});
