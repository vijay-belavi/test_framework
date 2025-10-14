class l1_limit_Page {
    // Define selectors using getter methods
    get acceptL1Button() { return $('//div[@data-testid="acceptAndContinue"]'); }
    get higherLimitButton () { return $('//div[@data-testid="testHigherLimitButton"]'); }
    async acceptL1Limit() {
        await this.acceptL1Button.waitForClickable({ timeout: 10000 });
        await this.acceptL1Button.click();
    }
    async clickHigherLimit() {
        await this.higherLimitButton.waitForClickable({ timeout: 10000 });
        await this.higherLimitButton.click();
    }
}