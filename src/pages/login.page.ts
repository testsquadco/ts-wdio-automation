import BasePage from './base.page';

class LoginPage extends BasePage {
    // Make selectors public for test access
    public get emailInput() { return '~email-input'; }
    public get passwordInput() { return '~password-input'; }
    public get loginButton() { return '~login-button'; }
    public get errorMessage() { return '~error-message'; }
    public get homeScreen() { return '~home-screen'; }

    async login(email: string, password: string) {
        await this.waitForPageLoad();
        await this.setValue(this.emailInput, email);
        await this.setValue(this.passwordInput, password);
        await this.tap(this.loginButton);
    }

    async getErrorMessage() {
        await this.waitForPageLoad();
        const errorElement = await $(this.errorMessage);
        return await errorElement.getText();
    }

    async isHomePageVisible() {
        await this.waitForPageLoad();
        const homeElement = await $(this.homeScreen);
        return await homeElement.isDisplayed();
    }

    async isLoggedIn() {
        return await this.isHomePageVisible();
    }
}

export default new LoginPage(); 