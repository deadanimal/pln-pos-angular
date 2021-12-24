export class QuickLinkCategory {
  public id: string;
  public name_en: string;
  public name_ms: string;
  public order: number;
  public status: boolean;
  public show: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name_en: string,
    name_ms: string,
    order: number,
    status: boolean,
    show: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name_en = name_en;
    this.name_ms = name_ms;
    this.order = order;
    this.status = status;
    this.show = show;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
