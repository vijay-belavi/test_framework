const { ok } = require('assert');
const { openMobileNotifications } = require('../../helpers/mobileHelper');

describe('Hardcoded Login Test', () => {
    it('should enter mobile number and click Next, then open mobile notifications', async () => {
        // --- WEB FLOW ---
        await browser.url('https://stage-portal.getzype.com/');
        await browser.maximizeWindow();
        await browser.setTimeout({ implicit: 10000 });

        const mobileInput = await $('//input[@data-testid="testEnterMobileNumber"]');
        await mobileInput.waitForDisplayed({ timeout: 10000 });
        await mobileInput.setValue('8792593183');

        const nextBtn = await $('//div[@data-testid="testTapMobileNumberNextButton"]');
        await nextBtn.waitForClickable({ timeout: 10000 });
        await nextBtn.click();

        console.log('✅ Web part completed');

        // --- MOBILE FLOW ---
        await openMobileNotifications();

        //Resume Web Flow
        const otpInput = await $('//input[@data-testid="testEnterMobileOTP"]');
        await otpInput.waitForDisplayed({ timeout: 10000 });

        // await browser.debug(); // Pause to allow manual OTP entry
        // await otpInput.setValue('123456');

        await browser.pause(10000); // Pause to ensure OTP is entered

        // const verifyMobileNumberBtn = await $('//div[@data-testid="testTapVerifyMobileNumber"]');
        // await verifyMobileNumberBtn.waitForClickable({ timeout: 10000 });
        // await verifyMobileNumberBtn.click();

        // const permissionsPopup = await $('//div[text()="Permissions"]');
        // await permissionsPopup.waitForExist({ timeout: 10000 });

        // // Wait for Allow button
        // const allowButton = await $('//div[@data-testid="testTapAllowButton"]');
        // await allowButton.waitForDisplayed({ timeout: 10000 });
        // await allowButton.click();

        // -- First Name and Last Name Page -- //
        const firstNameTextField = await $('//input[@data-testid="testEnterFirstName"]');
        await firstNameTextField.waitForDisplayed({ timeout: 5000 }); // wait up to 5s
        await firstNameTextField.setValue('Vijay');

        // Wait for DOB input and enter value
        const lastNameTextField = await $('//input[@data-testid="testEnterLastName"]');
        await lastNameTextField.waitForDisplayed({ timeout: 5000 });
        await lastNameTextField.setValue('Belavi');

        // Wait for TnC checkbox and click
        const saveAndContinueBtn = await $('//div[@data-testid="testTapSaveAndContinueButtonName"]');
        await saveAndContinueBtn.waitForDisplayed({ timeout: 5000 });
        await saveAndContinueBtn.click();

        // -- PAN Number Page -- //

        // Wait for PAN input and enter value
        const panInput = await $('//input[@data-testid="testEnterPanNumber"]');
        await panInput.waitForDisplayed({ timeout: 5000 }); // wait up to 5s
        await panInput.setValue('DGOPB7256L');

        // Wait for DOB input and enter value
        const dobInput = await $('//input[@data-testid="testEnterDOB"]');
        await dobInput.waitForDisplayed({ timeout: 5000 });
        await dobInput.setValue('18/02/1999');

        // Wait for TnC checkbox and click
        const tncCheckbox = await $('//div[@data-testid="testTapCheckBoxTnC"]');
        await tncCheckbox.waitForDisplayed({ timeout: 5000 });
        await tncCheckbox.click();

        // Wait for KYC checkbox and click
        const kycCheckbox = await $('//div[@data-testid="testTapCheckBoxKYC"]');
        await kycCheckbox.waitForDisplayed({ timeout: 5000 });
        await kycCheckbox.click();

        const nextPanBtn = await $('//div[@data-testid="testTapNextButtonPan"]');
        await nextPanBtn.waitForClickable({ timeout: 10000 });
        await nextPanBtn.click();

         await browser.pause(10000);

        // -- Email Otp Verification Page -- //

         const emailTextField = await $('//div[@data-testid="testTapNextButtonPan"]');
        await emailTextField.waitForClickable({ timeout: 10000 });
        await emailTextField.setValue('vijaybelavi1432@gmail.com');

        const continueBtn = await $('//div[@data-testid="testTapNextButtonPan"]');
        await continueBtn.waitForClickable({ timeout: 10000 });
        await continueBtn.click();

        const emailOtpTextField = await $('//div[@data-testid="testTapNextButtonPan"]');
        await emailOtpTextField.waitForClickable({ timeout: 10000 });
        await emailOtpTextField.setValue('123456');


        // -- Employement Verification Page -- //

        const salariedOption = await $('//div[@data-testid="testTapNextButtonPan"]');
        await salariedOption.waitForClickable({ timeout: 10000 });
        await salariedOption.click();

        const okBtn = await $('//div[@data-testid="testTapNextButtonPan"]');
        await okBtn.waitForClickable({ timeout: 10000 });
        await okBtn.click();

        const personalEmailCheckbox = await $('//div[@data-testid="testTapNextButtonPan"]');
        await personalEmailCheckbox.waitForClickable({ timeout: 10000 });
        await personalEmailCheckbox.click();

        const companyNameTextfield = await $('//div[@data-testid="testTapNextButtonPan"]');
        await companyNameTextfield.waitForClickable({ timeout: 10000 });
        await companyNameTextfield.click();

        const searchTextField = await $('//div[@data-testid="testTapNextButtonPan"]');
        await searchTextField.waitForClickable({ timeout: 10000 });
        await searchTextField.setValue('FireFlink');

        const firstCompanyNameOption = await $('//div[@data-testid="testTapNextButtonPan"]');
        await firstCompanyNameOption.waitForClickable({ timeout: 10000 });
        await firstCompanyNameOption.click();

        const salaryTextField = await $('//div[@data-testid="testTapNextButtonPan"]');
        await salaryTextField.waitForClickable({ timeout: 10000 });
        await salaryTextField.setValue('65000');

        const annaualIncomeDropdown = await $('//div[@data-testid="testTapNextButtonPan"]');
        await annaualIncomeDropdown.waitForClickable({ timeout: 10000 });
        await annaualIncomeDropdown.click();

        const annualyIncomeOption = await $('//div[@data-testid="testTapNextButtonPan"]');
        await annualyIncomeOption.waitForClickable({ timeout: 10000 });
        await annualyIncomeOption.click();

        const employementContinueBtn = await $('//div[@data-testid="testTapNextButtonPan"]');
        await employementContinueBtn.waitForClickable({ timeout: 10000 });
        await employementContinueBtn.click();


        // -- L1S1 FLOW -- // -- Address Details Page --
        const houseNumberTextField = await $('//div[@data-testid="testTapNextButtonPan"]');
        await houseNumberTextField.waitForClickable({ timeout: 10000 });
        await houseNumberTextField.setValue('test');

        const houseNumberTextField2 = await $('//div[@data-testid="testTapNextButtonPan"]');
        await houseNumberTextField2.waitForClickable({ timeout: 10000 });
        await houseNumberTextField2.setValue('test');

        const pinCodeTextField = await $('//div[@data-testid="testTapNextButtonPan"]');
        await pinCodeTextField.waitForClickable({ timeout: 10000 });
        await pinCodeTextField.setValue('570001');

        const landMarkTextField = await $('//div[@data-testid="testTapNextButtonPan"]');
        await landMarkTextField.waitForClickable({ timeout: 10000 });
        await landMarkTextField.setValue('test');

        const addressContinueBtn = await $('//div[@data-testid="testTapNextButtonPan"]');
        await addressContinueBtn.waitForClickable({ timeout: 10000 });
        await addressContinueBtn.click();


        // -- Got L1 Limit and L1 Limit Page Displayed --

    });
});