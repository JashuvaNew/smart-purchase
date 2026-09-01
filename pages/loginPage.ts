import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.getByPlaceholder('Email');

        this.passwordInput = page.getByPlaceholder('Password');

        this.rememberMeCheckbox = page.locator('#rememberMe');

        this.signInButton = page.getByRole('button', {
            name: 'Sign in'
        });
    }

    async navigateToLoginPage() {
        await this.page.goto(
            'http://smartppt.smartwas.com/login'
        );
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}