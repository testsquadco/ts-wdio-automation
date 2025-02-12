const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function uploadApp() {
    const username = process.env.SAUCE_USERNAME;
    const accessKey = process.env.SAUCE_ACCESS_KEY;
    const appPath = process.env.APP_PATH;

    if (!username || !accessKey || !appPath) {
        console.error('Please provide SAUCE_USERNAME, SAUCE_ACCESS_KEY and APP_PATH');
        process.exit(1);
    }

    const formData = new FormData();
    formData.append('payload', fs.createReadStream(appPath));

    try {
        const response = await axios.post(
            'https://api.us-west-1.saucelabs.com/rest/v1/storage/upload',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'Authorization': `Basic ${Buffer.from(`${username}:${accessKey}`).toString('base64')}`
                }
            }
        );

        console.log('App uploaded successfully to Sauce Labs');
        console.log('App URL:', response.data.item.id);
    } catch (error) {
        console.error('Error uploading app:', error.response?.data || error.message);
        process.exit(1);
    }
}

uploadApp(); 