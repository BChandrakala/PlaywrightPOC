const testData = require('../../utils/testData/magentoPracticeSite/testData.json');
class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.signInLink = page.getByRole('link', { name: 'Sign In' });
        this.email = page.locator('#email');
        this.password = page.getByLabel('Password');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.welcomeText = page.locator('header span.logged-in');
        this.errorMsg = page.locator(".error.message");
    } 

    async login(email, password) {
        await this.email.type(email);
        await this.password.fill(password);
        await this.signInButton.click();
    }

}
module.exports = {LoginPage};