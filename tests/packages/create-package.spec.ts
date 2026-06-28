import { test, expect } from '@playwright/test';

test('Create package', async ({ page, context }) => {
  const packageName = `Auto Package ${Date.now()}`;

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

  await test.step('Open create package modal and discard', async () => {
    await page
      .getByRole('button', { name: /Create a package/i })
      .first()
      .click();

    await expect(
      page.getByRole('heading', { name: 'Create a package' })
    ).toBeVisible({ timeout: 15000 });

    await page.locator('._button_close_ster0_9').click();

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

  await test.step('Fill package details', async () => {
    await page
      .getByRole('textbox', { name: 'Package Name' })
      .fill(packageName);

    await page
      .getByRole('spinbutton', { name: 'Price' })
      .fill('780');
  });

  await test.step('Select services', async () => {
    await page.getByRole('button', { name: 'Select services' }).click();

    await page.getByRole('button', { name: 'test1906' }).click();

    await page.getByRole('button', { name: 'test' }).nth(4).click();

    await page.getByText('Package detailsPackage').click();
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