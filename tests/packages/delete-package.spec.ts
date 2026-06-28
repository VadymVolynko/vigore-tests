import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('Delete package', async ({ page, context }) => {
  const email2 = process.env.TEST_EMAIL_2;
  const password2 = process.env.TEST_PASSWORD_2;

  await context.clearCookies();

  await test.step('Login', async () => {
    await login(page, email2, password2);

    await expect(page).toHaveURL(/dev-dashboard\.vigore\.app/, {
      timeout: 30000,
    });
  });

  await test.step('Open Packages page', async () => {
    await page.getByRole('button', { name: 'Packages' }).click();

    await expect(
      page.getByRole('heading', { name: 'Packages' })
    ).toBeVisible({ timeout: 15000 });
  });

  await test.step('Open package menu', async () => {
    await page.getByTestId('header').first().click();

    await expect(page.getByText('Delete').first()).toBeVisible();
  });

  await test.step('Click first Delete', async () => {
    await page.getByText('Delete').first().click();

    await expect(
      page.getByRole('button', { name: 'Delete' }).last()
    ).toBeVisible();
  });

  await test.step('Confirm Delete', async () => {
    await page.getByRole('button', { name: 'Delete' }).last().click();
  });

  await test.step('Verify success message', async () => {
    await expect(
      page.getByText('Package deleted successfully!')
    ).toBeVisible({ timeout: 15000 });
  });
});
