import {
    Before,
    After,
    setDefaultTimeout
} from '@cucumber/cucumber';

import {
    chromium,
    Browser,
    BrowserContext,
    Page
} from '@playwright/test';

import dotenv from 'dotenv';

dotenv.config();

setDefaultTimeout(30 * 1000);

let browser: Browser;

Before(async function () {

    browser = await chromium.launch({
        headless: false
    });

    this.context = await browser.newContext();

    this.page = await this.context.newPage();

    const email = process.env.SMART_USERNAME;
    const password = process.env.SMART_PASSWORD;

    if (!email || !password) {
        throw new Error(
            'SMART_USERNAME or SMART_PASSWORD is missing in .env'
        );
    }

    // ==========================================
    // Open Login Page
    // ==========================================

    await this.page.goto(
        'http://smartppt.smartwas.com/login',
        {
            waitUntil: 'domcontentloaded'
        }
    );

    // ==========================================
    // Enter Login Details
    // ==========================================

    await this.page
        .getByPlaceholder('Email')
        .fill(email);

    await this.page
        .getByPlaceholder('Password')
        .fill(password);

    // ==========================================
    // Login
    // ==========================================

    await this.page
        .getByRole('button', {
            name: 'Sign in'
        })
        .click();

    // ==========================================
    // Wait for Login Navigation
    // ==========================================

    await this.page.waitForURL(
        '**/sales-dashboard',
        {
            timeout: 15000,
            waitUntil: 'domcontentloaded'
        }
    );

    // ==========================================
    // Verify Logged-In Sidebar
    // ==========================================

    await this.page
        .locator(
            'aside a.nav-link[data-bs-toggle="collapse"][href="#section-1"]'
        )
        .waitFor({
            state: 'visible',
            timeout: 15000
        });

});

After(async function () {

    await this.context.close();

    await browser.close();

});