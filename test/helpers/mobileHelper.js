const wdio = require('webdriverio');

async function openMobileNotifications() {
    const mobileOpts = {
        path: '/wd/hub',
        port: 4723,
        capabilities: {
            platformName: 'Android',
            // automationName: 'UiAutomator2',
            // deviceName: 'Pixel_6',
            // appPackage: 'com.android.settings', // open Settings as example
            // appActivity: '.Settings',
        }
    };

    const mobileDriver = await wdio.remote(mobileOpts);

    try {
        await mobileDriver.openNotifications();
        console.log('✅ Mobile notifications opened');
    } catch (err) {
        console.error('❌ Failed to open notifications:', err);
    } finally {
        await mobileDriver.deleteSession();
    }
}

module.exports = { openMobileNotifications };