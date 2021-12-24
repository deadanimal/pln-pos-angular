export class QuickLink {
  public id: string;
  public name_en: string;
  public name_ms: string;
  public link: string;
  public category: string;
  public status: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name_en: string,
    name_ms: string,
    link: string,
    category: string,
    status: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name_en = name_en;
    this.name_ms = name_ms;
    this.link = link;
    this.category = category;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
