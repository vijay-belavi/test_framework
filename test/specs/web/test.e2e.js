// test/specs/web/test.e2e.js
import LoginPage from '../../pageobjects/login.page.js';

describe('Login Tests', () => {

    before(async () => {
        if (!browser.isMobile) {
            await browser.url('https://stage-portal.getzype.com');
        }
    });

    it('should login on web', async () => {
        if (!browser.isMobile) {
            // ✅ Don’t instantiate, use directly
            await expect(browser).toHaveTitle('Zype');
           
            const nextBtn = await $('//div[@data-testid="testTapMobileNumberNextButton"]');
            await nextBtn.waitForExist({ timeout: 5000 });

            //  const mobileNumberTextField = await $('//input[@data-testid="testEnterMobileNumber"]');
            // await elem.waitForExist({ timeout: 5000 });
            // await mobileNumberTextField.setValue('8792593183');
            const user = '8792593183';
            await LoginPage.login('user');

            await browser.pause(30000); // Pause for 3 seconds to observe the result
            
        }
    });
});
