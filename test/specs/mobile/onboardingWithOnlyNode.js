const wdio = require("webdriverio");
const { swipeUpTillElementVisible } = require('../../helpers/swipeUpTillElementVisible');


async function main() {
    const caps = {
        platformName: "Android",
        // "appium:appPackage": "com.zype.mobile.stage",
        // "appium:appActivity": "com.zype.mobile.MainActivity",
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
        await acceptAndContinueBtn.waitForDisplayed({timeout: explicitWait})
        await acceptAndContinueBtn.click();
        await driver.pause(pauseTime);

    }
    // --- Test Flow ---
    try {
        // const mobileNumber = '8792593183';
        // await deleteData('+91' + mobileNumber).catch(err => {
        //     console.warn('Could not delete mobile, continuing with test...');
        // });

        // await enterMobileNumberAndOtp(mobileNumber);
        // await driver.pause(15000);
        // await firstNameLastName('Vijay', 'Belavi');
        // await enterPanAndDob('DGOPB7256L', '18-02-1999');
        // await acceptTnCandKYC();
        // await emailAndOtp('vijaybelavi1432@gmail.com');
        // await driver.pause(15000);
        // await selectEmployement('Salaried');
        // await employementDetails('Fireflink', '65000', 'More than 5 lakhs');
        // await addressDetails('123', 'Main St', '400001', 'Test');
        // await acceptL1Limit();
        // await driver.pause(30000);
        // await 

    } catch (err) {
        console.error("Failed during onboarding:", err);
    } finally {
        // await driver.deleteSession();
    }

}

main().catch(console.error);