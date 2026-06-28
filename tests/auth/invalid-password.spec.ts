import { test, expect } from '@playwright/test';

/**

* Negative login test.
* Verifies that a user cannot log in with an invalid password.
  */

test('login with invalid password', async ({ page }) => {

await test.step('Open login page', async () => {
await page.goto('/en/login');
});

await test.step('Enter valid email', async () => {
await page.getByRole('textbox', { name: 'Email' })
.fill(process.env.TEST_EMAIL!);
});

await test.step('Enter invalid password', async () => {
await page.getByRole('textbox', { name: 'Password' })
.fill('WrongPassword123');
});

await test.step('Click Log In button', async () => {
await page.getByRole('button', { name: /log in|sign in/i })
.click();
});

await test.step('Verify user stays on login page', async () => {
await expect(page).toHaveURL(/login/);
});
});
