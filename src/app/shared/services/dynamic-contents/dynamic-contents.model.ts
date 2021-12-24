export class DynamicContent {
  public id: string;
  public title_en: string;
  public description_en: string;
  public title_ms: string;
  public description_ms: string;
  public category: string;
  public status: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    title_en: string,
    description_en: string,
    title_ms: string,
    description_ms: string,
    category: string,
    status: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title_en = title_en;
    this.description_en = description_en;
    this.title_ms = title_ms;
    this.description_ms = description_ms;
    this.category = category;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
