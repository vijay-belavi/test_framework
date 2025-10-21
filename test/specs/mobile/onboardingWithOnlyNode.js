const wdio = require("webdriverio");
const { swipeUpTillElementVisible } = require('../../helpers/swipeUpTillElementVisible');
const axios = require('axios');

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
    const pauseTime = 500;

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
        const panInput = await driver.$('//android.widget.EditText[@resource-id="testEnterPanNumber"]');
        await panInput.waitForDisplayed({ timeout: explicitWait });
        await panInput.setValue(panNumber);
        await driver.pause(pauseTime);

        const dobInput = await driver.$('//android.widget.EditText[@resource-id="testEnterDOB"]');
        await dobInput.waitForDisplayed({ timeout: explicitWait });
        await dobInput.setValue(dob);
        await driver.pause(pauseTime);
    }

    async function acceptTnCandKYC() {
        const tncCheckbox = await driver.$('//android.view.ViewGroup[@resource-id="testTapCheckBoxTnC"]');
        await tncCheckbox.waitForDisplayed({ timeout: explicitWait });
        await tncCheckbox.click();
        await driver.pause(pauseTime);

        const kycCheckbox = await driver.$('//android.view.ViewGroup[@resource-id="testTapCheckBoxKYC"]');
        await kycCheckbox.waitForDisplayed({ timeout: explicitWait });
        await kycCheckbox.click();
        await driver.pause(pauseTime);

        const nextPanBtn = await driver.$('//android.view.ViewGroup[@resource-id="testTapNextButtonPan"]');
        await nextPanBtn.waitForDisplayed({ timeout: explicitWait });
        await nextPanBtn.click();
        await driver.pause(pauseTime);
    }

    async function emailAndOtp(email) {
        const emailInput = await driver.$('//android.widget.EditText[@resource-id="testEnterEmail"]');
        await emailInput.waitForDisplayed({ timeout: explicitWait });
        await emailInput.setValue(email);
        await driver.pause(pauseTime);

        const nextEmailBtn = await driver.$('//android.view.ViewGroup[@content-desc="Next"]');
        await nextEmailBtn.waitForDisplayed({ timeout: explicitWait });
        await nextEmailBtn.click();
        await driver.pause(pauseTime);


        await driver.pause(15000); // wait for OTP auto-fetch
    }

    async function selectEmployement(employementOption) {
        const selectEmployement = await driver.$(`//android.view.ViewGroup[contains(@content-desc, "${employementOption}")]`);
        await selectEmployement.waitForDisplayed({ timeout: explicitWait });
        await selectEmployement.click();
        await driver.pause(pauseTime);

        const confirmBtn = await driver.$('//android.view.ViewGroup[@content-desc="Confirm"]');
        await confirmBtn.waitForDisplayed({ timeout: explicitWait });
        await confirmBtn.click();
        await driver.pause(pauseTime);

    }

    async function employementDetails(companyName, monthlyIncome, annualIncomeBracket) {
        const personalEmailCheckbox = await driver.$('//android.view.ViewGroup[@resource-id="testTapExistedEmail"]');
        await personalEmailCheckbox.waitForDisplayed({ timeout: explicitWait });
        await personalEmailCheckbox.click();
        await driver.pause(pauseTime);

        const companNameField = await driver.$('//android.view.ViewGroup[@resource-id="testTapOrgName"]');
        await companNameField.waitForDisplayed({ timeout: explicitWait });
        await companNameField.click();
        await driver.pause(pauseTime);

        const searchTextField = await driver.$('//android.widget.EditText[@resource-id="testEnterOrgName"]');
        await searchTextField.waitForDisplayed({ timeout: explicitWait });
        await searchTextField.setValue(companyName);
        await driver.pause(pauseTime);

        companyName = companyName.toUpperCase();
        const companySelect = await driver.$(`//android.view.ViewGroup[contains(@content-desc,"${companyName}")]`);
        await companySelect.waitForDisplayed({ timeout: explicitWait });
        await companySelect.click();
        await driver.pause(pauseTime);

        const monthlyIncomeField = await driver.$('//android.widget.EditText[@resource-id="testEnterMonthlyIncome"]');
        await monthlyIncomeField.waitForDisplayed({ timeout: explicitWait });
        await monthlyIncomeField.setValue(monthlyIncome);
        await driver.pause(pauseTime);
        try {
            const xpath = '//android.view.ViewGroup[contains(@content-desc,"Continue")]';
            const continueBtn = await swipeUpTillElementVisible(driver, xpath, 10);
            // await continueBtn.click();
        } catch (err) {
            console.error("Test failed: Continue button not found!", err);
        }
        const annualIncomeDropdown = await driver.$('//android.view.ViewGroup[@resource-id="testTapFamilyIncome"]');
        await annualIncomeDropdown.waitForDisplayed({ timeout: explicitWait });
        await annualIncomeDropdown.click();
        await driver.pause(pauseTime);

        const annualIncomeOption = await driver.$(`//android.view.ViewGroup[contains(@content-desc, "${annualIncomeBracket}")]`);
        await annualIncomeOption.waitForDisplayed({ timeout: explicitWait });
        await annualIncomeOption.click();
        await driver.pause(pauseTime);

        const continueBtn = await driver.$('//android.view.ViewGroup[contains(@content-desc,"Continue")]');
        await continueBtn.waitForDisplayed({ timeout: explicitWait });
        await continueBtn.click();
        await driver.pause(pauseTime);

        const noContinueWithPersonalEmailBtn = await driver.$('//android.view.ViewGroup[@resource-id="testPressNegativeButton"]');
        await noContinueWithPersonalEmailBtn.waitForDisplayed({ timeout: explicitWait });
        await noContinueWithPersonalEmailBtn.click();
        await driver.pause(pauseTime);

    }

    async function addressDetails(houseNumber, street, pincode, landmark) {

        await driver.$('//android.widget.TextView[@resource-id="testAddressScreenTitleText"]').waitForDisplayed({ timeout: 60000 });

        const houseField = await driver.$('//android.widget.EditText[@resource-id="testAddressScreenFloorInput"]');
        await houseField.waitForDisplayed({ timeout: explicitWait });
        await houseField.setValue(houseNumber);
        await driver.pause(pauseTime);

        const streetField = await driver.$('//android.widget.EditText[@resource-id="testAddressScreenBuildingInput"]');
        await streetField.waitForDisplayed({ timeout: explicitWait });
        await streetField.setValue(street);
        await driver.pause(pauseTime);

        const pincodeField = await driver.$('//android.widget.EditText[@resource-id="testAddressScreenPinInput"]');
        await pincodeField.waitForDisplayed({ timeout: explicitWait });
        await pincodeField.setValue(pincode);
        await driver.pause(pauseTime);

        const landMarkTextField = await driver.$('//android.widget.EditText[@resource-id="testAddressScreenLandmarkInput"]');
        await landMarkTextField.waitForDisplayed({ timeout: explicitWait });
        await landMarkTextField.setValue(landmark);
        await driver.pause(pauseTime);

        try {
            const isKeyboardShown = await driver.isKeyboardShown();

            if (isKeyboardShown) {
                console.log("Keyboard is open. Closing it...");
                await driver.hideKeyboard();
                console.log("Keyboard closed successfully.");
            } else {
                console.log("Keyboard already closed.");
            }

        } catch (err) {
            console.log("Error checking keyboard state or closing keyboard:", err.message);
        }
        const saveAndContinueBtn = await driver.$('//android.view.ViewGroup[@resource-id="testAddressScreenConfirmButton"]');
        await saveAndContinueBtn.waitForDisplayed({ timeout: explicitWait });
        await saveAndContinueBtn.click();
        await driver.pause(pauseTime);
    }

    async function acceptL1Limit() {
        const acceptAndContinueBtn = await driver.$('//android.view.ViewGroup[@content-desc="Accept and Continue"] ');
        await acceptAndContinueBtn.waitForDisplayed({ timeout: explicitWait })
        await acceptAndContinueBtn.click();
        await driver.pause(pauseTime);

    }
    async function DigiiLocker(aadhaarNumber, aadharPin) {

    }

    async function selfie() {
        const takeSelfieBtn = await driver.$('//android.view.ViewGroup[@content-desc="Take Selfie"]');
        await takeSelfieBtn.waitForDisplayed({ timeout: explicitWait })
        await takeSelfieBtn.click();
        await driver.pause(pauseTime);

        const proceedAndTakeSelfieBtn = await driver.$('//android.widget.Button[@resource-id="com.zype.mobile.stage:id/proceed_button"]');
        await proceedAndTakeSelfieBtn.waitForDisplayed({ timeout: explicitWait })
        await proceedAndTakeSelfieBtn.click();
        await driver.pause(pauseTime);

        await driver.pauseTime(10000);

        const usePhotoBtn = await driver.$('//android.view.ViewGroup[@content-desc="Use this photo"]');
        await usePhotoBtn.waitForDisplayed({ timeout: explicitWait })
        await usePhotoBtn.click();
        await driver.pause(pauseTime);

        const continueBtn = await driver.$('//android.view.ViewGroup[@content-desc="Continue"]');
        await continueBtn.waitForDisplayed({ timeout: explicitWait })
        await continueBtn.click();
        await driver.pause(pauseTime);

    }
    async function addBankDetails(accountNumber, ifscCode) {
        const reversePennyOption = await driver.$('//android.view.ViewGroup[@resource-id="testTapAddBankCard"]');
        await reversePennyOption.waitForDisplayed({ timeout: explicitWait })
        await reversePennyOption.click();
        await driver.pause(pauseTime);

        const confirmBtn = await driver.$('//android.view.ViewGroup[@content-desc="Confirm"]');
        await confirmBtn.waitForDisplayed({ timeout: explicitWait })
        await confirmBtn.click();
        await driver.pause(pauseTime);

        const bankAccountNumberField = await driver.$('//android.widget.EditText[@resource-id="testEnteredAccountNumber"]');
        await bankAccountNumberField.waitForDisplayed({ timeout: explicitWait })
        await bankAccountNumberField.setValue(accountNumber);
        await driver.pause(pauseTime);

        const ifscCodeField = await driver.$('//android.widget.EditText[@resource-id="testEnterIfsc_Code"]');
        await ifscCodeField.waitForDisplayed({ timeout: explicitWait })
        await ifscCodeField.setValue(ifscCode);
        await driver.pause(pauseTime);

        const proceedBtn = await driver.$('//android.view.ViewGroup[@content-desc="Proceed"]');
        await proceedBtn.waitForDisplayed({ timeout: explicitWait })
        await proceedBtn.click();
        await driver.pause(pauseTime);

        await confirmBtn.waitForDisplayed({ timeout: explicitWait })
        await confirmBtn.click();
        await driver.pause(pauseTime);
    }

    async function setUpMandate(mandateOption) {
        const mandateOptionBtn = await driver.$(`//android.view.ViewGroup[contains(@content-desc, "${mandateOption}")]`);
        await mandateOptionBtn.waitForDisplayed({ timeout: explicitWait })
        await mandateOptionBtn.click();
        await driver.pause(pauseTime);

        const authorizeBtn = await driver.$('//android.view.ViewGroup[@content-desc="Authorise"]');
        await authorizeBtn.waitForDisplayed({ timeout: explicitWait })
        await authorizeBtn.click();
        await driver.pause(pauseTime);

        try {
            const xpath = '//android.view.ViewGroup[contains(@content-desc,"Continue")]';
            const continueBtn = await swipeUpTillElementVisible(driver, xpath, 10);
            await continueBtn.click();
        } catch (err) {
            console.error("Test failed: Continue button not found!", err);
        }

    }

    async function referenceContactDetails(contactOne, mobileNumberOne, relationOne, contacteTwo, mobileNumberTwo, relationTwo) {

        await driver.$('//android.widget.TextView[@text="Add Reference Contacts"]').waitForDisplayed({ timeout: 50000 });

        const contactNameOneField = await driver.$('(//android.widget.EditText[@resource-id="testReferenceNameInput"])[1]');
        await contactNameOneField.waitForDisplayed({ timeout: explicitWait })
        await contactNameOneField.setValue(contactOne);
        await driver.pause(pauseTime);

        const mobileNumberOneField = await driver.$('(//android.widget.EditText[@resource-id="testReferenceNumberInput"])[1]');
        await mobileNumberOneField.waitForDisplayed({ timeout: explicitWait })
        await mobileNumberOneField.setValue(mobileNumberOne);
        await driver.pause(pauseTime);

        const referenceRelationOneBtn = await driver.$(`(//android.view.ViewGroup[contains(@content-desc, "${relationOne}")])[1]`);
        await referenceRelationOneBtn.waitForDisplayed({ timeout: explicitWait })
        await referenceRelationOneBtn.click();
        await driver.pause(pauseTime);

        try {
            const xpath = '//android.view.ViewGroup[@content-desc="Save and Confirm"]';
            await swipeUpTillElementVisible(driver, xpath, 10);
            // await continueBtn.click();
        } catch (err) {
            console.error("Test failed: Continue button not found!", err);
        }

        const contactNameTwoField = await driver.$('(//android.widget.EditText[@resource-id="testReferenceNameInput"])[2]');
        await contactNameTwoField.waitForDisplayed({ timeout: explicitWait })
        await contactNameTwoField.setValue(contacteTwo);
        await driver.pause(pauseTime);

        const mobileNumberTwoField = await driver.$('(//android.widget.EditText[@resource-id="testReferenceNumberInput"])[2]');
        await mobileNumberTwoField.waitForDisplayed({ timeout: explicitWait })
        await mobileNumberTwoField.setValue(mobileNumberTwo);
        await driver.pause(pauseTime);

        const referenceRelation2 = await driver.$(`(//android.view.ViewGroup[contains(@content-desc, "${relationOne}")])[2]`);
        await referenceRelation2.waitForDisplayed({ timeout: explicitWait })
        await referenceRelation2.click();
        await driver.pause(pauseTime);

        const referenceCheckBox = await driver.$('//android.view.ViewGroup[@resource-id="testReferenceConfirmCheckbox"]');
        await referenceCheckBox.waitForDisplayed({ timeout: explicitWait })
        await referenceCheckBox.click();
        await driver.pause(pauseTime);

        const saveAndContinueBtn = await driver.$('//android.view.ViewGroup[@content-desc="Save and Confirm"]');
        await saveAndContinueBtn.waitForDisplayed({ timeout: explicitWait })
        await saveAndContinueBtn.click();
        await driver.pause(pauseTime);
    }

    async function setUpMPIN(mpin) {

        await driver.$('//android.widget.TextView[@text="Set MPIN"]').waitForDisplayed({ timeout: 50000 });

        const mpinField = await driver.$('//android.widget.EditText[@resource-id="testSetupMPinInput"]');
        await mpinField.waitForDisplayed({ timeout: explicitWait })
        await mpinField.setValue(mpin);
        await driver.pause(pauseTime);

        const reEnterMpinField = await driver.$('//android.widget.EditText[@resource-id="testConfirmMPinInput"]');
        await reEnterMpinField.waitForDisplayed({ timeout: explicitWait })
        await reEnterMpinField.setValue(mpin);
        await driver.pause(pauseTime);

        await driver.$('//android.widget.TextView[@resource-id="testCheckAppLockSuccessText"]').waitForDisplayed({ timeout: 5000 })

        const continueBtn = await driver.$('//android.widget.EditText[@resource-id="testConfirmMPinInput"]');
        await continueBtn.waitForDisplayed({ timeout: explicitWait })
        await continueBtn.click();
        await driver.pause(pauseTime);

        try {
            const selectAmountElement = await driver.$('//android.widget.TextView[@text="Select Amount"]');

            // Wait for it to be displayed (timeout 10s)
            const isDisplayed = await selectAmountElement.waitForDisplayed({ timeout: 10000 });

            if (isDisplayed) {
                console.log("✅ 'Select Amount' element is displayed - PASS");
            } else {
                console.log("❌ 'Select Amount' element is NOT displayed - FAIL");
            }
        } catch (err) {
            console.log("❌ Error while checking 'Select Amount' element:", err.message);
        }
    }

    // --- Test Flow ---
    try {
        const mobileNumber = '8792593183';
        // await deleteData('+91' + mobileNumber).catch(err => {
        //     console.warn('Could not delete mobile, continuing with test...');
        // });

        await enterMobileNumberAndOtp(mobileNumber);
        await driver.pause(15000);
        await firstNameLastName('Vijay', 'Belavi');
        await enterPanAndDob('DGOPB7256L', '18-02-1999');
        await acceptTnCandKYC();
        await emailAndOtp('vijaybelavi1432@gmail.com');
        await driver.pause(15000);
        await selectEmployement('Salaried');
        await employementDetails('Fireflink', '65000', 'More than 5 lakhs');
        await addressDetails('123', 'Main St', '400001', 'Test');
        await acceptL1Limit();
        await driver.pause(60000);
        // await DigiiLocker(aadhaarNumber, aadharPin);
        await selfie();
        await addBankDetails('000201691528', 'ICIC0000002');
        await setUpMandate('ATM');
        await referenceContactDetails('Test One', '9110420644', 'FRIEND', 'Test Two', '8792593241', 'RELATIVE');
        await setUpMPIN('1111');

    } catch (err) {
        console.error("Failed during onboarding:", err);
    } finally {
        // await driver.deleteSession();
    }

}

main().catch(console.error);