import { expect } from 'chai';
import LoginPage from '../pages/login.page';
import logger from '../helpers/logger.helper';
import { EnvironmentUtils } from '../../src/utils/environment.utils';
import DataUtils from '../../src/utils/data.utils';

describe('Login Feature', () => {
    let loginPage: LoginPage;
    let testData: any;

    before(() => {
        loginPage = new LoginPage();
        testData = DataUtils.loadTestData();
        logger.info('Starting Login Feature Test');
    });

    it('should login with valid credentials', async () => {
        const { email, password } = testData.testUsers.validUser;
        await loginPage.login(email, password);
        const isHomePageVisible = await loginPage.isHomePageVisible();
        expect(isHomePageVisible).to.be.true;
    });

    it('should show error with invalid credentials', async () => {
        await loginPage.login('invalid@example.com', 'wrongpass');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).to.include('Invalid credentials');
    });

    after(() => {
        logger.info('Completed Login Feature Test');
    });
}); 