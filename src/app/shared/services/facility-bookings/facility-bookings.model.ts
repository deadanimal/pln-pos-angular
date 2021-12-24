export class FacilityBooking {
  public id: string;
  public title: string;
  public user_id: string;
  public pic_id: string;
  public facility_id: string;
  public status: string;
  public organisation_name: string;
  public organisation_category: string;
  public booking_date: string;
  public booking_days: string;
  public number_of_people: number;
  public total_price: number;
  public want_equipment: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    title: string,
    user_id: string,
    pic_id: string,
    facility_id: string,
    status: string,
    organisation_name: string,
    organisation_category: string,
    booking_date: string,
    booking_days: string,
    number_of_people: number,
    total_price: number,
    want_equipment: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title = title;
    this.user_id = user_id;
    this.pic_id = pic_id;
    this.facility_id = facility_id;
    this.status = status;
    this.organisation_name = organisation_name;
    this.organisation_category = organisation_category;
    this.booking_date = booking_date;
    this.booking_days = booking_days;
    this.number_of_people = number_of_people;
    this.total_price = total_price;
    this.want_equipment = want_equipment;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
