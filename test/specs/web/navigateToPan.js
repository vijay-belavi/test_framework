const ConfigManager = require('../../helpers/ConfigManager');

// Optional: provide local overrides
const config = new ConfigManager({ 
    baseUrl: 'https://stage-portal.zype.com/',
    mobileNumber: '8792593183', 
     pauseTime: 5000 
});

describe('Login or Create Account', () => {
    before(async () => {
        await browser.url(config.baseUrl); // automatically uses global or override
        await browser.maximizeWindow();
        await browser.setTimeout({ implicit: config.timeout });

        // await deleteData('+91' + config.mobileNumber).catch(err => {
        //     console.warn('Could not delete mobile, continuing with test...');
        // });
    });

    it('Enter Mobile Number & Otp - Web', async () => {
        const mobileInput = await $('//input[@data-testid="testEnterMobileNumber"]');
        await mobileInput.waitForDisplayed({ timeout: config.explicitWait });
        await mobileInput.waitForEnabled({ timeout: config.explicitWait });
        await mobileInput.clearValue();
        await browser.pause(config.pauseTime);

        for (const digit of config.mobileNumber) {
            await mobileInput.addValue(digit);
        }

        await browser.pause(config.pauseTime);

        // const nextBtn = await $('//div[@data-testid="testTapMobileNumberNextButton"]');
        // await nextBtn.waitForClickable({ timeout: config.explicitWait });
        // await nextBtn.click();
        // await browser.pause(config.pauseTime);
    });
});
