const {expect} = require('@playwright/test');


class NavBar{

    /** @param {import('@playwright/test').Page} page  */
    constructor(page){
        this.page = page;
        this.navbar = this.page.getByRole('navigation');
        this.events = this.navbar.getByRole('link',{name:/events/i});
        this.admin = this.navbar.getByRole('button',{name:/admin/i});
        this.adminManageEvents = this.navbar.getByRole('link',{name:/manage events/i});
    }

    async goToManageEvents(){
        await expect(this.navbar).toBeVisible();
        await this.admin.click();
        await expect(this.adminManageEvents).toBeVisible();
        await this.adminManageEvents.click();
    }

}

module.exports = NavBar;