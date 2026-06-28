import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('Delete private service by price', async ({ page }) => {
  const servicePrice = '1472';

  await login(page);

  await page.waitForURL(/dev-dashboard\.vigore\.app/, {
    timeout: 15000,
  });

  await page.getByRole('button', { name: 'Services' }).click();

  await expect(
    page.getByRole('heading', { name: 'Services' })
  ).toBeVisible({
    timeout: 15000,
  });

  const serviceRow = page
    .getByRole('row')
    .filter({ hasText: servicePrice })
    .first();

  await expect(serviceRow).toBeVisible({
    timeout: 15000,
  });

  await serviceRow.scrollIntoViewIfNeeded();

  const countBefore = await page
    .getByRole('row')
    .filter({ hasText: servicePrice })
    .count();

  await serviceRow.getByRole('button').last().click();

  await expect(
    page.getByRole('button', { name: 'Delete' }).last()
  ).toBeVisible({ timeout: 5000 });

  await page.getByRole('button', { name: 'Delete' }).last().click();

  await expect(
    page.getByText(/deleted successfully/i)
  ).toBeVisible({
    timeout: 15000,
  });

  await expect(
    page.getByRole('row').filter({ hasText: servicePrice })
  ).toHaveCount(countBefore - 1, { timeout: 10000 });
});
