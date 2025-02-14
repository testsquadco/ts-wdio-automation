export default class BasePage {
    constructor() {
        // Remove the waitForPageLoad call from constructor
        // as browser is not initialized yet
    }

    /**
     * Wait for page to be loaded
     */
    async waitForPageLoad(timeout = 10000) {
        try {
            await browser.waitUntil(
                async () => {
                    const state = await browser.execute(() => document.readyState);
                    return state === 'complete';
                },
                {
                    timeout,
                    timeoutMsg: `Page did not load in ${timeout}ms`
                }
            );
        } catch (error) {
            console.error('Error waiting for page load:', error);
        }
    }

    /**
     * Wait for element to be displayed
     */
    async waitForElement(selector: string, timeout = 5000) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout });
        return element;
    }

    /**
     * Tap on element
     */
    async tap(selector: string) {
        const element = await this.waitForElement(selector);
        await element.click();
    }

    /**
     * Set value on element
     */
    async setValue(selector: string, value: string) {
        const element = await this.waitForElement(selector);
        await element.setValue(value);
    }
} 