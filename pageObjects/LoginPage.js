class LoginPage{

     /** @param {import('@playwright/test').Page} page  */
    constructor(page){
        this.page = page;
        this.mailfield  = this.page.getByRole('textbox', {name :/email/i});
        this.pwd  = this.page.getByRole('textbox', {name :/password/i});
        this.btnSignIn  = this.page.getByRole('button', {name :/sign in/i});
    }

}

module.exports = LoginPage;