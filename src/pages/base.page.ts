export default class BasePage {
    constructor() {
        this.waitForPageLoad();
    }

    async waitForPageLoad() {
        await browser.waitUntil(
            async () => await browser.execute(() => document.readyState === 'complete'),
            {
                timeout: 10000,
                timeoutMsg: 'Page did not load in 10 seconds'
            }
        );
    }

    async waitForElement(selector: string, timeout = 5000) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout });
        return element;
    }

    async tap(selector: string) {
        const element = await this.waitForElement(selector);
        await element.click();
    }

    async setValue(selector: string, value: string) {
        const element = await this.waitForElement(selector);
        await element.setValue(value);
    }
} 