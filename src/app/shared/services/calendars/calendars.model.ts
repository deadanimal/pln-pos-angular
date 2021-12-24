export class Calendar {
  public id: string;
  public date_start: string;
  public date_end: string;
  public description_en: string;
  public description_ms: string;
  public activity_cancellation: string;
  public status: boolean;
  public frequency: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    date_start: string,
    date_end: string,
    description_en: string,
    description_ms: string,
    activity_cancellation: string,
    status: boolean,
    frequency: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.date_start = date_start;
    this.date_end = date_end;
    this.description_en = description_en;
    this.description_ms = description_ms;
    this.activity_cancellation = activity_cancellation;
    this.status = status;
    this.frequency = frequency;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
