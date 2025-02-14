import BasePage from './base.page';

class LoginPage extends BasePage {
    // Selectors
    private get emailInput() { return '~email-input'; }
    private get passwordInput() { return '~password-input'; }
    private get loginButton() { return '~login-button'; }
    private get errorMessage() { return '~error-message'; }
    private get homeScreen() { return '~home-screen'; }

    async login(email: string, password: string) {
        await this.setValue(this.emailInput, email);
        await this.setValue(this.passwordInput, password);
        await this.tap(this.loginButton);
    }

    async getErrorMessage() {
        const errorElement = await $(this.errorMessage);
        return await errorElement.getText();
    }

    async isHomePageVisible() {
        const homeElement = await $(this.homeScreen);
        return await homeElement.isDisplayed();
    }

    async isLoggedIn() {
        return await this.isHomePageVisible();
    }
}

export default new LoginPage(); 