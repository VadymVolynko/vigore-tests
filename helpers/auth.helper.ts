import { Page } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('/en/login');

  await page.getByRole('textbox', { name: 'Email' })
    .fill(process.env.TEST_EMAIL!);

  await page.getByRole('textbox', { name: 'Password' })
    .fill(process.env.TEST_PASSWORD!);

  await page.getByRole('button', { name: 'Log in' })
    .click();
}