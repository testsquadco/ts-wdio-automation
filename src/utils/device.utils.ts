export class DeviceUtils {
    /**
     * Gets the device screen dimensions
     */
    async getScreenSize() {
        return await browser.getWindowSize();
    }

    /**
     * Checks if the device is Android
     */
    isAndroid() {
        return browser.isAndroid;
    }

    /**
     * Checks if the device is iOS
     */
    isIOS() {
        return browser.isIOS;
    }

    /**
     * Takes a screenshot and saves it
     */
    async takeScreenshot(name: string) {
        await browser.saveScreenshot(`./screenshots/${name}.png`);
    }

    /**
     * Sets the device orientation
     */
    async setOrientation(orientation: 'LANDSCAPE' | 'PORTRAIT') {
        await browser.setOrientation(orientation);
    }

    /**
     * Gets device information
     */
    async getDeviceInfo() {
        const capabilities = await browser.capabilities;
        return {
            platform: capabilities.platformName,
            version: capabilities.platformVersion,
            device: capabilities.deviceName,
            orientation: await browser.getOrientation()
        };
    }

    /**
     * Toggles airplane mode (Android only)
     */
    async toggleAirplaneMode() {
        if (this.isAndroid()) {
            await browser.toggleAirplaneMode();
        }
    }

    /**
     * Opens app settings (iOS only)
     */
    async openAppSettings() {
        if (this.isIOS()) {
            await browser.execute('mobile: launchApp', { bundleId: 'com.apple.Preferences' });
        }
    }
}

export default new DeviceUtils(); 