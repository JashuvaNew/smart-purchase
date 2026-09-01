import { Page, Locator, expect } from '@playwright/test';

export class PurchaseRequestPage {

    readonly page: Page;

    // =====================================================
    // Sidebar navigation
    // =====================================================

    readonly purchaseMenu: Locator;
    readonly purchaseRequestMenu: Locator;

    // =====================================================
    // Purchase Request listing page
    // =====================================================

    readonly pageHeading: Locator;
    readonly newPurchaseRequestButton: Locator;
    readonly exportCsvButton: Locator;

    // =====================================================
    // New Purchase Request modal
    // =====================================================

    readonly modalHeading: Locator;
    readonly purchaseRequestNameInput: Locator;
    readonly requestorDropdown: Locator;
    readonly purchaseRequestTypeSelect: Locator;

    // =====================================================
    // Create / Close
    // =====================================================

    readonly createPurchaseRequestButton: Locator;
    readonly closeButton: Locator;

    // =====================================================
    // Success popup
    // =====================================================

    readonly successMessage: Locator;
    readonly successOkButton: Locator;

    constructor(page: Page) {

        this.page = page;

        // =====================================================
        // Sidebar navigation
        // =====================================================

        this.purchaseMenu = page.locator(
            'aside a.nav-link[data-bs-toggle="collapse"][href="#section-1"]'
        );

        this.purchaseRequestMenu = page
            .locator('aside a.nav-link[href$="/indent-management"]')
            .first();

        // =====================================================
        // Purchase Request listing page
        // =====================================================

        this.pageHeading = page.getByRole('heading', {
            name: 'Purchase Request'
        });

        this.newPurchaseRequestButton = page.getByRole('button', {
            name: 'New Purchase Request'
        });

        this.exportCsvButton = page.getByRole('button', {
            name: 'Export CSV'
        });

        // =====================================================
        // New Purchase Request modal
        // =====================================================

        this.modalHeading = page.locator('#indent_heading');

        this.purchaseRequestNameInput = page.locator(
            '#indent_name'
        );

        // Requestor Choices.js control
        this.requestorDropdown = page
            .locator('div.choices')
            .filter({
                has: page.locator('#indent_requestor')
            })
            .locator('.choices__inner:visible')
            .first();

        // Purchase Request Type
        this.purchaseRequestTypeSelect = page.locator(
            '#indent_type'
        );

        // =====================================================
        // Create / Close
        // =====================================================

        this.createPurchaseRequestButton = page.locator(
            '#add_new_indent'
        );

        this.closeButton = page.getByRole('button', {
            name: 'Close'
        });

        // =====================================================
        // Success popup
        // =====================================================

        this.successMessage = page.locator(
            '.swal2-popup.swal2-show #swal2-html-container'
        );
        
        this.successOkButton = page.locator(
            '.swal2-popup.swal2-show button.swal2-confirm'
        );
    }

    // =====================================================
    // Navigation
    // =====================================================

    async navigateToPurchaseRequest() {

        const purchaseSection = this.page.locator(
            '#section-1'
        );

        // Check whether Purchase menu is already expanded
        const isExpanded = await purchaseSection.evaluate(
            (el) => el.classList.contains('show')
        );

        // Expand Purchase menu if collapsed
        if (!isExpanded) {

            await this.purchaseMenu.click({
                force: true
            });

            // Give Bootstrap time to update the collapse state
            await this.page.waitForTimeout(500);
        }

        // Purchase Request submenu
        await this.purchaseRequestMenu.waitFor({
            state: 'visible',
            timeout: 10000
        });

        // Navigate directly through the actual link
        await this.purchaseRequestMenu.click({
            force: true
        });

        // Wait for Purchase Request URL
        await this.page.waitForURL(
            '**/indent-management',
            {
                timeout: 15000,
                waitUntil: 'domcontentloaded'
            }
        );

        // Verify page heading
        await expect(this.pageHeading).toBeVisible({
            timeout: 15000
        });
    }

    // =====================================================
    // New Purchase Request
    // =====================================================

