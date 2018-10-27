class Ticket {
  constructor({ id, checkedIn }) {
    this.id = id;
    this.checkedIn = checkedIn;
  }
  checkIn() {
    this.checkedIn = true;
    // Send checkin to server
  }
  checkOut() {
    this.checkedIn = false;
    // Send checkout to server
  }
}

window.tickets = [new Ticket({ id: 'someTicket' }), new Ticket({ id: 'otherTicket' }), new Ticket({ id: 'oneMoreTicket' })];

export const tickets = {
  get: async id => {
    return window.tickets.find(ticket => ticket.id === id);
  },
  all: async () => {
    return window.tickets;
  }
};
