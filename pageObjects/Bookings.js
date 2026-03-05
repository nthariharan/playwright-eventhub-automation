const NavBar = require('./components/NavBar');

class Bookings{

    constructor(page){
        this.page = page;
        this.navbar = new NavBar(page);
        this.bookingCards = this.page.locator('[data-testid="booking-card"]');
    }

    async getBookingCard(bookingRefNum){
        const currBooking = this.bookingCards.filter({hasText : bookingRefNum});
        return({
            currentBooking : currBooking,
            bookingEventTitle : currBooking.getByRole('heading')
        });
    }

}

module.exports = Bookings;