export class CashTransactions {
  public id: string;
  public user_id: string;
  public amount_receive: string;
  public amount_change: string;
  public summary: string;
  public created_date: string;
  public modified_date: string;

  constructor(
  id: string,
  user_id: string,
  amount_receive: string,
  amount_change: string,
  summary: string,
  created_date: string,
  modified_date: string,
  ) {

  this.id = id;
  this.user_id = user_id;
  this.amount_receive = amount_receive;
  this.amount_change = amount_change;
  this.summary = summary;
  this.created_date = created_date;
  this.modified_date = modified_date;

  }
}
