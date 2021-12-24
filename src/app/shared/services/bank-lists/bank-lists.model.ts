export class BankList {
  public id: string;
  public bank_id: string;
  public bank_name: string;
  public bank_display_name: string;
  public bank_active: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    bank_id: string,
    bank_name: string,
    bank_display_name: string,
    bank_active: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.bank_id = bank_id;
    this.bank_name = bank_name;
    this.bank_display_name = bank_display_name;
    this.bank_active = bank_active;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
