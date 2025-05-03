import { test, expect } from '@playwright/test';
import invalidUsers from '../data/invalid-users.json';

test.describe('@regression Negative Login Scenarios', () => {

  for (const [index, user] of invalidUsers.entries()) {
    test(`Negative Test [${index}]: ${user.description}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');

      if (user.username !== null) {
        await page.fill('input[data-test="username"]', user.username);
      }

      if (user.password !== null) {
        await page.fill('input[data-test="password"]', user.password);
      }

      await page.click('input[data-test="login-button"]');

      const error = page.locator('[data-test="error"]');
      await expect(error).toBeVisible();
      await expect(error).toContainText(user.expectedError);
    });
  }
});
