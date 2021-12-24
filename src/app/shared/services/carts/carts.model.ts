export class Cart {
  public id: string;
  public cart_status: string;
  public user: string;
  public show_booking_id: string;
  public simulator_ride_booking_id: string;
  public facility_booking_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    cart_status: string,
    user: string,
    show_booking_id: string,
    simulator_ride_booking_id: string,
    facility_booking_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.cart_status = cart_status;
    this.user = user;
    this.show_booking_id = show_booking_id;
    this.simulator_ride_booking_id = simulator_ride_booking_id;
    this.facility_booking_id = facility_booking_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
