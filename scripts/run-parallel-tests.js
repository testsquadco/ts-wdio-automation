const { ParallelUtils } = require('../dist/utils/parallel.utils');
const { spawn } = require('child_process');

async function runParallelTests() {
    const platform = process.env.PLATFORM || 'android';
    const provider = process.env.PROVIDER || 'browserstack';
    const maxParallel = parseInt(process.env.MAX_PARALLEL || '5');

    const capabilities = ParallelUtils.generateDeviceCaps(platform, provider);
    const specs = require('glob').sync('./test/specs/**/*.ts');
    const specDistribution = ParallelUtils.distributeSpecs(specs, Math.min(capabilities.length, maxParallel));

    const processes = specDistribution.map((specs, index) => {
        const env = {
            ...process.env,
            CAPABILITY_INDEX: index.toString(),
            SPECS: specs.join(',')
        };

        return spawn('npm', [`run test:${provider}`], { env, stdio: 'inherit' });
    });

    processes.forEach(process => {
        process.on('error', (error) => {
            console.error('Process error:', error);
        });
    });

    await Promise.all(processes.map(process => new Promise(resolve => process.on('close', resolve))));
}

runParallelTests().catch(console.error); 