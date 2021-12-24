export class Showbooking {
  public id: string;
  public ticket_type: string;
  public ticket_category: string;
  public ticket_quantity: number;
  public ticket_number: string;
  public ticket_seat: string;
  public price: number;
  public total_price: number;
  public show_id: string;
  public showtime_id: string;
  public user_id: string;
  public status: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    ticket_type: string,
    ticket_category: string,
    ticket_quantity: number,
    ticket_number: string,
    ticket_seat: string,
    price: number,
    total_price: number,
    show_id: string,
    showtime_id: string,
    user_id: string,
    status: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.ticket_type = ticket_type;
    this.ticket_category = ticket_category;
    this.ticket_quantity = ticket_quantity;
    this.ticket_number = ticket_number;
    this.ticket_seat = ticket_seat;
    this.price = price;
    this.total_price = total_price;
    this.show_id = show_id;
    this.showtime_id = showtime_id;
    this.user_id = user_id;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
