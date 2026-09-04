import { Page, Locator, expect } from '@playwright/test';

export class PurchaseOrderPage {

    readonly page: Page;

    readonly pageHeading: Locator;
    readonly createNewPurchaseOrderButton: Locator;
    readonly newPurchaseOrderHeading: Locator;
    readonly vendorDropdown: Locator;
    readonly purchaseOrderDateInput: Locator;
    readonly paymentTermsSelect: Locator;
    readonly deliveryAddressTypeSelect: Locator;
    readonly warehouseDropdown: Locator;
    readonly productNameDropdown: Locator;
    readonly partNumberInput: Locator;
    readonly chartOfAccountDropdown: Locator;
    readonly unitDropdown: Locator;
    readonly quantityInput: Locator;
    readonly unitCostInput: Locator;
    readonly taxInput: Locator;
  readonly addButton: Locator;
readonly createPurchaseOrderButton: Locator;
readonly successMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.pageHeading = page.getByRole('heading', {
            name: 'Purchase Order'
        });

        this.createNewPurchaseOrderButton =
            page.getByRole('link', {
                name: 'Create New Purchase Order'
            });

        this.newPurchaseOrderHeading =
            page.getByRole('heading', {
                name: 'New Purchase Order'
            });

        this.vendorDropdown = page
            .locator('div.choices')
            .filter({
                has: page.locator('#vendorSearch')
            })
            .locator('.choices__inner:visible')
            .first();

        this.purchaseOrderDateInput =
            page.locator('#purchaseorderdate');

        this.paymentTermsSelect =
            page.locator(
                'select[name="offer-payment-terms"]'
            );

        this.deliveryAddressTypeSelect =
            page.locator('#indent_type');

        this.warehouseDropdown = page
            .locator('div.choices')
            .filter({
                has: page.locator('#warehouseSearch')
            })
            .locator('.choices__inner:visible')
            .first();

        this.productNameDropdown = page
            .locator('div.choices')
            .filter({
                has: page.locator(
                    '#dynamic_product_add_comp_search_select'
                )
            })
            .locator('.choices__inner:visible')
            .first();

        this.partNumberInput = page.locator(
            'input[name="part_number"]'
        );

        this.chartOfAccountDropdown = page
            .locator('div.choices')
            .filter({
                hasText: 'Select Chart of Account'
            })
            .locator('.choices__inner:visible')
            .first();
this.unitDropdown = page.locator(
    '#unitDiv .dynamic_product_add_comp_unit_select'
);

        this.quantityInput = page.locator(
            'input[name="quantity"]'
        );

        this.unitCostInput = page.locator(
            'input[name="unit_cost"]'
        );

        this.taxInput = page.locator(
            'input[name="tax"]'
        );

        this.addButton = page.getByRole('button', {
            name: 'Add',
            exact: true
        });

      this.createPurchaseOrderButton =
    page.getByRole('button', {
        name: 'Create Purchase Order',
        exact: true
    });

this.successMessage =
    page.locator('.swal2-html-container');
    }

    async navigateToPurchaseOrder() {

        await this.page.goto(
            'http://smartppt.smartwas.com/all/purchase/requests',
            {
                waitUntil: 'domcontentloaded'
            }
        );

        await expect(
            this.pageHeading
        ).toBeVisible({
            timeout: 15000
        });
    }

    async openNewPurchaseOrder() {

        await this.createNewPurchaseOrderButton.click();

        await this.page.waitForURL(
            '**/new/purchase/order',
            {
                timeout: 15000,
                waitUntil: 'domcontentloaded'
            }
        );

        await expect(
            this.newPurchaseOrderHeading
        ).toBeVisible({
            timeout: 15000
        });
    }

    async selectVendor(vendor: string) {

        await this.vendorDropdown.waitFor({
            state: 'visible',
            timeout: 10000
        });

        await this.vendorDropdown.click();

        const option = this.page
            .locator(
                '.choices__list--dropdown ' +
                '.choices__item--choice:visible'
            )
            .filter({
                hasText: vendor
            })
            .first();

        await option.waitFor({
            state: 'visible',
            timeout: 10000
        });

        await option.click();
    }

    async selectPaymentTerms(paymentTerms: string) {

        await this.paymentTermsSelect.selectOption({
            label: paymentTerms
        });

        await expect(
            this.paymentTermsSelect
        ).toHaveValue(
            await this.paymentTermsSelect
                .locator('option')
                .filter({
                    hasText: paymentTerms
                })
                .getAttribute('value') ?? ''
        );
    }

    async selectDeliveryAddressType(type: string) {

        const typeValues: Record<string, string> = {
            'In-House(Warehouse)': 'warehouse',
            'In-House (Warehouse)': 'warehouse',
            'Customer': 'customer'
        };

        const value = typeValues[type] ?? type;

        await this.deliveryAddressTypeSelect.selectOption(
            value
        );

        await expect(
            this.deliveryAddressTypeSelect
        ).toHaveValue(value);
    }

    async selectWarehouse(warehouse: string) {

        await this.warehouseDropdown.waitFor({
            state: 'visible',
            timeout: 10000
        });

        await this.warehouseDropdown.click();

        const warehouseChoices =
            this.page
                .locator('div.choices')
                .filter({
                    has: this.page.locator(
                        '#warehouseSearch'
                    )
                })
                .first();

        const option = warehouseChoices
            .locator(
                '.choices__list--dropdown ' +
                '.choices__item--choice:visible'
            )
            .filter({
                hasText: warehouse
            })
            .first();

        await option.waitFor({
            state: 'visible',
            timeout: 10000
        });

        await option.click();

        await expect(
            this.page.locator('#warehouseSearch')
        ).not.toHaveValue('', {
            timeout: 5000
        });
    }

    async selectProduct(product: string) {

        await this.productNameDropdown.waitFor({
            state: 'visible',
            timeout: 10000
        });

        await this.productNameDropdown.click();

        const productChoices =
            this.page
                .locator('div.choices')
                .filter({
                    has: this.page.locator(
                        '#dynamic_product_add_comp_search_select'
                    )
                })
                .first();

        const option = productChoices
            .locator(
                '.choices__list--dropdown ' +
                '.choices__item--choice:visible'
            )
            .filter({
                hasText: product
            })
            .first();

        await option.waitFor({
            state: 'visible',
            timeout: 10000
        });

        await option.click();
    }

    async enterPartNumber(partNumber: string) {

        await this.partNumberInput.fill(partNumber);
    }

    async selectChartOfAccount(account: string) {

        await this.chartOfAccountDropdown.click();

        const option = this.page
            .locator(
                '.choices__list--dropdown ' +
                '.choices__item--choice:visible'
            )
            .filter({
                hasText: account
            })
            .first();

        await option.waitFor({
            state: 'visible',
            timeout: 10000
        });

        await option.click();
    }

 async selectUnit(unit: string) {

    await this.unitDropdown.selectOption({
        label: unit
    });

    await expect(
        this.unitDropdown
    ).toHaveValue(unit);
}

    async enterQuantity(quantity: string) {

        await this.quantityInput.fill(quantity);
    }

    async enterUnitCost(cost: string) {

        await this.unitCostInput.fill(cost);
    }

    async enterTax(tax: string) {

        await this.taxInput.fill(tax);
    }

    async addProduct() {

        await this.addButton.click();
    }

async createPurchaseOrder() {

        await this.createPurchaseOrderButton.click();
    }
}