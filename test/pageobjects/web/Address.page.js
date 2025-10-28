class addressPage {
    get houseNumberTextField() { return $('//input[@data-testid="testAddressScreenFloorInput"]'); }
    get streetNameTextField() { return $('//input[@data-testid="testAddressScreenStreetInput"]'); }    
    get pinCodeTextField() { return $('//input[@data-testid="testAddressScreenPincodeInput"]'); }
    get landMarkTextField() { return $('//input[@data-testid="testAddressScreenLandmarkInput"]'); }
    get addressContinueBtn() { return $('//div[@data-testid="testAddressScreenConfirmButton"]'); }  
    
    async houseNumberDetails(houseNumber) {
        await this.houseNumberTextField.setValue(houseNumber);
    }
    async streetNameDetails(streetName) {
        await this.streetNameTextField.setValue(streetName);
    }
    async pinCodeDetails(pinCode) {
        await this.pinCodeTextField.setValue(pinCode);
    }
    async landMarkDetails(landMark) {
        await this.landMarkTextField.setValue(landMark);
    }
    async addressContinueButton() {
        await this.addressContinueBtn.click();
    }
}  