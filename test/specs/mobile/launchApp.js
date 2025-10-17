const wdio = require("webdriverio");

async function main() {
    // Define desired capabilities
    const caps = {
        platformName: "Android",
        // "appium:automationName": "UiAutomator2",
        // "appium:deviceName": "Pixel_7_Pro",
        "appium:appPackage": "com.zype.mobile.stage",      // replace with your app's package name
        "appium:appActivity": "com.zype.mobile.MainActivity",          // replace with your app's main activity
        "appium:noReset": true,
        "appium:autoGrantPermissions": true
        // If you want to install app from file instead:
        // "appium:app": "C:\\path\\to\\your\\app.apk"
    };

    // Connect to Appium server
    const driver = await wdio.remote({
        protocol: "http",
        hostname: "127.0.0.1",
        port: 4723,
        path: "/wd/hub",
        capabilities: caps
    });

    console.log("🚀 Launching the app...");
    await driver.pause(5000);

    // Verify app launched
    const currentActivity = await driver.getCurrentActivity();
    console.log(`✅ Current Activity: ${currentActivity}`);

    // Optional: check an element (adjust locator)
    try {
        // const element = await driver.$('//android.widget.TextView[@text="Home"]');
        // const visible = await element.isDisplayed();
        console.log(`🏠 Home element visible: ${visible}`);
    } catch (err) {
        console.warn("⚠️ Could not find expected element.");
    }

    // Close the session
    // await driver.deleteSession();
    console.log("✅ Test completed, session closed.");
}

main().catch(console.error);