class mobileNumberScreen {
    get mobileNumberInput() { return $('testEnterMobileNumber'); }
    get nextBtn() { return $('Next'); }
    get otField() { return $('testEnterMobileOTP'); }
    async mobileNumberDetails(mobileNumber) {
        await this.mobileNumberInput.setValue(mobileNumber);
    }

    async nextButton() {
        await this.nextBtn.click();
    }
    async otpField(otp) {
        await this.otField.setValue(otp);
    }
}