import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('Delete package', async ({ page, context }) => {
  let packageMenuCount = 0;
  let deletedPackageName = '';

  await context.clearCookies();

  await test.step('Login', async () => {
    await login(page);

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
    const packageRows = page.locator('table').getByRole('button');

    await expect(packageRows.first()).toBeVisible({ timeout: 15000 });

    packageMenuCount = await packageRows.count();

    test.skip(packageMenuCount === 0, 'No packages available to delete');

    const packageRow = packageRows.first();
    const packageRowText = await packageRow.textContent();

    deletedPackageName = packageRowText?.replace(/\s+/g, ' ').trim() ?? '';

    expect(deletedPackageName).not.toBe('');

    await packageRow.getByRole('button').last().click();

    await expect(
      page.getByRole('list').getByRole('button', { name: 'Delete' })
    ).toBeVisible();
  });

  await test.step('Click Delete in package menu', async () => {
    await page
      .getByRole('list')
      .getByRole('button', { name: 'Delete' })
      .click();

    await expect(
      page.getByRole('heading', { name: /delete/i })
    ).toBeVisible({ timeout: 5000 });
  });

  await test.step('Confirm Delete', async () => {
    await page.getByRole('button', { name: 'Delete' }).last().click();
  });

  await test.step('Verify package was deleted', async () => {
    await expect(
      page.getByText('Package deleted successfully!')
    ).toBeVisible({ timeout: 15000 });

    await expect(page.getByText(deletedPackageName)).not.toBeVisible({
      timeout: 15000,
    });
  });
});
