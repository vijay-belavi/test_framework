const wdio = require("webdriverio");
const { swipeUpTillElementVisible } = require('../../helpers/swipeUpTillElementVisible');

async function main() {
    const caps = {
        platformName: "Android",
        "appium:appPackage": "com.zype.mobile.stage",
        "appium:appActivity": "com.zype.mobile.MainActivity",
        "appium:noReset": true,
        "appium:autoGrantPermissions": true
    };

    const driver = await wdio.remote({
        protocol: "http",
        hostname: "127.0.0.1",
        port: 4723,
        path: "/wd/hub",
        capabilities: caps
    });

    console.log("🚀 Launching the app...");
    await driver.pause(5000);

    const explicitWait = 10000;
    const pauseTime = 500;


    async function tapNumber(driver, number) {

        await driver.$('//android.widget.TextView[contains(@text,"Welcome again")]').waitForDisplayed({ timeout: 50000 });

        // Convert to string so we can split digits
        const digits = String(number).split('');

        for (const digit of digits) {
            let xpath;

            switch (digit) {
                case '1':
                    xpath = '//android.view.ViewGroup[@resource-id="testVerifyNumpadDigit_1"]';
                    break;
                case '2':
                    xpath = '//android.view.ViewGroup[@resource-id="testVerifyNumpadDigit_2"]';
                    break;
                case '3':
                    xpath = '//android.view.ViewGroup[@resource-id="testVerifyNumpadDigit_3"]';
                    break;
                case '4':
                    xpath = '//android.view.ViewGroup[@resource-id="testVerifyNumpadDigit_4"]';
                    break;
                case '5':
                    xpath = '//android.view.ViewGroup[@resource-id="testVerifyNumpadDigit_5"]';
                    break;
                case '6':
                    xpath = '//android.view.ViewGroup[@resource-id="testVerifyNumpadDigit_6"]';
                    break;
                case '7':
                    xpath = '//android.view.ViewGroup[@resource-id="testVerifyNumpadDigit_7"]';
                    break;
                case '8':
                    xpath = '//android.view.ViewGroup[@resource-id="testVerifyNumpadDigit_8"]';
                    break;
                case '9':
                    xpath = '//android.view.ViewGroup[@resource-id="testVerifyNumpadDigit_9"]';
                    break;
                case '0':
                    xpath = '//android.view.ViewGroup[@resource-id="testVerifyNumpadDigit_0"]';
                    break;
                default:
                    throw new Error(`Invalid digit: ${digit}`);
            }

            const el = await driver.$(xpath);
            await el.waitForDisplayed({ timeout: 5000 });
            await el.click();
        }
    }

    async function logout() {
        await driver.$('//android.widget.TextView[@text="Available Amount"]').waitForDisplayed({ timeout: pauseTime });

        const accountBtn = await driver.$('//android.view.ViewGroup[@content-desc="Get Loan"]');
        await accountBtn.waitForDisplayed({ timeout: explicitWait })
        await accountBtn.click();
        await driver.pause(pauseTime);

        await driver.$('//android.widget.TextView[@text="Select Amount"]').waitForDisplayed({ timeout: pauseTime })

        const settingsIcon = await driver.$('//android.view.ViewGroup[@resource-id="testTapHeaderIcon"]');
        await settingsIcon.waitForDisplayed({ timeout: explicitWait })
        await settingsIcon.click();
        await driver.pause(pauseTime);

        try {
            const xpath = '//android.view.ViewGroup[contains(@resource-id,"testAccountLogout")]';
            const logoutrightArrow = await swipeUpTillElementVisible(driver, xpath, 10);
            await logoutrightArrow.click();
        } catch (err) {
            console.error("Test failed: Log out button not found!", err);
        }

        const logoutBtn = await driver.$('//android.view.ViewGroup[@resource-id="testPressNegativeButton"]');
        await logoutBtn.waitForDisplayed({ timeout: explicitWait })
        await logoutBtn.click();
        await driver.pause(pauseTime);

    }
    // --- Test Flow ---
    // ---------- Main Flow ----------
    try {
        // const mobileNumber = '8792593183';
        const welcomeText = await driver.$('//android.widget.TextView[contains(@text,"Welcome again")]');

        // Wait up to 10 seconds for "Welcome again" to appear
        let isVisible = false;
        try {
            await welcomeText.waitForDisplayed({ timeout: 10000 });
            isVisible = true;
        } catch {
            isVisible = false;
        }

        if (isVisible) {
            console.log("✅ 'Welcome again' visible — entering PIN...");
            await tapNumber(driver, 1111);
        } else {
            console.log("⏳ 'Welcome again' not visible after 10s — skipping tapNumber()");
        }

        await logout();

    } catch (err) {
        console.error("❌ Failed during onboarding:", err);
    } finally {
        // await driver.deleteSession();
    }
}
main().catch(console.error);