const { ok } = require('assert');
const { deleteData } = require('../API/deleteData');
const Tesseract = require('tesseract.js');

describe('Hardcoded Login Test - Mobile', () => {

    let mobileNumber = '8792593183';
    let explicitWait = 30000;
    let pauseTime = 500;

    before(async () => {
        // For mobile, you navigate to activity via app launch, not URL
        // await driver.launchApp(); // optional if app resets
        // await deleteData('+91' + mobileNumber).catch(err => {
        //     console.warn('Could not delete mobile, continuing with test...');
        // });

        const caps = {
            platformName: "Android",
            "appium:appPackage": "com.zype.mobile.stage",      // replace with your app's package name
            "appium:appActivity": "com.zype.mobile.MainActivity",          // replace with your app's main activity
            "appium:noReset": false,
            "appium:autoGrantPermissions": true,
            "appium:autoAcceptAlerts": true
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
    });

    it('Enter Mobile Number and click Next', async () => {
        const createAccountBtn = await $('Create Account'); // mobile accessibility id
        await createAccountBtn.waitForDisplayed({ timeout: explicitWait });
        await createAccountBtn.clearValue();
        await driver.pause(pauseTime);

        const mobileInput = await $('testEnterMobileNumber'); // mobile accessibility id
        await mobileInput.waitForDisplayed({ timeout: explicitWait });
        await mobileInput.clearValue();
        await driver.pause(pauseTime);

        for (const digit of mobileNumber) {
            await mobileInput.addValue(digit);
        }

        const nextBtn = await $('Next');
        await nextBtn.waitForClickable({ timeout: explicitWait });
        await nextBtn.click();
        await driver.pause(pauseTime);
    });

    it('Pause for OTP entry', async () => {

        /*
        await driver.openNotification(); // function to open notification shade
        // Read OTP from notification //

        const mobileInput = await $('testEnterMobileNumber'); // mobile accessibility id
        await mobileInput.waitForDisplayed({ timeout: explicitWait });
        let otpText = await mobileInput.getText();

        const otpMatch = message.match(/\b\d{6}\b/);

        if (otpMatch) {
            const otp = otpMatch[0];
            console.log("✅ OTP:", otp);
        } else {
            console.log("❌ No OTP found in the string");
        }
        await driver.pause(pauseTime);

        await driver.back();
        
        const otpField = await $('testEnterMobileOTP');
        await otpField.waitForClickable({ timeout: explicitWait });
        await otpField.setValue(otp);
        await driver.pause(pauseTime);

        // close notification shade
        */
        await driver.pause(15000); // ensure OTP is entered manually
    });


    /*
    it('Enter First Name and Last Name', async () => {
        const firstNameTextField = await $('testEnterFirstName');
        await firstNameTextField.waitForDisplayed({ timeout: explicitWait });
        await firstNameTextField.setValue('Vijay');
        await driver.pause(pauseTime);

        const lastNameTextField = await $('testEnterLastName');
        await lastNameTextField.waitForDisplayed({ timeout: explicitWait });
        await lastNameTextField.setValue('Belavi');
        await driver.pause(pauseTime);

        const saveAndContinueBtn = await $('Save And Continue');
        await saveAndContinueBtn.waitForDisplayed({ timeout: explicitWait });
        await saveAndContinueBtn.click();
        await driver.pause(pauseTime);
    });

    it('Enter PAN and DOB', async () => {
        const panInput = await $('testEnterPanNumber');
        await panInput.waitForDisplayed({ timeout: explicitWait });
        await panInput.setValue('DGOPB7256L');
        await driver.pause(pauseTime);

        const dobInput = await $('testEnterDOB');
        await dobInput.waitForDisplayed({ timeout: explicitWait });
        await dobInput.setValue('18/02/1999');
        await driver.pause(pauseTime);
    });

    it('Accept TnC and KYC', async () => {
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
    });

    it('Enter Email and Confirm Employment', async () => {
        const emailTextField = await $('//*[@content-desc="testEnterEmail"]');
        await emailTextField.waitForClickable({ timeout: explicitWait });
        await emailTextField.setValue('vijaybelavi1432@gmail.com');
        await driver.pause(pauseTime);

        const continueBtn = await $('//*[@content-desc="testTapEmailOptionsNextButton"]');
        await continueBtn.waitForClickable({ timeout: explicitWait });
        await continueBtn.click();
        await driver.pause(pauseTime);

        const salariedOption = await $('//*[contains(@text,"Salaried")]');
        await salariedOption.waitForClickable({ timeout: explicitWait });
        await salariedOption.click();
        await driver.pause(pauseTime);

        const confirmBtn = await $('//*[@content-desc="testPressPositiveButton"]');
        await confirmBtn.waitForClickable({ timeout: explicitWait });
        await confirmBtn.click();
        await driver.pause(pauseTime);
    });

    it('Select Personal Email and Company', async () => {
        const personalEmailCheckbox = await $('//*[@content-desc="testTapExistedEmail"]');
        await personalEmailCheckbox.waitForEnabled({ timeout: explicitWait });
        await personalEmailCheckbox.click();
        await driver.pause(pauseTime);

        const companyName = 'FireFlink';
        const companyNameTextfield = await $('//*[@content-desc="testTapOrgName"]');
        await companyNameTextfield.waitForClickable({ timeout: explicitWait });
        await companyNameTextfield.click();
        await driver.pause(pauseTime);

        const searchTextField = await $('//*[@content-desc="testEnterOrgName"]');
        await searchTextField.waitForClickable({ timeout: explicitWait });
        await searchTextField.setValue(companyName);
        await driver.pause(pauseTime);

        const firstCompanyNameOption = await $(`//*[contains(@text,'${companyName.toUpperCase()}')]`);
        await firstCompanyNameOption.waitForClickable({ timeout: explicitWait });
        await firstCompanyNameOption.click();
        await driver.pause(pauseTime);
    });

    it('Enter Salary and Family Income', async () => {
        const salaryTextField = await $('//*[@content-desc="testEnterMonthlyIncome"]');
        await salaryTextField.waitForClickable({ timeout: explicitWait });
        await salaryTextField.setValue('65000');
        await driver.pause(pauseTime);

        const annualIncomeDropdown = await $('//*[@content-desc="testTapFamilyIncome"]');
        await annualIncomeDropdown.waitForClickable({ timeout: explicitWait });
        await annualIncomeDropdown.click();
        await driver.pause(pauseTime);

        const incomeOption = 3;
        const annualIncomeOption = await $(`(//*[@content-desc="testTapOptionSelectionSwitch"])[${incomeOption}]`);
        await annualIncomeOption.waitForClickable({ timeout: explicitWait });
        await annualIncomeOption.click();
        await driver.pause(pauseTime);

        const employmentContinueBtn = await $('//*[@content-desc="testTapNextButtonWorkDetails"]');
        await employmentContinueBtn.waitForClickable({ timeout: explicitWait });
        await employmentContinueBtn.click();
        await driver.pause(pauseTime);
    });

    it('Take Selfie and Proceed', async () => {
        const continueBtn = await $('//*[@content-desc="testTapTakeSelfieButton"]');
        await continueBtn.waitForClickable({ timeout: explicitWait });
        await continueBtn.click();
        await driver.pause(pauseTime);

        const proceedToSelfieBtn = await $('//*[contains(@text,"Proceed to Take Selfie")]');
        await proceedToSelfieBtn.waitForClickable({ timeout: explicitWait });
        await proceedToSelfieBtn.click();
        await driver.pause(pauseTime);

        const captureBtn = await $('//*[@resource-id="hv-camera-selfie-capture-button"]');
        await captureBtn.waitForClickable({ timeout: explicitWait });
        await captureBtn.click();
        await driver.pause(pauseTime);

        const usethisPhotoBtn = await $('//*[@content-desc="testTapUsePhoto"]');
        await usethisPhotoBtn.waitForClickable({ timeout: explicitWait });
        await usethisPhotoBtn.click();
        await driver.pause(pauseTime);

        const kycContinueBtn = await $('//*[@content-desc="testTapKycContinueButton"]');
        await kycContinueBtn.waitForClickable({ timeout: explicitWait });
        await kycContinueBtn.click();
        await driver.pause(pauseTime);
    }); */

    after(async () => {
        console.log('Mobile test completed');
        // await driver.closeApp(); // optional
    });
});