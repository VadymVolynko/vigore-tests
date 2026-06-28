import { test, expect } from '@playwright/test';

/**

* Negative login test.
* Verifies that a user cannot log in using a non-existing email.
  */

test('login with non-existing email', async ({ page }) => {

await page.goto('/en/login');

await page.getByRole('textbox', { name: 'Email' })
.fill('[nonexistinguser@test.com](mailto:nonexistinguser@test.com)');

await page.getByRole('textbox', { name: 'Password' })
.fill('Test123456');

await page.getByRole('button', { name: /log in|sign in/i })
.click();

await expect(page).toHaveURL(/login/);
});
