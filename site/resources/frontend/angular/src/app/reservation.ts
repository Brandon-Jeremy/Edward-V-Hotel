export class Reservation {
  id: number;
  date: string;
  time: string = '';
  numGuests: number;
  partySize: number;
  customerName: string;

  constructor(
    id: number,
    date: string,
    numGuests: number,
    partySize: number,
    customerName: string
  ) {
    this.id = id;
    this.date = date;
    this.numGuests = numGuests;
    this.partySize = partySize;
    this.customerName = customerName;
  }
}
