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
        await deleteData('+91' + mobileNumber).catch(err => {
            console.warn('Could not delete mobile, continuing with test...');
        });
    });

    it('Enter Mobile Number and click Next', async () => {
        const mobileInput = await $('//*[@content-desc="testEnterMobileNumber"]'); // mobile accessibility id
        await mobileInput.waitForDisplayed({ timeout: explicitWait });
        await mobileInput.clearValue();
        await driver.pause(pauseTime);

        for (const digit of mobileNumber) {
            await mobileInput.addValue(digit);
        }

        const nextBtn = await $('//*[@content-desc="testTapMobileNumberNextButton"]');
        await nextBtn.waitForClickable({ timeout: explicitWait });
        await nextBtn.click();
        await driver.pause(pauseTime);
    });

    it('Pause for OTP entry', async () => {
        await driver.pause(15000); // ensure OTP is entered manually
    });

    it('Enter First Name and Last Name', async () => {
        const firstNameTextField = await $('//*[@content-desc="testEnterFirstName"]');
        await firstNameTextField.waitForDisplayed({ timeout: explicitWait });
        await firstNameTextField.setValue('Vijay');
        await driver.pause(pauseTime);

        const lastNameTextField = await $('//*[@content-desc="testEnterLastName"]');
        await lastNameTextField.waitForDisplayed({ timeout: explicitWait });
        await lastNameTextField.setValue('Belavi');
        await driver.pause(pauseTime);

        const saveAndContinueBtn = await $('//*[@content-desc="testTapSaveAndContinueButtonName"]');
        await saveAndContinueBtn.waitForDisplayed({ timeout: explicitWait });
        await saveAndContinueBtn.click();
        await driver.pause(pauseTime);
    });

    it('Enter PAN and DOB', async () => {
        const panInput = await $('//*[@content-desc="testEnterPanNumber"]');
        await panInput.waitForDisplayed({ timeout: explicitWait });
        await panInput.setValue('DGOPB7256L');
        await driver.pause(pauseTime);

        const dobInput = await $('//*[@content-desc="testEnterDOB"]');
        await dobInput.waitForDisplayed({ timeout: explicitWait });
        await dobInput.setValue('18/02/1999');
        await driver.pause(pauseTime);
    });

    it('Accept TnC and KYC', async () => {
        const tncCheckbox = await $('//*[@content-desc="testTapCheckBoxTnC"]');
        await tncCheckbox.waitForDisplayed({ timeout: explicitWait });
        await tncCheckbox.click();
        await driver.pause(pauseTime);

        const kycCheckbox = await $('//*[@content-desc="testTapCheckBoxKYC"]');
        await kycCheckbox.waitForDisplayed({ timeout: explicitWait });
        await kycCheckbox.click();
        await driver.pause(pauseTime);

        const nextPanBtn = await $('//*[@content-desc="testTapNextButtonPan"]');
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
    });

    after(async () => {
        console.log('Mobile test completed');
        // await driver.closeApp(); // optional
    });
});