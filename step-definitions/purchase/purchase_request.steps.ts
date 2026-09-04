import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PurchaseRequestPage } from '../../pages/purchase/purchaseRequestPage';

let purchaseRequestPage: PurchaseRequestPage;

Given('I am on the Purchase Request page', async function () {

    purchaseRequestPage = new PurchaseRequestPage(this.page);

    await purchaseRequestPage.navigateToPurchaseRequest();

});

When('I navigate to the Purchase Request page', async function () {

    purchaseRequestPage = new PurchaseRequestPage(this.page);

    await purchaseRequestPage.navigateToPurchaseRequest();

});

Then('I should see the {string} heading', async function (heading: string) {
    await expect(
        purchaseRequestPage.pageHeading
    ).toHaveText(heading);
});

Then('I should see the {string} button', async function (buttonName: string) {
    await expect(
        this.page.getByRole('button', {
            name: buttonName
        })
    ).toBeVisible();
});


When('I click the {string} button', async function (buttonName: string) {
    if (buttonName === 'New Purchase Request') {
        await purchaseRequestPage.openNewPurchaseRequest();
    }

    if (buttonName === 'Create Purchase Request') {
        await purchaseRequestPage.createPurchaseRequest();
    }
});

Then('I should see the {string} modal', async function (modalName: string) {
    await expect(
        purchaseRequestPage.modalHeading
    ).toHaveText(modalName);
});

Then('I should see the {string} field', async function (fieldName: string) {
    if (fieldName === 'Purchase Request Name') {
        await expect(
            purchaseRequestPage.purchaseRequestNameInput
        ).toBeVisible();
    }

    if (fieldName === 'Requestor/Initiator') {
        await expect(
            purchaseRequestPage.requestorDropdown
        ).toBeVisible();
    }

    if (fieldName === 'Type of Purchase Request') {
        await expect(
            purchaseRequestPage.purchaseRequestTypeSelect
        ).toBeVisible();
    }
});

When(
    'I enter purchase request name {string}',
    async function (name: string) {
        await purchaseRequestPage.enterPurchaseRequestName(name);
    }
);

When(
    'I select requestor {string}',
    async function (requestor: string) {
        await purchaseRequestPage.selectRequestor(requestor);
    }
);

When(
    'I select purchase request type {string}',
    async function (type: string) {
        await purchaseRequestPage.selectPurchaseRequestType(type);
    }
);

When(
    'I select warehouse {string}',
    async function (warehouse: string) {

        await purchaseRequestPage.selectWarehouse(
            warehouse
        );
    }
);

Then('I should see the success message', async function () {

    const purchaseRequestPage =
        new PurchaseRequestPage(this.page);

    await expect(
        purchaseRequestPage.successMessage
    ).toBeVisible({
        timeout: 15000
    });

    await expect(
        purchaseRequestPage.successMessage
    ).toHaveText(
        'A new purchase request has been created.',
        {
            timeout: 5000
        }
    );

});