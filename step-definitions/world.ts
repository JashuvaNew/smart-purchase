import { setWorldConstructor, World } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';

export class CustomWorld extends World {
    page!: Page;
    context!: BrowserContext;
}

setWorldConstructor(CustomWorld);