export class TicketPrice {
  public id: string;
  public title_en: string;
  public title_ms: string;
  public price_citizen: number;
  public price_noncitizen: number;
  public ticket_category: string;
  public module: string;
  public status: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    title_en: string,
    title_ms: string,
    price_citizen: number,
    price_noncitizen: number,
    ticket_category: string,
    module: string,
    status: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title_en = title_en;
    this.title_ms = title_ms;
    this.price_citizen = price_citizen;
    this.price_noncitizen = price_noncitizen;
    this.ticket_category = ticket_category;
    this.module = module;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
