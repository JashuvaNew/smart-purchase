import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PurchaseRequestPage } from '../../pages/purchase/purchaseRequestPage';

let purchaseRequestPage: PurchaseRequestPage;

Given('I am on the Purchase Request page', async function () {

    purchaseRequestPage =
        new PurchaseRequestPage(this.page);

    await purchaseRequestPage
        .navigateToPurchaseRequest();

});

When('I navigate to the Purchase Request page', async function () {

    purchaseRequestPage =
        new PurchaseRequestPage(this.page);

    await purchaseRequestPage
        .navigateToPurchaseRequest();

});


Then(
    'I should see the "Purchase Request" heading',
    async function () {

        await expect(
            purchaseRequestPage.pageHeading
        ).toHaveText('Purchase Request');

    }
);


Then(
    'I should see the "New Purchase Request" button',
    async function () {

        await expect(
            this.page.getByRole('button', {
                name: 'New Purchase Request'
            })
        ).toBeVisible();

    }
);


When(
    'I click the "New Purchase Request" button',
    async function () {

        await purchaseRequestPage
            .openNewPurchaseRequest();

    }
);


When(
    'I click the "Create Purchase Request" button',
    async function () {

        await purchaseRequestPage
            .createPurchaseRequest();

    }
);


Then(
    'I should see the {string} modal',
    async function (modalName: string) {

        await expect(
            purchaseRequestPage.modalHeading
        ).toHaveText(modalName);

    }
);


Then(
    'I should see the "Purchase Request Name" field',
    async function () {

        await expect(
            purchaseRequestPage.purchaseRequestNameInput
        ).toBeVisible();

    }
);


Then(
    'I should see the "Requestor/Initiator" field',
    async function () {

        await expect(
            purchaseRequestPage.requestorDropdown
        ).toBeVisible();

    }
);


Then(
    'I should see the "Type of Purchase Request" field',
    async function () {

        await expect(
            purchaseRequestPage.purchaseRequestTypeSelect
        ).toBeVisible();

    }
);


When(
    'I enter purchase request name {string}',
    async function (name: string) {

        await purchaseRequestPage
            .enterPurchaseRequestName(name);

    }
);


When(
    'I select requestor {string}',
    async function (requestor: string) {

        await purchaseRequestPage
            .selectRequestor(requestor);

    }
);


When(
    'I select purchase request type {string}',
    async function (type: string) {

        await purchaseRequestPage
            .selectPurchaseRequestType(type);

    }
);


When(
    'I select warehouse {string}',
    async function (warehouse: string) {

        await purchaseRequestPage
            .selectWarehouse(warehouse);

    }
);


Then(
    'I should see the success message',
    async function () {

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

    }
);