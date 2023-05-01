export class Reservation {
  id: number;
  date: string = '';
  time: string = '';
  numGuests: number;
  partySize: number;
  customerName: string = '';
  date_from: string = '';
  date_to: string = '';
  room_type: string = '';
  room_view: string = '';
  room_id: string = '';
  reservation_id: string = '';

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
