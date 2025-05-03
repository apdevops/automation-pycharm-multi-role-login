import {test as base} from '@playwright/test';
import users from '../data/users.json';

export const test = base.extend({
  loggedInPage: async ({ page }, use, testInfo) => {
    const user = users.find(u => u.role === testInfo.title.split(' ')[2].toLowerCase());

    await page.goto('/login');
    await page.fill('#username', user.username);
    await page.fill('#password', user.password);
    await page.click('button[type="submit"]');

    await user(page);
    }
});
