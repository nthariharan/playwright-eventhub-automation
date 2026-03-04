const NavBar = require('./components/NavBar');

class Dashboard{

    /** @param {import('@playwright/test').Page} page  */
    constructor(page){
        this.page = page;
        this.navbar = new NavBar(page);
        this.linkBrowseEvents = this.page.getByRole('link',{name:/browse events/i}).first();
    }

}

module.exports = Dashboard;