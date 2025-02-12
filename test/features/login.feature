Feature: User Authentication
  As a user
  I want to be able to log in to the application
  So that I can access my account

  Background:
    Given I am on the login screen

  Scenario: Successful login with valid credentials
    When I enter valid email "testuser@example.com"
    And I enter valid password "password123"
    And I tap the login button
    Then I should be logged in successfully
    And I should see the home screen

  Scenario Outline: Failed login with invalid credentials
    When I enter email "<email>"
    And I enter password "<password>"
    And I tap the login button
    Then I should see an error message "<error>"

    Examples:
      | email               | password    | error                  |
      | invalid@email.com   | wrongpass   | Invalid credentials    |
      | testuser@email.com  |            | Password is required   |
      |                     | password123 | Email is required     | 