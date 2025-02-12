import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import LoginPage from '../../src/pages/login.page';
import logger from '../../src/helpers/logger.helper';

const loginPage = new LoginPage();

Given('I am on the login screen', async function() {
    await loginPage.open();
    logger.info('Opened login screen');
});

When('I enter valid email {string}', async function(email: string) {
    await loginPage.setEmail(email);
});

When('I enter valid password {string}', async function(password: string) {
    await loginPage.setPassword(password);
});

When('I tap the login button', async function() {
    await loginPage.tapLoginButton();
});

Then('I should be logged in successfully', async function() {
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).to.be.true;
});

Then('I should see the home screen', async function() {
    const isHomePageVisible = await loginPage.isHomePageVisible();
    expect(isHomePageVisible).to.be.true;
});

Then('I should see an error message {string}', async function(expectedError: string) {
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).to.include(expectedError);
}); 