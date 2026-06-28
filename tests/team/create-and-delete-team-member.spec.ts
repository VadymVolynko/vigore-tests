import { test, expect } from '@playwright/test';

test('Create team member without services and locations', async ({ page }) => {
  const memberEmail = `vadymvolynko+${Date.now()}@gmail.com`;

  await page.goto('https://dev-landing.vigore.app/en/login');

  await page
    .getByRole('textbox', { name: 'Email' })
    .fill('vadymvolynko+228@gmail.com');

  await page
    .getByRole('textbox', { name: 'Password' })
    .fill('Test12345');

  await page.getByRole('button', { name: 'Log in' }).click();

  await page.waitForURL(/dev-dashboard\.vigore\.app/, {
    timeout: 15000,
  });

  await page.getByRole('button', { name: 'Team' }).click();

  await page.getByRole('button', { name: 'Add a team member' }).click();

  await page.getByRole('textbox', { name: 'First Name' }).fill('Test');

  await page.getByRole('textbox', { name: 'Last Name' }).fill('Test');

  await page.getByRole('textbox', { name: 'Email' }).fill(memberEmail);

  await page.getByRole('button', { name: 'Next' }).click();

  // Пропускаем Services
  await page.getByRole('button', { name: 'Next' }).click();

  // Пропускаем Locations
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText(memberEmail)).toBeVisible({
    timeout: 15000,
  });
});