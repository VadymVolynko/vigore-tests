import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('Delete group service', async ({ page }) => {
  const serviceName = 'Auto Group Service';

  await test.step('Login and wait for dashboard', async () => {
    await login(page);

    await page.waitForURL(/dev-dashboard\.vigore\.app\/schedules/, {
      timeout: 15000,
    });
  });

  await test.step('Open Services page', async () => {
    await page.getByRole('button', { name: 'Services' }).click();

    await expect(page).toHaveURL(/services/);
  });

  await test.step('Open Group Services section', async () => {
    await page.getByText(/Group Services/).click();
  });

  await test.step('Find group service row', async () => {
    const row = page.locator('tr').filter({
      hasText: serviceName,
    });

    await expect(row).toBeVisible({
      timeout: 10000,
    });
  });

  await test.step('Delete group service', async () => {
    const row = page.locator('tr').filter({
      hasText: serviceName,
    });

    // Клик по корзине
    await row.getByRole('button').last().click();

    await expect(
      page.getByRole('heading', {
        name: new RegExp(`Delete "${serviceName}"`),
      })
    ).toBeVisible();

    await page.getByRole('button', {
      name: 'Delete',
    }).click();
  });

  await test.step('Verify service was deleted', async () => {
    const deletedRow = page.locator('tr').filter({
      hasText: serviceName,
    });

    await expect(deletedRow).toHaveCount(0, {
      timeout: 10000,
    });
  });
});