    async openNewPurchaseRequest() {

        await this.newPurchaseRequestButton.click();

        await expect(this.modalHeading).toBeVisible({
            timeout: 10000
        });
    }

    // =====================================================
    // Purchase Request Name
    // =====================================================

    async enterPurchaseRequestName(name: string) {

        await this.purchaseRequestNameInput.fill(name);
    }

    // =====================================================
    // Requestor
    // =====================================================

    async selectRequestor(requestor: string) {

        // Open Requestor Choices dropdown
        await this.requestorDropdown.waitFor({
            state: 'visible',
            timeout: 10000
        });

        await this.requestorDropdown.click();

        // Find requested option
        const option = this.page
            .locator(
                'div.choices:has(#indent_requestor) ' +
                '.choices__list--dropdown ' +
                '.choices__item--choice:visible'
            )
            .filter({
                hasText: requestor
            })
            .first();

        await option.waitFor({
            state: 'visible',
            timeout: 5000
        });

        await option.click();

        // Verify underlying select has a value
        const requestorSelect = this.page.locator(
            '#indent_requestor'
        );

        await expect(requestorSelect).not.toHaveValue('', {
            timeout: 5000
        });
    }

    // =====================================================
    // Purchase Request Type
    // =====================================================

    async selectPurchaseRequestType(type: string) {

        const typeValues: Record<string, string> = {

            'In-House Request (Warehouse)': 'warehouse',

            'On Behalf of Customer': 'customer'
        };

        const value = typeValues[type] ?? type;

        // Select the actual option
        await this.purchaseRequestTypeSelect.selectOption(
            value
        );

        // Verify selection
        await expect(
            this.purchaseRequestTypeSelect
        ).toHaveValue(value);

        // Warehouse appears only for Warehouse requests
        if (value === 'warehouse') {

            const warehouseChoices = this.page
                .locator('div.choices')
                .filter({
                    has: this.page.locator('#warehouseSearch')
                })
                .first();

            await warehouseChoices
                .locator('.choices__inner:visible')
                .waitFor({
                    state: 'visible',
                    timeout: 10000
                });
        }
    }

    // =====================================================
    // Warehouse
    // =====================================================

    async selectWarehouse(warehouse: string) {

        const warehouseChoices = this.page
            .locator('div.choices')
            .filter({
                has: this.page.locator('#warehouseSearch')
            })
            .first();

        const warehouseInner = warehouseChoices.locator(
            '.choices__inner:visible'
        ).first();

        // Wait for visible Choices.js control
        await warehouseInner.waitFor({
            state: 'visible',
            timeout: 10000
        });

        // Open Warehouse dropdown
        await warehouseInner.click();

        // Find visible warehouse option
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

        // Select warehouse
        await option.click();

        // =================================================
        // Verify underlying select received a value
        // =================================================

        const warehouseSelect = this.page.locator(
            '#warehouseSearch'
        );

        await expect(warehouseSelect).not.toHaveValue('', {
            timeout: 5000
        });

        // =================================================
        // Wait for warehouse address/details
        // =================================================

        await this.page
            .locator('#warehouse_details')
            .waitFor({
                state: 'visible',
                timeout: 10000
            });
    }

    // =====================================================
    // Create Purchase Request
    // =====================================================

    async createPurchaseRequest() {

        await this.createPurchaseRequestButton.click();
    
        // Wait for the success popup to appear
        await this.successMessage.waitFor({
            state: 'visible',
            timeout: 15000
        });
    }

    // =====================================================
    // Success popup
    // =====================================================

    async clickSuccessOk() {

        await this.successOkButton.waitFor({
            state: 'visible',
            timeout: 5000
        });
    
        await this.successOkButton.click();
    }

    // =====================================================
    // Complete Purchase Request
    // =====================================================

    async createNewPurchaseRequest(
        name: string,
        requestor: string,
        type: string,
        warehouse: string
    ) {

        await this.enterPurchaseRequestName(name);

        await this.selectRequestor(requestor);

        await this.selectPurchaseRequestType(type);

        await this.selectWarehouse(warehouse);

        await this.createPurchaseRequest();
    }
}