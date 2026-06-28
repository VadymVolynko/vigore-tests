import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('Create private service', async ({ page }) => {
  const serviceName = 'Auto Private Service';
  const servicePrice = '1472';

  await login(page);

  await page.waitForURL(/dev-dashboard\.vigore\.app\/schedules/, {
    timeout: 15000,
  });

  await page.getByRole('button', { name: 'Services' }).click();

  await expect(page).toHaveURL(/services/);

  await page.getByRole('button', { name: 'Create a service' }).click();

  await expect(
    page.getByRole('heading', { name: 'Create a service' })
  ).toBeVisible();

  await page
    .getByRole('textbox', { name: 'Service Name' })
    .fill(serviceName);

  await page
    .getByRole('spinbutton', { name: 'Duration' })
    .fill('60');

  await page
    .getByRole('spinbutton', { name: 'Price' })
    .fill(servicePrice);

  await page.keyboard.press('Tab');

  const nextButton = page.getByRole('button', { name: 'Next' });

  await expect(nextButton).toBeEnabled();
  await nextButton.click();

  await expect(
    page.getByText('Select at least one specialist')
  ).toBeVisible();

  const saveButton = page.getByRole('button', { name: 'Save' });

  await expect(saveButton).toBeEnabled();
  await saveButton.click();

  await expect(page.getByText(serviceName)).toBeVisible({
    timeout: 10000,
  });

  await expect(page.getByText('€1472')).toBeVisible({
    timeout: 10000,
  });
});