<p align="center">
  <img src="https://staging.testsquad.co/wp-content/uploads/2025/02/testsquad-logo-500-469x100.png" width="400"/>
</p>

# TestSquad WebDriverIO Mobile Test Automation Framework (Boiler-plate)

## About TestSquad

TestSquad is a software testing company specializing in manual and automated testing solutions, ensuring high-quality software for global clients. We provide expert QA services, including mobile automation, to enhance product reliability and performance.

📩 Contact us: info@testsquad.co | 🌐 Website: https://testsquad.co

---

## Overview

A mobile test automation framework built with WebdriverIO and Appium for Android app testing.

## Prerequisites

- Node.js (v14 or higher)
- Java JDK (v8 or higher)
- Android SDK (for Android testing)
- Appium 2.0
- Android Emulator or real device

## Project Structure

```
├── apps/                   # Mobile apps (.apk, .ipa)
├── config/                 # WebdriverIO configurations
├── src/
│   ├── config/            # Environment configurations
│   ├── pages/             # Page objects
│   └── utils/             # Utility functions
└── test/
    └── specs/             # Test specifications
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
ANDROID_DEVICE_NAME=emulator-5554
ANDROID_PLATFORM_VERSION=11.0
ANDROID_APP_PATH=./apps/app-release.apk
APP_PACKAGE=com.example.exampleapp
```

### 3. Run Tests            

#### Android Tests

```bash
npm run test:android
```

### 4. Generate Test Reports

```bash
npm run generate-report
```

## Reporting

Test reports are generated in the `allure-results` directory. To view the reports, run:

```bash
npm run generate-report
```

This will open the report in your default browser.

## Configuration Files

### WebdriverIO Config (config/wdio.android.conf.ts)

Contains WebdriverIO and Appium configurations for Android:
- Device capabilities
- Test framework settings
- Reporter settings
- Appium service configuration

### Environment Config (src/config/environments.ts)

Contains environment-specific configurations:
- API endpoints
- Timeouts
- Other environment variables

## Page Objects

Page objects are located in `src/pages/` and follow the Page Object Model pattern.

## Utilities

### Environment Utils (src/utils/environment.utils.ts)

Handles environment-specific configurations and validations.

### Device Utils (src/utils/device.utils.ts)

Provides device-specific helper functions.

## Best Practices

1. Use Page Object Model for better maintainability
2. Keep test data separate from test logic
3. Use meaningful test and variable names
4. Add proper logging for debugging
5. Keep tests independent of each other

## Troubleshooting

Common issues and solutions:

1. **Appium Connection Issues**
   - Verify Appium is running
   - Check port availability
   - Ensure correct driver installation

2. **Android Device Not Found**
   - Check adb devices list
   - Verify emulator is running
   - Check USB debugging for real devices

3. **App Installation Failed**
   - Verify app path in .env
   - Check app package name
   - Ensure app is compatible with device OS version

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
6. Mention TestSquad on LinkedIn :)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<p align="center">Powered by <a href="https://testsquad.co">TestSquad</a> - Your Quality Assurance Partner</p> 
