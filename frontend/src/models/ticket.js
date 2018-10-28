class Ticket {
  constructor({ address, status, salt }) {
    this.address = address;
    this.salt = salt;
    this.status = status;
  }
  async checkIn() {
    this.status = 'confirmed';
    const data = { address: this.address };
    return fetch('/api/tickets/confirm', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data)
    }).then(() => {
      console.log('GOT THE CHECKIN RESULT');
    });
  }
  checkOut() {
    this.confirmed = 'unconfirmed';
    // Send checkout to server
  }
}

export const tickets = {
  get: async address => {
    console.log('ADDRESS IS', address);
    return fetch('/api/tickets', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
      .then(response => response.json())
      .then(response => {
        const ticket = response.find(ticket => ticket.address === address);
        console.log('TICKET', ticket);
        return new Ticket({ address: ticket.address, status: ticket.status, amount: ticket.amount, salt: ticket.salt });
      });
  },
  all: async () => {
    return fetch('/api/tickets', { method: 'GET', headers: { 'Content-Type': 'application/json; charset=utf-8' } })
      .then(response => response.json())
      .then(response => {
        return response.map(ticket => new Ticket({ address: ticket.address, status: ticket.status, amount: ticket.amount, salt: ticket.salt }));
      });
  }
};
