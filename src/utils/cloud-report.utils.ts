import axios from 'axios';
import logger from '../helpers/logger.helper';

export class CloudReportUtils {
    private static readonly BROWSERSTACK_API = 'https://api.browserstack.com/app-automate';
    private static readonly SAUCELABS_API = 'https://api.us-west-1.saucelabs.com/rest/v1';
    private static readonly LAMBDATEST_API = 'https://api.lambdatest.com/automation/api/v1';

    /**
     * Updates test status in cloud provider
     */
    static async updateTestStatus(
        sessionId: string,
        status: 'passed' | 'failed',
        provider: 'browserstack' | 'saucelabs' | 'lambdatest',
        reason?: string
    ) {
        try {
            switch(provider) {
                case 'browserstack':
                    await this.updateBrowserStackStatus(sessionId, status, reason);
                    break;
                case 'saucelabs':
                    await this.updateSauceLabsStatus(sessionId, status, reason);
                    break;
                case 'lambdatest':
                    await this.updateLambdaTestStatus(sessionId, status, reason);
                    break;
            }
        } catch (error) {
            logger.error(`Failed to update test status in ${provider}:`, error);
        }
    }

    /**
     * Fetches test execution reports from cloud provider
     */
    static async getTestReport(
        buildId: string,
        provider: 'browserstack' | 'saucelabs' | 'lambdatest'
    ) {
        try {
            switch(provider) {
                case 'browserstack':
                    return await this.getBrowserStackReport(buildId);
                case 'saucelabs':
                    return await this.getSauceLabsReport(buildId);
                case 'lambdatest':
                    return await this.getLambdaTestReport(buildId);
                default:
                    throw new Error(`Unsupported provider: ${provider}`);
            }
        } catch (error) {
            logger.error(`Failed to fetch test report from ${provider}:`, error);
            return null;
        }
    }

    private static async updateBrowserStackStatus(sessionId: string, status: string, reason?: string) {
        const url = `${this.BROWSERSTACK_API}/sessions/${sessionId}.json`;
        await axios.put(url, {
            status,
            reason
        }, {
            auth: {
                username: process.env.BROWSERSTACK_USERNAME!,
                password: process.env.BROWSERSTACK_ACCESS_KEY!
            }
        });
    }

    private static async updateSauceLabsStatus(sessionId: string, status: string, reason?: string) {
        const url = `${this.SAUCELABS_API}/jobs/${sessionId}`;
        await axios.put(url, {
            passed: status === 'passed',
            name: reason
        }, {
            auth: {
                username: process.env.SAUCE_USERNAME!,
                password: process.env.SAUCE_ACCESS_KEY!
            }
        });
    }

    private static async updateLambdaTestStatus(sessionId: string, status: string, reason?: string) {
        const url = `${this.LAMBDATEST_API}/sessions/${sessionId}`;
        await axios.patch(url, {
            status,
            reason
        }, {
            auth: {
                username: process.env.LAMBDATEST_USERNAME!,
                password: process.env.LAMBDATEST_ACCESS_KEY!
            }
        });
    }

    private static async getBrowserStackReport(buildId: string) {
        const url = `${this.BROWSERSTACK_API}/builds/${buildId}.json`;
        const response = await axios.get(url, {
            auth: {
                username: process.env.BROWSERSTACK_USERNAME!,
                password: process.env.BROWSERSTACK_ACCESS_KEY!
            }
        });
        return response.data;
    }

    private static async getSauceLabsReport(buildId: string) {
        const url = `${this.SAUCELABS_API}/builds/${buildId}/tests`;
        const response = await axios.get(url, {
            auth: {
                username: process.env.SAUCE_USERNAME!,
                password: process.env.SAUCE_ACCESS_KEY!
            }
        });
        return response.data;
    }

    private static async getLambdaTestReport(buildId: string) {
        const url = `${this.LAMBDATEST_API}/builds/${buildId}`;
        const response = await axios.get(url, {
            auth: {
                username: process.env.LAMBDATEST_USERNAME!,
                password: process.env.LAMBDATEST_ACCESS_KEY!
            }
        });
        return response.data;
    }
}

export default new CloudReportUtils(); 