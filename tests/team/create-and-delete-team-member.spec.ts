import { test, expect } from '@playwright/test';
import { login } from '../../helpers/auth.helper';

test('Create team member without services and locations', async ({ page }) => {
  const memberEmail = `vadymvolynko+${Date.now()}@gmail.com`;
  const email2 = process.env.TEST_EMAIL_2;
  const password2 = process.env.TEST_PASSWORD_2;

  await login(page, email2, password2);

  await page.waitForURL(/dev-dashboard\.vigore\.app/, {
    timeout: 15000,
  });

  await page.getByRole('button', { name: 'Team' }).click();

  await page.getByRole('button', { name: 'Add a team member' }).click();

  await page.getByRole('textbox', { name: 'First Name' }).fill('Test');

  await page.getByRole('textbox', { name: 'Last Name' }).fill('Test');

  await page.getByRole('textbox', { name: 'Email' }).fill(memberEmail);

  await page.getByRole('button', { name: 'Next' }).click();

  // Skip Services step
  await page.getByRole('button', { name: 'Next' }).click();

  // Skip Locations step
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText(memberEmail)).toBeVisible({
    timeout: 15000,
  });

  // Delete the created member to avoid test pollution
  const memberRow = page.locator('tr').filter({ hasText: memberEmail });

  await expect(memberRow).toBeVisible({ timeout: 10000 });

  await memberRow.getByRole('button').last().click();

  await page
    .getByRole('list')
    .getByRole('button', { name: 'Delete' })
    .click();

  await expect(
    page.getByRole('heading', { name: /delete/i })
  ).toBeVisible({ timeout: 5000 });

  await page.getByRole('button', { name: 'Delete' }).click();

  await expect(memberRow).toHaveCount(0, { timeout: 10000 });
});
