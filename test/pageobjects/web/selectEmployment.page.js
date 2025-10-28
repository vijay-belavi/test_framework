class selectEmployment {
    get salariedOption() { return $('//div[contains(text(),"Salaried")]'); }
    get salariedOption() { return $('//div[contains(text(),"Self employement")]'); }
    get confirmBtn() { return $('//div[@data-testid="testPressPositiveButton"]'); }
    
    async selectSalaried() {
        await this.salariedOption.click();
    }
    async selectSelfEmployement() {
        await this.selfEmployementOption.click();
    }
    async confirmSelection() {
        await this.confirmBtn.click();
    }
}
export default new selectEmployment();