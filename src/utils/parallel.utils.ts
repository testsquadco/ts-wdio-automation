import deviceConfig from '../config/devices.json';

export class ParallelUtils {
    /**
     * Generates capabilities for parallel execution
     */
    static generateDeviceCaps(platform: 'android' | 'ios', provider: 'browserstack' | 'saucelabs' | 'lambdatest') {
        const devices = deviceConfig[platform];
        
        return devices.map(device => {
            switch(provider) {
                case 'browserstack':
                    return {
                        'bstack:options': {
                            deviceName: device.name,
                            platformVersion: device.version,
                            platformName: platform,
                            buildName: `Parallel Test ${new Date().toISOString()}`,
                            projectName: 'Mobile App Tests'
                        }
                    };
                case 'saucelabs':
                    return {
                        platformName: platform,
                        'appium:deviceName': device.name,
                        'appium:platformVersion': device.version,
                        'sauce:options': {
                            build: `Parallel Test ${new Date().toISOString()}`
                        }
                    };
                case 'lambdatest':
                    return {
                        platformName: platform,
                        deviceName: device.name,
                        platformVersion: device.version,
                        isRealMobile: true
                    };
                default:
                    throw new Error(`Unsupported provider: ${provider}`);
            }
        });
    }

    /**
     * Distributes test specs across devices
     */
    static distributeSpecs(specs: string[], deviceCount: number): string[][] {
        const distribution: string[][] = Array(deviceCount).fill([]).map(() => []);
        specs.forEach((spec, index) => {
            distribution[index % deviceCount].push(spec);
        });
        return distribution;
    }
}

export default new ParallelUtils(); 