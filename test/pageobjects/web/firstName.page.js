class firstNamePage {
    get firstNameField() { return $('//input[@data-testid="testEnterFirstName"]'); }
    get lastNameField() { return $('//input[@data-testid="testEnterLastName"]'); }
    get saveAndContinueBtn() { return $('//div[@data-testid="testTapSaveAndContinueButtonName"]'); }


    async firstNameDetails(first) {
        await this.firstNameField.setValue(first);
    }
     async lastNameDetails(last) {
        await this.lastNameField.setValue(last);
    }
     async saveAndContinueButton() {
        await this.saveAndContinueBtn.click();
    }
}
export default new firstNamePage();