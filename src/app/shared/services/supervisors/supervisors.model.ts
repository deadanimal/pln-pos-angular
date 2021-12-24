export class Supervisors {
  public id: string;
  public date_on_duty: string;
  public created_date: string;
  public modified_date: string;
  public user: any;

  constructor(
    id: string,
    date_on_duty: string,
    created_date: string,
    modified_date: string,
    user: any,

  ) {
    this.id = id;
    this.date_on_duty = date_on_duty;
    this.created_date = created_date;
    this.modified_date = modified_date;
    this.user = user;

  }
}
