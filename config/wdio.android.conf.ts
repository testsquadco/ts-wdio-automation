import { config as sharedConfig } from './wdio.shared.conf';
import deepmerge = require('deepmerge');
import type { Options } from '@wdio/types'

export const config: Options.Testrunner = deepmerge(sharedConfig, {
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'emulator-5554',
        'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '11.0',
        'appium:app': process.env.ANDROID_APP_PATH || './apps/app-release.apk',
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 240,
        'appium:appPackage': process.env.APP_PACKAGE || 'com.creditbookpk.creditbook',
        'appium:allowTestPackages': true,
        'appium:noReset': true
    }],
    specs: [
        './test/specs/**/*.android.ts'
    ]
}); 