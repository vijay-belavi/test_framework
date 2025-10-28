class PanDetails {
     get panField() { return $('//input[@data-testid="testEnterPanNumber"]'); }
    get dobField() { return $('//input[@data-testid="testEnterDOB"]'); }
    get tncCheckbox() { return $('//div[@data-testid="testTapCheckBoxTnC"]'); }
    get kycCheckbox() { return $('//div[@data-testid="testTapCheckBoxKYC"]'); }
    get nextPanBtn() { return $('//div[@data-testid="testTapNextButtonPan"]'); }
    
    async panNumber(pan) {
        await this.panField.setValue(pan);
        await this.dobField.setValue(dob);
        await this.tncCheckbox.click();
        await this.kycCheckbox.click();
        await this.nextPanBtn.click();
    }
    async dateOfBirth(dob) {
        await this.dobField.setValue(dob);
    }
    async termsAndCondition() {
        await this.tncCheckbox.click();
    }
    async kycCheckbox() {
        await this.kycCheckbox.click();
    }
    async nextButton() {
        await this.nextPanBtn.click();
    }
}

export default new PanDetails();