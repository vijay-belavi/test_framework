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
        './test/specs/web/**/*.js'
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
            maxInstances: 1,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--start-maximized',
                    '--disable-popup-blocking',
                    '--disable-infobars',
                    '--use-fake-ui-for-media-stream',                  // auto-allow webcam/mic
                    '--use-fake-device-for-media-stream',              // use fake camera
                    '--use-file-for-fake-video-capture=./mock/selfie.y4m'  // path to .y4m file
                ],
                prefs: {
                    'profile.default_content_setting_values.notifications': 1,
                    'profile.default_content_setting_values.geolocation': 1,
                    'profile.default_content_setting_values.media_stream_camera': 1,
                    'profile.default_content_setting_values.media_stream_mic': 1
                }
            }
        }
    ],

    baseUrl: 'https://www.google.com', 

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: ['visual'],

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // =====
    // Hooks
    // =====
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filepath = `./screenshots/${test.title}-${timestamp}.png`;
            await browser.saveScreenshot(filepath);
            console.log(`❌ Test failed! Screenshot saved at: ${filepath}`);
        }
    },

    // You can keep all other hooks commented or customize them as needed
    // onPrepare, onWorkerStart, beforeSession, beforeSuite, beforeCommand, etc.

};