class LoginPage {
    // ---------- Elements ----------
    get mobileNumberTextField() { return $('//input[@data-testid="testEnterMobileNumber"]'); }
    get nextBtn() { return $('//div[@data-testid="testTapMobileNumberNextButton"]'); }
    get otpInput() { return $('//input[@data-testid="testEnterMobileOTP"]'); }

    // ---------- Actions ----------
    async enterMobileNumber(mobile) {
        await this.mobileNumberTextField.waitForDisplayed({ timeout: 10000 });
        await this.mobileNumberTextField.setValue(mobile);
    }

    async clickNext() {
        await this.nextBtn.waitForClickable({ timeout: 10000 });
        await this.nextBtn.click();
    }

    async enterOTP(otp) {
        await this.otpInput.waitForDisplayed({ timeout: 10000 });
        await this.otpInput.setValue(otp);
    }

}

export default new LoginPage(); 
