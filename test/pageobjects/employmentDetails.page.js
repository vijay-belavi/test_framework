class employementDetails {
    get personalEmailCheckbox() { return $('//div[@data-testid="testTapExistedEmail"]'); }
    get companyNameTextfield() { return $('//div[@data-testid="testTapOrgName"]'); }
    get searchCompanyField() { return $('//input[@data-testid="testEnterOrgName"]'); }
    get salaryField() { return $('//input[@data-testid="testEnterMonthlyIncome"]'); }
    get familyIncomeDropdown() { return $('//div[@data-testid="testTapFamilyIncome"]'); }
    get employementContinueBtn() { return $('//div[@data-testid="testTapNextButtonWorkDetails"]'); }


    async personalEmailCheckboxClick() {
        await this.personalEmailCheckbox.click();
    }
    async companyNameTextfield() {  
        await this.companyNameTextfield.click();
    }
    async searchCompanyField(company) {
        await this.searchCompanyField.setValue(company);
    }
    async salaryField(salary) {
        await this.salaryField.setValue(salary);
    }   
    async familyIncomeDropdown() {
        await this.familyIncomeDropdown.click();
    }     
    async employementContinueBtn() {
        await this.employementContinueBtn.click();
    }
}
export default new employementDetails();