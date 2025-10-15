exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',

    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/mobile/**/*.js'   // mobile test specs
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],

    //
    // ===================
    // Test Configurations
    // ===================
    waitforTimeout: 30000, // default wait time for all waitFor* commands

    before: async function () {
        await browser.setTimeout({ implicit: 30000 });
    },

    //
    // ================
    // Capabilities
    // ================
    maxInstances: 1,
    capabilities: [
        {
            // Example for Android
            platformName: 'Android',             // or 'iOS' for iPhone/iPad
            // platformVersion: '13',               // your device OS version
            // deviceName: 'Pixel_7_Pro',           // device name or emulator
            automationName: 'UiAutomator2',      // 'XCUITest' for iOS
            appPackage: '', // path to your app
            appActivity: '*',                 // wait for this activity
            noReset: true,                        // do not reset app state
            // fullReset: false,
            newCommandTimeout: 240,
            autoGrantPermissions: true,           // auto-grant app permissions
            autoAcceptAlerts: true
        }
    ],

    baseUrl: '', // not required for mobile, kept empty

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: ['appium'],

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    //
    // =====
    // Hooks
    // =====
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filepath = `./screenshots/${test.title}-${timestamp}.png`;
            await driver.saveScreenshot(filepath); // driver for mobile
            console.log(`❌ Test failed! Screenshot saved at: ${filepath}`);
        }
    },

    // You can keep all other hooks commented or customize them as needed
    // onPrepare, onWorkerStart, beforeSession, beforeSuite, beforeCommand, etc.
};