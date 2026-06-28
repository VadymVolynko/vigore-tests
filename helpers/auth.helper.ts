import { Page } from '@playwright/test';

export async function login(page: Page, email?: string, password?: string) {
  const loginEmail = email ?? process.env.TEST_EMAIL;
  const loginPassword = password ?? process.env.TEST_PASSWORD;

  if (!loginEmail || !loginPassword) {
    throw new Error(
      'Missing credentials: provide email/password args or set TEST_EMAIL / TEST_PASSWORD env vars'
    );
  }

  await page.goto('/en/login');
  await page.getByRole('textbox', { name: 'Email' }).fill(loginEmail);
  await page.getByRole('textbox', { name: 'Password' }).fill(loginPassword);
  await page.getByRole('button', { name: 'Log in' }).click();
}
