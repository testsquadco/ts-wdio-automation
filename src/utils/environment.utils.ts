import { environments, Environment } from '../config/environments';
import logger from '../helpers/logger.helper';

export class EnvironmentUtils {
    private static currentEnv: Environment;

    /**
     * Initializes the environment configuration
     */
    static init() {
        const env = process.env.TEST_ENV?.toLowerCase() || 'qa';
        if (!environments[env]) {
            logger.error(`Environment '${env}' not found. Defaulting to 'qa'`);
            this.currentEnv = environments.qa;
        } else {
            this.currentEnv = environments[env];
        }
        logger.info(`Initialized environment: ${env}`);
    }

    /**
     * Gets the current environment configuration
     */
    static getCurrentEnv(): Environment {
        if (!this.currentEnv) {
            this.init();
        }
        return this.currentEnv;
    }

    /**
     * Gets a specific configuration value
     */
    static get(key: keyof Environment) {
        return this.getCurrentEnv()[key];
    }

    /**
     * Gets user credentials for the current environment
     */
    static getUserCredentials(userType: 'admin' | 'standard') {
        return this.getCurrentEnv().users[userType];
    }

    /**
     * Validates the current environment configuration
     */
    static validateEnvConfig() {
        const env = this.getCurrentEnv();
        const requiredFields: (keyof Environment)[] = ['baseUrl', 'apiUrl', 'timeout'];
        
        const missingFields = requiredFields.filter(field => !env[field]);
        if (missingFields.length > 0) {
            throw new Error(`Missing required environment configurations: ${missingFields.join(', ')}`);
        }
    }
}

export default new EnvironmentUtils(); 