const userData = require('../testData/userdata.json');

class BookTicket{

    /*** @param {import('@playwright/test').Page} page  */
    constructor(page){
        this.page = page;
        this.eventGrid = this.page.locator('.grid');
        this.ticketCount = this.page.locator('#ticket-count');
        this.name = this.page.getByRole('textbox',{name: /full name/i});
        this.email = this.page.getByRole('textbox',{name: /email/i});
        this.phone = this.page.getByRole('textbox',{name: /phone/i});
        this.btnConfirm = this.page.getByRole('button',{name : /confirm booking/i});
        this.bookingConfirmedText = this.page.getByText('Booking Confirmed');
        this.btnMyBookings = this.page.getByRole('button',{name : /view my bookings/i});
    }

    async fillBookingDetails() {
        await this.name.fill(userData.name);
        await this.email.fill(userData.email);
        await this.phone.fill(userData.phone);
        await this.btnConfirm.click();
    }

    async getBookingReference(){
        return (await this.page.locator('.booking-ref').textContent() );
    }


}

module.exports = BookTicket;