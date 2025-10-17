class panScreen {
    get panInput() { return $('testEnterPAN'); }
    get dobInput() { return $('testEnterDOB'); }
    get tncCheckbox() { return $('testTapCheckBoxTnC'); }
    get kycCheckbox() { return $('testTapCheckBoxKYC'); }    
    get nextPanBtn() { return $('testTapNextButtonPan'); }
    get panErrorMsg() { return $('testCheckPanError'); }
    get dobErrorMsg() { return $('testCheckErrorText'); }

    async panDetails(panNumber) {
        await this.panInput.setValue(panNumber);
    }
    async dobDetails(dob) {
        await this.dobInput.setValue(dob);       
    }
    async tncCheckboxClick() {
        await this.tncCheckbox.click();       
    }
    async kycCheckboxClick() {
        await this.kycCheckbox.click();
    }
    async nextPanButton() {
        await this.nextPanBtn.click();
    }
    async panErrorMessage() {
        return await this.panErrorMsg.getText();
    }
    async dobErrorMessage() {
        return await this.dobErrorMsg.getText();
    }
}