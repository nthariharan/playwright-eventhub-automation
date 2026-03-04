const NavBar = require('./components/NavBar');

class Bookings{

    constructor(page){
        this.page = page;
        this.navbar = new NavBar(page);
        this.bookingCards = this.page.locator('[data-testid="booking-card"]');
    }

    async getBookingCard(bookingRefNum){
        this.currentBooking = this.bookingCards.filter({hasText : bookingRefNum});
        this.bookingEventTitle = this.currentBooking.getByRole('heading');
    }

}

module.exports = Bookings;