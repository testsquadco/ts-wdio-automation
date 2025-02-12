import { config as sharedConfig } from './wdio.shared.conf';
const deepmerge = require('deepmerge');

const BUILD_NAME = `Mobile App Test ${new Date().toISOString()}`;

export const config = deepmerge(sharedConfig, {
    user: process.env.LAMBDATEST_USERNAME,
    key: process.env.LAMBDATEST_ACCESS_KEY,
    services: [
        ['lambdatest', {
            tunnel: true
        }]
    ],
    capabilities: [{
        // Android capabilities
        platformName: 'Android',
        deviceName: process.env.LT_DEVICE_NAME || 'Galaxy S20',
        platformVersion: process.env.LT_PLATFORM_VERSION || '11.0',
        app: process.env.LT_APP_URL, // URL of the app uploaded to LambdaTest
        build: BUILD_NAME,
        name: 'Android Test',
        isRealMobile: true,
        visual: true,
        video: true,
        console: true,
        network: true
    }],
    hostname: 'mobile-hub.lambdatest.com',
    port: 80,
    path: '/wd/hub',
    logLevel: 'info'
}); 