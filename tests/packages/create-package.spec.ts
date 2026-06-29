import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('Create package', async ({ page, context }) => {
  const packageName = `Auto Package ${Date.now()}`;

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

  await test.step('Open create package modal and close it', async () => {
    await page
      .getByRole('button', { name: /Create a package/i })
      .first()
      .click();

    await expect(
      page.getByRole('heading', { name: 'Create a package' })
    ).toBeVisible({ timeout: 15000 });

    await page
      .getByRole('textbox', { name: 'Package Name' })
      .fill('Draft package');

    await page.getByRole('button', { name: 'Cancel' }).click();

    await page.getByRole('button', { name: 'Discard' }).click();

    await expect(
      page.getByRole('heading', { name: 'Create a package' })
    ).not.toBeVisible({ timeout: 15000 });
  });

  await test.step('Open create package modal again', async () => {
    await page
      .getByRole('button', { name: /Create a package/i })
      .first()
      .click();

    await expect(
      page.getByRole('heading', { name: 'Create a package' })
    ).toBeVisible({ timeout: 15000 });
  });

  await test.step('Select service', async () => {
    await page.getByRole('button', { name: 'Select services' }).click();

    await page.getByRole('button', { name: 'test90' }).click();

    await page.getByText('Package details').click();
  });

  await test.step('Fill package details', async () => {
    await page
      .getByRole('textbox', { name: 'Package Name' })
      .fill(packageName);

    await page
      .getByRole('spinbutton', { name: 'Price' })
      .fill('75');
  });

  await test.step('Save package', async () => {
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(
      page.getByText('Package create successfully!')
    ).toBeVisible({ timeout: 15000 });

    await expect(page.getByText(packageName)).toBeVisible({
      timeout: 15000,
    });
  });
});
