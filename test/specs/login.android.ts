import { expect } from 'chai';
import logger from '../../src/helpers/logger.helper';

describe('App Launch', () => {
    it('should launch the app successfully', async () => {
        logger.info('Starting App Launch Test');
        
        // Verify app is installed and running
        const isAppLaunched = await browser.isAppInstalled(process.env.APP_PACKAGE || 'com.creditbookpk.creditbook');
        expect(isAppLaunched).to.be.true;
        
        const currentActivity = await browser.getCurrentActivity();
        logger.info(`Current Activity: ${currentActivity}`);
        expect(currentActivity).to.not.be.empty;
        
        logger.info('App Launch Test Completed');
    });
}); 