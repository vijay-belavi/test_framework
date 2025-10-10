const { openMobileNotifications } = require('../../helpers/mobileHelper');

describe('Hardcoded Login Test', () => {
    it('should enter mobile number and click Next, then open mobile notifications', async () => {
        // --- WEB FLOW ---
        await browser.url('https://stage-portal.getzype.com/');
        await browser.maximizeWindow();

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


    });
});