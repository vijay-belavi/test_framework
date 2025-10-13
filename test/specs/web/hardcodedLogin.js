const { ok } = require('assert');
const { deleteData } = require('../API/deleteData');

describe('Hardcoded Login Test', () => {

    let mobileNumber = '8792593183';
    let explicitWait = 30000;
    let pauseTime = 1000;

    before(async () => {
        await browser.url('https://stage-portal.getzype.com/');
        await browser.maximizeWindow();
        await browser.setTimeout({ implicit: 180000 });

        await deleteData('+91' + mobileNumber).catch(err => {
            console.warn('Could not delete mobile, continuing with test...');
        });
    });

    it('Enter Mobile Number and click Next', async () => {
        const mobileInput = await $('//input[@data-testid="testEnterMobileNumber"]');
        await mobileInput.waitForDisplayed({ timeout: explicitWait });
        await mobileInput.waitForEnabled({ timeout: explicitWait });
        await mobileInput.clearValue();
        await browser.pause(pauseTime);

        for (const digit of mobileNumber) {
            await mobileInput.addValue(digit);
        }

        const nextBtn = await $('//div[@data-testid="testTapMobileNumberNextButton"]');
        await nextBtn.waitForClickable({ timeout: explicitWait });
        await nextBtn.click();
        await browser.pause(pauseTime);
    });

    // it('Enter OTP', async () => {
    //     const otpInput = await $('//input[@data-testid="testEnterMobileOTP"]');
    //     await otpInput.waitForDisplayed({ timeout: explicitWait });
    //     await browser.pause(10000); // ensure OTP is entered
    // });

    it('Enter First Name and Last Name', async () => {
        const firstNameTextField = await $('//input[@data-testid="testEnterFirstName"]');
        await firstNameTextField.waitForDisplayed({ timeout: explicitWait });
        await firstNameTextField.setValue('Vijay');
        await browser.pause(pauseTime);

        const lastNameTextField = await $('//input[@data-testid="testEnterLastName"]');
        await lastNameTextField.waitForDisplayed({ timeout: explicitWait });
        await lastNameTextField.setValue('Belavi');
        await browser.pause(pauseTime);

        const saveAndContinueBtn = await $('//div[@data-testid="testTapSaveAndContinueButtonName"]');
        await saveAndContinueBtn.waitForDisplayed({ timeout: explicitWait });
        await saveAndContinueBtn.click();
        await browser.pause(pauseTime);
    });

    it('Enter PAN and DOB', async () => {
        const panInput = await $('//input[@data-testid="testEnterPanNumber"]');
        await panInput.waitForDisplayed({ timeout: explicitWait });
        await panInput.setValue('DGOPB7256L');
        await browser.pause(pauseTime);

        const dobInput = await $('//input[@data-testid="testEnterDOB"]');
        await dobInput.waitForDisplayed({ timeout: explicitWait });
        await dobInput.setValue('18/02/1999');
        await browser.pause(pauseTime);
    });

    it('Accept TnC and KYC', async () => {
        const tncCheckbox = await $('//div[@data-testid="testTapCheckBoxTnC"]');
        await tncCheckbox.waitForDisplayed({ timeout: explicitWait });
        await tncCheckbox.click();
        await browser.pause(pauseTime);

        const kycCheckbox = await $('//div[@data-testid="testTapCheckBoxKYC"]');
        await kycCheckbox.waitForDisplayed({ timeout: explicitWait });
        await kycCheckbox.click();
        await browser.pause(pauseTime);

        const nextPanBtn = await $('//div[@data-testid="testTapNextButtonPan"]');
        await nextPanBtn.waitForClickable({ timeout: explicitWait });
        await nextPanBtn.click();
        await browser.pause(pauseTime);
    });

    it('Enter Email and Confirm Employment', async () => {
        const emailTextField = await $('//input[@data-testid="testEnterEmail"]');
        await emailTextField.waitForClickable({ timeout: explicitWait });
        await emailTextField.setValue('vijaybelavi1432@gmail.com');
        await browser.pause(pauseTime);

        const continueBtn = await $('//div[@data-testid="testTapEmailOptionsNextButton"]');
        await continueBtn.waitForClickable({ timeout: explicitWait });
        await continueBtn.click();
        await browser.pause(pauseTime);

        const salariedOption = await $('//div[contains(text(),"Salaried")]');
        await salariedOption.waitForClickable({ timeout: explicitWait });
        await salariedOption.click();
        await browser.pause(pauseTime);

        const confirmBtn = await $('//div[@data-testid="testPressPositiveButton"]');
        await confirmBtn.waitForClickable({ timeout: explicitWait });
        await confirmBtn.click();
        await browser.pause(pauseTime);
    });

    it('Select Personal Email and Company', async () => {
        const personalEmailCheckbox = await $('//div[@data-testid="testTapExistedEmail"]');
        await personalEmailCheckbox.waitForEnabled({ timeout: explicitWait });
        await personalEmailCheckbox.click();
        await browser.pause(pauseTime);

        const companyName = 'FireFlink';
        const companyNameTextfield = await $('//div[@data-testid="testTapOrgName"]');
        await companyNameTextfield.waitForClickable({ timeout: explicitWait });
        await companyNameTextfield.click();
        await browser.pause(pauseTime);

        const searchTextField = await $('//input[@data-testid="testEnterOrgName"]');
        await searchTextField.waitForClickable({ timeout: explicitWait });
        await searchTextField.setValue(companyName);
        await browser.pause(pauseTime);

        const firstCompanyNameOption = await $(`//div[contains(text(), '${companyName.toUpperCase()}')]`);
        await firstCompanyNameOption.waitForClickable({ timeout: explicitWait });
        await firstCompanyNameOption.click();
        await browser.pause(pauseTime);
    });

    it('Enter Salary and Family Income', async () => {
        const salaryTextField = await $('//input[@data-testid="testEnterMonthlyIncome"]');
        await salaryTextField.waitForClickable({ timeout: explicitWait });
        await salaryTextField.setValue('65000');
        await browser.pause(pauseTime);

        const annualIncomeDropdown = await $('//div[@data-testid="testTapFamilyIncome"]');
        await annualIncomeDropdown.waitForClickable({ timeout: explicitWait });
        await annualIncomeDropdown.click();
        await browser.pause(pauseTime);

        const incomeOption = 3;
        const annualIncomeOption = await $(`(//div[@data-testid="testTapOptionSelectionSwitch"])['${incomeOption}']`);
        await annualIncomeOption.waitForClickable({ timeout: explicitWait });
        await annualIncomeOption.click();
        await browser.pause(pauseTime);

        const employmentContinueBtn = await $('//div[@data-testid="testTapNextButtonWorkDetails"]');
        await employmentContinueBtn.waitForClickable({ timeout: explicitWait });
        await employmentContinueBtn.click();
        await browser.pause(pauseTime);
    });

    it('Enter Address Details', async () => {
        const noContinueWithPersonalEmailBtn = await $('//div[@data-testid="testPressNegativeButton"]');
        await noContinueWithPersonalEmailBtn.waitForClickable({ timeout: explicitWait });
        await noContinueWithPersonalEmailBtn.click();
        await browser.pause(pauseTime);

        const houseNumberTextField = await $('//input[@data-testid="testAddressScreenFloorInput"]');
        await houseNumberTextField.waitForClickable({ timeout: explicitWait });
        await houseNumberTextField.setValue('test');
        await browser.pause(pauseTime);

        const houseNumberTextField2 = await $('//input[@data-testid="testAddressScreenBuildingInput"]');
        await houseNumberTextField2.waitForClickable({ timeout: explicitWait });
        await houseNumberTextField2.setValue('test');
        await browser.pause(pauseTime);

        const pinCodeTextField = await $('//input[@data-testid="testAddressScreenPinInput"]');
        await pinCodeTextField.waitForClickable({ timeout: explicitWait });
        await pinCodeTextField.setValue('570001');
        await browser.pause(pauseTime);

        const landMarkTextField = await $('//input[@data-testid="testAddressScreenLandmarkInput"]');
        await landMarkTextField.waitForDisplayed({ timeout: explicitWait });
        await landMarkTextField.setValue('test');
        await browser.pause(pauseTime);

        const addressContinueBtn = await $('//div[@data-testid="testAddressScreenConfirmButton"]');
        await addressContinueBtn.waitForClickable({ timeout: explicitWait });
        await addressContinueBtn.click();
        await browser.pause(pauseTime);
    });

    it('should verify approved loan limit text', async () => {
             // 1 second

        const approvedLimitElement = await $('//div[@data-testid="testApprovedLimitText"]');

        // Wait until the element is displayed
        await approvedLimitElement.waitForDisplayed({ timeout: explicitWait });
        await browser.pause(pauseTime);

        // Get the text of the element
        const text = await approvedLimitElement.getText();
        console.log('🔹 Approved Limit Text:', text);

        // Assert that it contains the expected value
        const expectedText = 'Approved Loan Limit';
        if (!text.includes(expectedText)) {
            throw new Error(`Expected text "${expectedText}" but found "${text}"`);
        }
        await browser.pause(pauseTime);
    });

    after(async () => {
    console.log('Test completed');
        // await browser.deleteSession();
    });
});