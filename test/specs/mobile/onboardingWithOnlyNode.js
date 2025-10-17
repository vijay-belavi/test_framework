const wdio = require("webdriverio");

async function main() {
    const caps = {
        platformName: "Android",
        "appium:appPackage": "com.zype.mobile.stage",
        "appium:appActivity": "com.zype.mobile.MainActivity",
        "appium:noReset": false,
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
    const pauseTime = 1000;

    // --- Methods inside main() ---
    async function enterMobileNumberAndOtp(mobileNumber) {
        const createAccountBtn = await driver.$('~Create Account');
        await createAccountBtn.waitForDisplayed({ timeout: explicitWait });
        await createAccountBtn.click();

        const mobileInput = await driver.$('//android.widget.EditText[@resource-id="testEnterMobileNumber"]');
        await mobileInput.waitForDisplayed({ timeout: explicitWait });
        await mobileInput.setValue(mobileNumber);

        const nextBtn = await driver.$('//android.view.ViewGroup[@content-desc="Next"]');
        await nextBtn.waitForDisplayed({ timeout: explicitWait });
        await nextBtn.click();
    }

    async function firstNameLastName(firstName, lastName) {
        const firstNameTextField = await driver.$('//android.widget.EditText[@resource-id="testEnterFirstName"]');
        await firstNameTextField.waitForDisplayed({ timeout: explicitWait });
        await firstNameTextField.setValue(firstName);
        await driver.pause(pauseTime);

        const lastNameTextField = await driver.$('//android.widget.EditText[@resource-id="testEnterLastName"]');
        await lastNameTextField.waitForDisplayed({ timeout: explicitWait });
        await lastNameTextField.setValue(lastName);
        await driver.pause(pauseTime);

        const saveAndContinueBtn = await driver.$('//android.view.ViewGroup[@content-desc="Save And Continue"]');
        await saveAndContinueBtn.waitForDisplayed({ timeout: explicitWait });
        await saveAndContinueBtn.click();
        await driver.pause(pauseTime);
    }

    async function enterPanAndDob(panNumber, dob) {
        const panInput = await $('testEnterPanNumber');
        await panInput.waitForDisplayed({ timeout: explicitWait });
        await panInput.setValue(panNumber);
        await driver.pause(pauseTime);

        const dobInput = await $('testEnterDOB');
        await dobInput.waitForDisplayed({ timeout: explicitWait });
        await dobInput.setValue(dob);
        await driver.pause(pauseTime);
    }

    async function acceptTnCandKYC() {
        const tncCheckbox = await $('testTapCheckBoxTnC');
        await tncCheckbox.waitForDisplayed({ timeout: explicitWait });
        await tncCheckbox.click();
        await driver.pause(pauseTime);

        const kycCheckbox = await $('testTapCheckBoxKYC');
        await kycCheckbox.waitForDisplayed({ timeout: explicitWait });
        await kycCheckbox.click();
        await driver.pause(pauseTime);

        const nextPanBtn = await $('testTapNextButtonPan');
        await nextPanBtn.waitForClickable({ timeout: explicitWait });
        await nextPanBtn.click();
        await driver.pause(pauseTime);
    }

    // --- Test Flow ---
    try {
        const mobileNumber = '8792593183';
         await deleteData('+91' + mobileNumber).catch(err => {
            console.warn('Could not delete mobile, continuing with test...');
        });

        await enterMobileNumberAndOtp(mobileNumber);
        await driver.pause(15000);
        await firstNameLastName('Vijay', 'Belavi');
        await enterPanAndDob('DGOPB7256L', '18/02/1999');
        await acceptTnCandKYC();

        const currentActivity = await driver.getCurrentActivity();
        console.log(`✅ Current Activity: ${currentActivity}`);
    } catch (err) {
        console.error("Failed during onboarding:", err);
    } finally {
        await driver.deleteSession();
    }

}

main().catch(console.error);