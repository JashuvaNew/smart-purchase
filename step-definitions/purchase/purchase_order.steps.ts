import {
    Given,
    When,
    Then
} from '@cucumber/cucumber';

import {
    expect
} from '@playwright/test';

import {
    PurchaseOrderPage
} from '../../pages/purchase/purchaseOrderPage';

let purchaseOrderPage: PurchaseOrderPage;


Given(
    'I am on the Purchase Order page',
    async function () {

        purchaseOrderPage =
            new PurchaseOrderPage(this.page);

        await purchaseOrderPage
            .navigateToPurchaseOrder();
    }
);


When(
    'I navigate to the Purchase Order page',
    async function () {

        purchaseOrderPage =
            new PurchaseOrderPage(this.page);

        await purchaseOrderPage
            .navigateToPurchaseOrder();
    }
);


When(
    'I click the "Create New Purchase Order" button',
    async function () {

        await purchaseOrderPage
            .openNewPurchaseOrder();
    }
);


When(
    'I click the "Add" button',
    async function () {

        await purchaseOrderPage
            .addProduct();
    }
);


When(
    'I click the "Create Purchase Order" button',
    async function () {

        await purchaseOrderPage
            .createPurchaseOrder();
    }
);


Then(
    'I should see the "Purchase Order" heading',
    async function () {

        await expect(
            purchaseOrderPage.pageHeading
        ).toHaveText(
            'Purchase Order'
        );
    }
);


Then(
    'I should see the "New Purchase Order" heading',
    async function () {

        await expect(
            purchaseOrderPage.newPurchaseOrderHeading
        ).toHaveText(
            'New Purchase Order'
        );
    }
);


Then(
    'I should see the "Create New Purchase Order" button',
    async function () {

        await expect(
            purchaseOrderPage.createNewPurchaseOrderButton
        ).toBeVisible();
    }
);


Then(
    'I should see the "Vendor" field',
    async function () {

        await expect(
            purchaseOrderPage.vendorDropdown
        ).toBeVisible();
    }
);


Then(
    'I should see the "Purchase Order Date" field',
    async function () {

        await expect(
            purchaseOrderPage.purchaseOrderDateInput
        ).toBeVisible();
    }
);


Then(
    'I should see the "Payment Terms" field',
    async function () {

        await expect(
            purchaseOrderPage.paymentTermsSelect
        ).toBeVisible();
    }
);


Then(
    'I should see the "Type of Delivery Address" field',
    async function () {

        await expect(
            purchaseOrderPage.deliveryAddressTypeSelect
        ).toBeVisible();
    }
);


When(
    'I select vendor {string}',
    async function (vendor: string) {

        await purchaseOrderPage
            .selectVendor(vendor);
    }
);


When(
    'I select payment terms {string}',
    async function (paymentTerms: string) {

        await purchaseOrderPage
            .selectPaymentTerms(paymentTerms);
    }
);


When(
    'I select delivery address type {string}',
    async function (type: string) {

        await purchaseOrderPage
            .selectDeliveryAddressType(type);
    }
);


When(
    'I select PO warehouse {string}',
    async function (warehouse: string) {

        await purchaseOrderPage
            .selectWarehouse(warehouse);
    }
);

When(
    'I select product {string}',
    async function (product: string) {

        await purchaseOrderPage
            .selectProduct(product);
    }
);


When(
    'I enter part number {string}',
    async function (partNumber: string) {

        await purchaseOrderPage
            .enterPartNumber(partNumber);
    }
);


When(
    'I select chart of account {string}',
    async function (account: string) {

        await purchaseOrderPage
            .selectChartOfAccount(account);
    }
);


When(
    'I select unit {string}',
    async function (unit: string) {

        await purchaseOrderPage
            .selectUnit(unit);
    }
);


When(
    'I enter quantity {string}',
    async function (quantity: string) {

        await purchaseOrderPage
            .enterQuantity(quantity);
    }
);


When(
    'I enter unit cost {string}',
    async function (cost: string) {

        await purchaseOrderPage
            .enterUnitCost(cost);
    }
);


When(
    'I enter product tax {string}',
    async function (tax: string) {

        await purchaseOrderPage
            .enterTax(tax);
    }
);


Then(
    'I should see the Purchase Order success message',
    async function () {

        await expect(
            purchaseOrderPage.successMessage
        ).toBeVisible({
            timeout: 15000
        });

        await expect(
            purchaseOrderPage.successMessage
        ).toHaveText(
            'Purchase order created successfully',
            {
                timeout: 5000
            }
        );
    }
);