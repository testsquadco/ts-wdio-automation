import { config as sharedConfig } from './wdio.shared.conf';
const deepmerge = require('deepmerge');

const BUILD_NAME = `Mobile App Test ${new Date().toISOString()}`;

export const config = deepmerge(sharedConfig, {
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us',
    services: [
        ['sauce', {
            sauceConnect: true
        }]
    ],
    capabilities: [{
        // Android capabilities
        platformName: 'Android',
        'appium:deviceName': process.env.SAUCE_DEVICE_NAME || 'Samsung Galaxy S20',
        'appium:platformVersion': process.env.SAUCE_PLATFORM_VERSION || '11.0',
        'appium:app': process.env.SAUCE_APP_URL, // URL of the app in Sauce Storage
        'sauce:options': {
            build: BUILD_NAME,
            name: 'Android Test',
            appiumVersion: '2.0.0'
        }
    }],
    logLevel: 'info'
}); 