import { test, expect } from '@playwright/test';

test('Delete package', async ({ page, context }) => {
  await context.clearCookies();

  await test.step('Login', async () => {
    await page.goto('https://dev-landing.vigore.app/en/login');

    await page
      .getByRole('textbox', { name: 'Email' })
      .fill('vadymvolynko+228@gmail.com');

    await page
      .getByRole('textbox', { name: 'Password' })
      .fill('Test12345');

    await page.getByRole('button', { name: 'Log in' }).click();

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

    await page.waitForTimeout(1000);
  });

  await test.step('Click first Delete', async () => {
    await page.getByText('Delete').first().click();

    await page.waitForTimeout(1000);
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