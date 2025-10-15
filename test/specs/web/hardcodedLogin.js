const { ok } = require('assert');
const { deleteData } = require('../API/deleteData');
const Tesseract = require('tesseract.js');

describe('Hardcoded Login Test', () => {

    let mobileNumber = '8792593183';
    let explicitWait = 30000;
    let pauseTime = 500;

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

    it('Pause for OTP entry', async () => {
        await browser.pause(15000);
        // ensure OTP is entered
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

    it('Accept L1 Limit', async () => {
        const acceptL1Btn = await $('//div[@data-testid="acceptAndContinue"]');
        await acceptL1Btn.waitForClickable({ timeout: explicitWait });
        await acceptL1Btn.click();
        await browser.pause(pauseTime);


        await browser.pause(30000);
    });


    /*  // -- DigiiLocker Flow -- //
       it('Complete DigiLocker Flow', async () => {
           const aadhaarInput = await $('//input[contains(@placeholder,"Enter Aadhaar Number")]');
           await aadhaarInput.waitForClickable({ timeout: explicitWait });
           await aadhaarInput.setValue('709877120164');
           await browser.pause(pauseTime);
   
           for (let i = 0; i < 10; i++) {
               console.log(`Iteration number: ${i + 1}`);
   
               const imageElement = await $('//img[contains(@id,"captcha_img")]');
               await imageElement.waitForDisplayed({ timeout: explicitWait });
               await imageElement.saveScreenshot(`./screenshots/web/exampleImage_${i + 1}.png`);
               await browser.pause(pauseTime);
   
               (async () => {
                   const imagePath = `./screenshots/web/exampleImage_${i + 1}.png`; // path to your image
   
                   const { data: { text } } = await Tesseract.recognize(
                       imagePath,
                       'eng', // language (can use others like 'hin', 'fra', etc.)
                       {
                           logger: info => console.log(info.status, info.progress) // optional progress log
                       }
                   );
   
                   console.log('Extracted Text: ');
                   console.log(text);
               })();
   
               const tryAnotherLink = await $('//small[contains(text(),"Try another")]/..');
               await tryAnotherLink.waitForClickable({ timeout: explicitWait });
               await tryAnotherLink.click();
               await browser.pause(pauseTime);
   
           }
   
       }); */


    it('Take Selfie and Proceed', async () => {

        await browser.pause(10000); // wait before starting selfie process
        await browser.waitUntil(
            async () => {
                const state = await browser.execute(() => document.readyState);
                return state === 'complete';
            },
            {
                timeout: 30000,          // max wait time in ms
                timeoutMsg: 'Page did not load within 30s'
            }
        );
        const continueBtn = await $('//div[@data-testid="testTapTakeSelfieButton"]');
        await continueBtn.waitForClickable({ timeout: explicitWait });
        await continueBtn.waitForEnabled({ timeout: explicitWait });
        await continueBtn.click();
        await browser.pause(pauseTime);

        const proceedToSelfieBtn = await $('//span[text()="Proceed to Take Selfie"]/..');
        await proceedToSelfieBtn.waitForClickable({ timeout: explicitWait });
        await proceedToSelfieBtn.click();
        await browser.pause(pauseTime);

        const captureBtn = await $('//div[@id="hv-camera-selfie-capture-button"]');
        await captureBtn.waitForClickable({ timeout: explicitWait });
        await captureBtn.click();
        await browser.pause(pauseTime);

        const usethisPhotoBtn = await $('//div[@data-testid="testTapUsePhoto"]');
        await usethisPhotoBtn.waitForClickable({ timeout: explicitWait });
        await usethisPhotoBtn.click();
        await browser.pause(pauseTime);

        const kycContinueBtn = await $('//div[@data-testid="testTapKycContinueButton"]');
        await kycContinueBtn.waitForClickable({ timeout: explicitWait });
        await kycContinueBtn.click();
        await browser.pause(pauseTime);

    });
    /*
    it('Add Bank Account', async () => {
        const continueBtn = await $('//div[@data-testid="testTapReversePennyConfirmButton"]');
        await continueBtn.waitForClickable({ timeout: explicitWait });
        await continueBtn.click();
        await browser.pause(pauseTime);

        const bankAccountNumberField = await $('//input[@data-testid="testEnteredAccountNumber"]');
        await bankAccountNumberField.waitForClickable({ timeout: explicitWait });
        await bankAccountNumberField.setValue('123456789012');
        await browser.pause(pauseTime);

        const ifscField = await $('//input[@data-testid="testEnterIfsc_Code"]');
        await ifscField.waitForClickable({ timeout: explicitWait });
        await ifscField.setValue('HDFC0001234');
        await browser.pause(pauseTime);

        const proceedBtn = await $('//div[@data-testid="testTapBankDetailsProceedButton"]');
        await proceedBtn.waitForClickable({ timeout: explicitWait });
        await proceedBtn.click();
        await browser.pause(pauseTime);

        const confirmBtn = await $('//div[@data-testid="testPressPositiveButton"]');
        await confirmBtn.waitForClickable({ timeout: explicitWait });
        await confirmBtn.click();
        await browser.pause(pauseTime);

    });

    it('Mandate Creation', async () => {
        const selectMandateOption = await $('//div[@data-testid="testTapAutoPayATM / Debit card"]');
        await selectMandateOption.waitForClickable({ timeout: explicitWait });
        await selectMandateOption.click();
        await browser.pause(pauseTime);

        const authorizeBtn = await $('//div[@data-testid="testTapAuthoriseButton"]');
        await authorizeBtn.waitForClickable({ timeout: explicitWait });
        await authorizeBtn.click();
        await browser.pause(pauseTime);

        const mandateSuccessBtn = await $('//button[text()="Simulate Success"]');
        await mandateSuccessBtn.waitForClickable({ timeout: explicitWait });
        await mandateSuccessBtn.click();
        await browser.pause(pauseTime);

    });

    it('should verify approved loan limit text', async () => {
        // 1 second

        const approvedLimitElement = await $('//div[text()="Auto debit has been set up successfully"]');

        // Wait until the element is displayed
        await approvedLimitElement.waitForDisplayed({ timeout: explicitWait });
        await browser.pause(pauseTime);

        // Get the text of the element
        const text = await approvedLimitElement.getText();

        // Assert that it contains the expected value
        const expectedText = 'Auto debit has been set up successfully';
        if (!text.includes(expectedText)) {
            throw new Error(`Expected text "${expectedText}" but found "${text}"`);
        }
    });

    it('Continue and Add Reference Contact', async () => {
        const continueBtn = await $('//div[@data-testid="testTapMandateSuccessContinueButton"]');
        await continueBtn.waitForClickable({ timeout: explicitWait });
        await continueBtn.click();
        await browser.pause(pauseTime);

        const referenceContactOne = await $('//div[text()="Reference 1"]/following-sibling::div//input[@data-testid="testReferenceNameInput"]');
        await referenceContactOne.waitForClickable({ timeout: explicitWait });
        await referenceContactOne.setValue('Test Reference One');     
        await browser.pause(pauseTime);
        
        const referenceContactNumberOne = await $('//div[text()="Reference 1"]/following-sibling::div//input[@data-testid="testReferenceNumberInput"]');
        await referenceContactNumberOne.waitForClickable({ timeout: explicitWait });
        await referenceContactNumberOne.setValue('8792593184');     
        await browser.pause(pauseTime);

        const referenceContactTwo = await $('//div[text()="Reference 2"]/following-sibling::div//input[@data-testid="testReferenceNameInput"]');
        await referenceContactTwo.waitForClickable({ timeout: explicitWait });
        await referenceContactTwo.setValue('Test Reference Two');     
        await browser.pause(pauseTime);

        const referenceContactNumber = await $('//div[text()="Reference 2"]/following-sibling::div//input[@data-testid="testReferenceNumberInput"]');
        await referenceContactNumber.waitForClickable({ timeout: explicitWait });
        await referenceContactNumber.setValue('8792593185');     
        await browser.pause(pauseTime);

        const referenceConfirmCheckbox = await $('//div[@data-testid="testReferenceConfirmCheckbox"]');
        await referenceConfirmCheckbox.scrollIntoView();
        await referenceConfirmCheckbox.waitForClickable({ timeout: explicitWait });
        await referenceConfirmCheckbox.click();
        await browser.pause(pauseTime);

        const referenceContinueBtn = await $('//div[@data-testid="testReferenceSaveConfirmButton"]');
        await referenceContinueBtn.waitForClickable({ timeout: explicitWait });
        await referenceContinueBtn.click();
        await browser.pause(pauseTime);
    }); 

    it('Set Up MPIN', async () => {

        const approvedLimitElement = await $('//div[text()="Auto debit has been set up successfully"]');
        await approvedLimitElement.waitForDisplayed({ timeout: explicitWait });
        await browser.pause(pauseTime);

        const text = await approvedLimitElement.getText();

        // Assert that it contains the expected value
        const expectedText = 'Auto debit has been set up successfully';
        if (!text.includes(expectedText)) {
            throw new Error(`Expected text "${expectedText}" but found "${text}"`);
        }

        const mpinField = await $('//input[@data-testid="testSetupMPinInput"]');
        await mpinField.waitForClickable({ timeout: explicitWait });
        await mpinField.setValue('1111');
        await browser.pause(pauseTime);

        const confirmMpinField = await $('//input[@data-testid="testConfirmMPinInput"]');
        await confirmMpinField.waitForClickable({ timeout: explicitWait });
        await confirmMpinField.setValue('1111');
        await browser.pause(pauseTime);

        // const setMpinBtn = await $('//div[text()="Re-enter MPIN"]/following-sibling::div//div[text()="Set MPIN"]');
        // await setMpinBtn.waitForClickable({ timeout: explicitWait });
        // await setMpinBtn.click();
        // await browser.pause(pauseTime);

        //   ffmpeg -i "C:\Users\User\Pictures\Camera Roll\WIN_20251014_15_38_44_Pro.mp4" -pix_fmt yuv420p "C:\Users\User\test_framework\resources\camera_selfie.y4m"

    }); */

    after(async () => {
        console.log('Test completed');
        // await browser.deleteSession();
    });
});