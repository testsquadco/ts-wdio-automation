import { config as sharedConfig } from './wdio.shared.conf';
import { deepmerge } from 'deepmerge';

export const config = deepmerge(sharedConfig, {
    capabilities: [{
        platformName: 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 12',
        'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '14.5',
        'appium:app': process.env.IOS_APP_PATH || './apps/App.app',
        'appium:autoAcceptAlerts': true,
        'appium:useNewWDA': true
    }],
    specs: [
        './test/specs/**/*.ios.ts'
    ]
}); 