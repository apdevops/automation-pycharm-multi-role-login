import { test, expect } from '@playwright/test';
import users from '../data/users.json';

for (const [index, user] of users.entries()) {
  test(`@smoke Login Test: [${index}] ${user.role}`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); // Actual working site

    await page.fill('input[data-test="username"]', user.username);
    await page.fill('input[data-test="password"]', user.password);
    await page.click('input[data-test="login-button"]');

    if (user.role === 'locked_out_user') {
      // Expect error for locked users
      await expect(page.locator('[data-test="error"]')).toBeVisible();
      await expect(page.locator('[data-test="error"]')).toContainText('locked out');
    } else {
      // Expect successful login
      await expect(page).toHaveURL(/inventory/);
      await expect(page.locator('.title')).toHaveText('Products');

      // Optional: Logout after
      await page.click('#react-burger-menu-btn');
      await page.click('#logout_sidebar_link');
    }
  });
}
