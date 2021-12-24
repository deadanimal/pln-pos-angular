export class PublicationCategory {
  public id: string;
  public name_en: string;
  public name_ms: string;
  public icon: string;
  public status: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name_en: string,
    name_ms: string,
    icon: string,
    status: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name_en = name_en;
    this.name_ms = name_ms;
    this.icon = icon;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
