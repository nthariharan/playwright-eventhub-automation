const userData = require('../testData/userdata.json');

class AdminEvents{

    /** @param {import("@playwright/test").Page} page  */
    constructor(page){
        this.page = page;
        this.eventTitle = userData.eventTitle + String(Date.now());
        this.txt_eventTitle = this.page.getByRole('textbox',{name: /title/i});
        this.txt_describeEvent = this.page.getByRole('textbox',{name: /describe the event/i});
        this.city = this.page.getByRole('textbox',{name: /city/i});
        this.venue = this.page.getByRole('textbox',{name: /venue/i});
        this.dateTime = this.page.getByRole('textbox',{name: /event date & time/i});
        this.price = this.page.getByRole('spinbutton',{name: /price/i});
        this.seats = this.page.getByRole('spinbutton',{name: /total seats/i});
        this.btn_addEvent = this.page.getByRole('button',{name: /add event/i});
    }

    async fillEventDetails() {
        await this.txt_eventTitle.fill(this.eventTitle);
        await this.txt_describeEvent.fill(userData.eventDescription);
        await this.city.fill(userData.city);
        await this.venue.fill(userData.venue);
        await this.dateTime.fill(userData.dateTime);
        await this.price.fill(userData.price);
        await this.seats.fill(userData.seats);
        await this.btn_addEvent.click();
    }


}

module.exports = AdminEvents;