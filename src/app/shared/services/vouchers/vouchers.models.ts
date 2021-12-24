export class Voucher {
  public id: string;
  public voucher_code: string;
  public voucher_amount: number;
  public validity_until: any;
  public description: string;
  public status: string;
  public user: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    voucher_code: string,
    voucher_amount: number,
    validity_until: any,
    description: string,
    status: string,
    user: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.voucher_code = voucher_code;
    this.voucher_amount = voucher_amount;
    this.validity_until = validity_until;
    this.description = description;
    this.status = status;
    this.user = user;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
