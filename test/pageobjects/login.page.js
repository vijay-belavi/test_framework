class LoginPage {
    get mobileNumberTextField() { return $('//input[@data-testid="testEnterMobileNumber"]'); }
     get nextBtn() { return $('//div[@data-testid="testTapMobileNumberNextButton"]'); }
    // get loginBtn() { return $('#login'); }

    async login(user) {
        await this.mobileNumberTextField.click();
        await this.nextBtn.click();
        await this.mobileNumberTextField.setValue('8792593183');
        // await this.loginBtn.click();
    }
}

export default new LoginPage(); // ✅ Use 'default' for import