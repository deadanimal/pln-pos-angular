export class Refund {
  public id: string;
  public refund_running_no: string;
  public refund_type: string;
  public description: string;
  public amount: number;
  public acc_number: string;
  public bank_id: string;
  public remarks: string;
  public incharge_id: string;
  public incharge_datetime: string;
  public user: string;
  public status: string;
  public pic_verification_id: string;
  public pic_verification_datetime: string;
  public show_booking_id: string;
  public simulator_ride_booking_id: string;
  public facility_booking_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    refund_running_no: string,
    refund_type: string,
    description: string,
    amount: number,
    acc_number: string,
    bank_id: string,
    remarks: string,
    incharge_id: string,
    incharge_datetime: string,
    user: string,
    status: string,
    pic_verification_id: string,
    pic_verification_datetime: string,
    show_booking_id: string,
    simulator_ride_booking_id: string,
    facility_booking_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.refund_running_no = refund_running_no;
    this.refund_type = refund_type;
    this.description = description;
    this.amount = amount;
    this.acc_number = acc_number;
    this.bank_id = bank_id;
    this.remarks = remarks;
    this.incharge_id = incharge_id;
    this.incharge_datetime = incharge_datetime;
    this.user = user;
    this.status = status;
    this.pic_verification_id = pic_verification_id;
    this.pic_verification_datetime = pic_verification_datetime;
    this.show_booking_id = show_booking_id;
    this.simulator_ride_booking_id = simulator_ride_booking_id;
    this.facility_booking_id = facility_booking_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
