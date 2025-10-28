class emailPage {
    get emailField() { return $('//input[@data-testid="testEnterEmail"]'); }
    get emailContinueBtn() { return $('//div[@data-testid="testTapEmailOptionsNextButton"]'); }
  
    async emailField(email) {
        await this.emailField.setValue(email);
    }
    async continueButton() {
        await this.emailContinueBtn.click();
    }
}
export default new emailPage();