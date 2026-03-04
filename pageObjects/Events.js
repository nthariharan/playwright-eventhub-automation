const NavBar = require('./components/NavBar');

class Events{

     /** @param {import('@playwright/test').Page} page  */
    constructor(page){
        this.page = page;
        this.navbar = new NavBar(page);
        this.eventCards = this.page.locator('[data-testid="event-card"]');
    }

    async getEvent(eventTitle){
        const currentEvent = this.eventCards.filter({hasText : eventTitle});
        return (currentEvent, currentEvent.getByRole('link',{name: /book now/i}));
    }

    async getAvailableSeats(){
        const seatText = await this.newEvent.getByText(/seats available/i).textContent();
        return (Number(seatText.split(/\s*seats available/)[0]));
    }

}

module.exports = Events;