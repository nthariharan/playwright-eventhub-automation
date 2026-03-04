const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');
const Dashboard = require('../pageObjects/Dashboard');
const AdminEvents = require('../pageObjects/AdminEvents');
const Events = require('../pageObjects/Events');
const BookTicket = require('../pageObjects/BookTicket');
const Bookings = require('../pageObjects/Bookings');

test("Create Event & Book Seat", async ({ page }) => {

    const loginpage = new LoginPage(page);
    const dashboard = new Dashboard(page);
    const adminEvents = new AdminEvents(page);
    const events = new Events(page);
    const bookTicket = new BookTicket(page);
    const bookings = new Bookings(page);

    //Login
    await page.goto('/',{waitUntil:'load'});
    await loginpage.mailfield.fill(process.env.MAILID);
    await loginpage.pwd.fill(process.env.PWD);
    await loginpage.btnSignIn.click();

    //Manage Events
    await page.waitForLoadState('load');
    await expect(dashboard.linkBrowseEvents).toBeVisible();
    await dashboard.navbar.goToManageEvents();

    //Fill Event Details
    await expect(page).toHaveURL(/.*\/admin\/events/);
    await adminEvents.fillEventDetails();
    await expect(page.getByText('Event Created!')).toBeVisible(); //Assertion placed in test . Not in POM as prev.

    //Book Seat for the new event
    await events.navbar.events.click();
    await expect(events.eventCards.first()).toBeVisible();

    const[currentEvent,btnBookNow] = await events.getEvent(adminEvents.eventTitle);
    await expect(currentEvent).toBeVisible();
    await events.getAvailableSeats();
    await btnBookNow.click();

    //Enter user details, book a seat & Get the reference number
    await expect(bookTicket.eventGrid.last()).toBeVisible();
    await expect(bookTicket.ticketCount).toHaveText('1');
    await bookTicket.fillBookingDetails();
    await expect(bookTicket.bookingConfirmedText).toBeVisible();
    await bookTicket.getBookingReference();
    await bookTicket.btnMyBookings.click();

    //Verify bookings made is for the same event
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(/.*\/events/);
    await page.waitForLoadState('domcontentloaded');
    await expect(events.newEvent).toBeVisible();
    await expect(events.newEvent.getByText(/seats available/i))
        .toHaveText(`${events.seatsBeforeBooking-1} seats available`,
            {timeout : 20_000});
});