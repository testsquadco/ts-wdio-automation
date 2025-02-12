const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function uploadApp() {
    const username = process.env.LAMBDATEST_USERNAME;
    const accessKey = process.env.LAMBDATEST_ACCESS_KEY;
    const appPath = process.env.APP_PATH;

    if (!username || !accessKey || !appPath) {
        console.error('Please provide LAMBDATEST_USERNAME, LAMBDATEST_ACCESS_KEY and APP_PATH');
        process.exit(1);
    }

    const formData = new FormData();
    formData.append('file', fs.createReadStream(appPath));

    try {
        const response = await axios.post(
            `https://manual-api.lambdatest.com/app/upload/realDevice`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'Authorization': `Basic ${Buffer.from(`${username}:${accessKey}`).toString('base64')}`
                }
            }
        );

        console.log('App uploaded successfully to LambdaTest');
        console.log('App URL:', response.data.app_url);
    } catch (error) {
        console.error('Error uploading app:', error.response?.data || error.message);
        process.exit(1);
    }
}

uploadApp(); 