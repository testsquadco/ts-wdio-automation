import { config as sharedConfig } from './wdio.shared.conf';
const deepmerge = require('deepmerge');

export const config = deepmerge(sharedConfig, {
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Pixel_4_API_30',
        'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '11.0',
        'appium:app': process.env.ANDROID_APP_PATH || './apps/app-debug.apk',
        'appium:autoGrantPermissions': true
    }],
    specs: [
        './test/specs/**/*.android.ts'
    ]
}); 