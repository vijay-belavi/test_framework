class welcomeScreen {
    get createAccountBtn() { return $('Create Account'); }
    get loginBtn() { return $('Log in'); }

    async createAccountButton() {
        await this.createAccountBtn.click();
    }
    async loginButton() {
        await this.loginBtn.click();
    }

}