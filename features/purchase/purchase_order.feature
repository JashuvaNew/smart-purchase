Feature: Purchase Order Management

  Scenario: PO-001 - Verify Purchase Order page

    When I navigate to the Purchase Order page

    Then I should see the "Purchase Order" heading

    And I should see the "Create New Purchase Order" button


  Scenario: PO-002 - Verify New Purchase Order form

    Given I am on the Purchase Order page

    When I click the "Create New Purchase Order" button

    Then I should see the "New Purchase Order" heading

    And I should see the "Vendor" field

    And I should see the "Purchase Order Date" field

    And I should see the "Payment Terms" field

    And I should see the "Type of Delivery Address" field


  Scenario: PO-003 - Create a new Purchase Order

    Given I am on the Purchase Order page

    When I click the "Create New Purchase Order" button

    And I select vendor "Boyer and Woodard Plc"

    And I select payment terms "Net 60"

    And I select delivery address type "In-House(Warehouse)"

    And I select PO warehouse "bangalore warehouse"

    And I select product "Bags"

    And I select chart of account "Allowance for Doubtful Accounts"

    And I select unit "PCS"

    And I enter quantity "30"

    And I enter unit cost "0"

    And I enter product tax "7.5"

    And I click the "Add" button

    And I click the "Create Purchase Order" button

    Then I should see the Purchase Order success message