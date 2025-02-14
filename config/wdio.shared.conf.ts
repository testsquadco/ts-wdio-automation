import type { Options } from '@wdio/types';
import dotenv from 'dotenv';
import { EnvironmentUtils } from '../src/utils/environment.utils';

declare global {
    var browser: WebdriverIO.Browser;
}

dotenv.config();
EnvironmentUtils.init();
const env = EnvironmentUtils.getCurrentEnv();

export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    specs: [
        './test/specs/**/*.android.ts'
    ],
    exclude: [],
    maxInstances: 10,
    capabilities: [],
    logLevel: 'info',
    bail: 0,
    baseUrl: env.baseUrl,
    waitforTimeout: env.timeout,
    connectionRetryTimeout: 120000,
    connectionRetryCount: env.retries,
    services: ['appium'],
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
    beforeSession: async function() {
        EnvironmentUtils.validateEnvConfig();
    }
}; 