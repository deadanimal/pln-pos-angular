export class SimulatorRideBooking {
  public id: string;
  public booking_date: string;
  public simulator_ride_time_id: string;
  public ticket_type: string;
  public ticket_category: string;
  public ticket_quantity: number;
  public ticket_number: number;
  public price: number;
  public total_price: number;
  public user_id: string;
  public status: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    booking_date: string,
    simulator_ride_time_id: string,
    ticket_type: string,
    ticket_category: string,
    ticket_quantity: number,
    ticket_number: number,
    price: number,
    total_price: number,
    user_id: string,
    status: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.booking_date = booking_date;
    this.simulator_ride_time_id = simulator_ride_time_id;
    this.ticket_type = ticket_type;
    this.ticket_category = ticket_category;
    this.ticket_quantity = ticket_quantity;
    this.ticket_number = ticket_number;
    this.price = price;
    this.total_price = total_price;
    this.user_id = user_id;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
