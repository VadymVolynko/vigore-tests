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

  // Ищем сервис по цене
  const serviceRow = page
    .getByRole('row')
    .filter({ hasText: servicePrice })
    .first();

  await expect(serviceRow).toBeVisible({
    timeout: 15000,
  });

  await serviceRow.scrollIntoViewIfNeeded();

  // Клик по корзине
  await serviceRow.getByRole('button').last().click();

  // Ждем открытия модалки
  await page.waitForTimeout(2000);

  // Клик Delete в окне подтверждения
  await page.getByRole('button', { name: 'Delete' }).last().click();

  // Ждем завершения удаления
  await page.waitForTimeout(3000);

  // Проверка успешного удаления
  await expect(
    page.getByText(/deleted successfully/i)
  ).toBeVisible({
    timeout: 15000,
  });

  // Проверяем что сервис исчез
  await expect(
    page.getByRole('row').filter({ hasText: servicePrice })
  ).toHaveCount(0);
});