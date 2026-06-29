import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('Create group service', async ({ page }) => {
  const serviceName = `Auto Group Service ${Date.now()}`;

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

  await test.step('Open create service modal', async () => {
    await page.getByRole('button', { name: 'Create a service' }).click();

    await expect(
      page.getByRole('heading', { name: 'Create a service' })
    ).toBeVisible();
  });

  await test.step('Fill group service details', async () => {
    await page.getByRole('textbox', { name: 'Service Name' })
      .fill(serviceName);

    await page.getByRole('spinbutton', { name: 'Duration' })
      .fill('60');

    await page.getByRole('spinbutton', { name: 'Price' })
      .fill('75');

    await page.keyboard.press('Tab');

    await page.getByTestId('header').click();

    await page.getByRole('button', { name: 'Group Session' }).click();

    await page.getByRole('textbox', { name: 'Seats' })
      .fill('4');
  });

  await test.step('Go to Provided by step', async () => {
    const nextButton = page.getByRole('button', { name: 'Next' });

    await expect(nextButton).toBeEnabled();

    await nextButton.click();

    await expect(
      page.getByText('Select at least one specialist')
    ).toBeVisible();
  });

  await test.step('Save group service', async () => {
    const saveButton = page.getByRole('button', { name: 'Save' });

    await expect(saveButton).toBeEnabled();

    await saveButton.click();

    await expect(
      page.getByRole('heading', { name: 'Create a service' })
    ).not.toBeVisible({ timeout: 10000 });
  });

  await test.step('Verify group service was created', async () => {
    await page.getByText(/Group Services/).click();

    await expect(page.getByText(serviceName)).toBeVisible({
      timeout: 10000,
    });
  });
});
