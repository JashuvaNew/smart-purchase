Feature: Purchase Request Management

  Scenario: PR-001 - Verify Purchase Request page
    When I navigate to the Purchase Request page
    Then I should see the "Purchase Request" heading
    And I should see the "New Purchase Request" button
    And I should see the "Export CSV" button

  Scenario: PR-002 - Verify New Purchase Request form
    Given I am on the Purchase Request page
    When I click the "New Purchase Request" button
    Then I should see the "New Purchase Request" modal
    And I should see the "Purchase Request Name" field
    And I should see the "Requestor/Initiator" field
    And I should see the "Type of Purchase Request" field

 Scenario: PR-003 - Create a new Purchase Request
    Given I am on the Purchase Request page
    When I click the "New Purchase Request" button
    And I enter purchase request name "Playwright Test PR"
    And I select requestor "Admin User"
    And I select purchase request type "In-House Request (Warehouse)"
    And I select warehouse "bangalore warehouse"
    And I click the "Create Purchase Request" button
    Then I should see the success message