const NavBar = require('./components/NavBar');

class Events {

    /** @param {import('@playwright/test').Page} page  */
    constructor(page) {
        this.page = page;
        this.navbar = new NavBar(page);
        this.eventCards = this.page.locator('[data-testid="event-card"]');
    }

    async getEvent(eventTitle) {
        const currEvent = this.eventCards.filter({ hasText: eventTitle });
        return ({
            currentEvent: currEvent,
            btnBookNow: currEvent.getByRole('link', { name: /book now/i })
        });
    }

    async getAvailableSeats(currentEvent){
            const seatText = await currentEvent.getByText(/seats available/i).textContent();
            return (Number(seatText.split(/\s*seats available/)[0]));
        }

    }

module.exports = Events;