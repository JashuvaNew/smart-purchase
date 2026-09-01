import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test('Open Smart Purchase application', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();

    await expect(page).toHaveURL(/login/);
});