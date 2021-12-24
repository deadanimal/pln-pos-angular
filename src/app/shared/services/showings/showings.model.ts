export class Showing {
  public id: string;
  public title_en: string;
  public description_en: string;
  public title_ms: string;
  public description_ms: string;
  public genre: string;
  public language: string;
  public duration_hours: number;
  public duration_minutes: number;
  public poster_link: string;
  public trailer_link: string;
  public status: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    title_en: string,
    description_en: string,
    title_ms: string,
    description_ms: string,
    genre: string,
    language: string,
    duration_hours: number,
    duration_minutes: number,
    poster_link: string,
    trailer_link: string,
    status: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title_en = title_en;
    this.description_en = description_en;
    this.title_ms = title_ms;
    this.description_ms = description_ms;
    this.genre = genre;
    this.language = language;
    this.duration_hours = duration_hours;
    this.duration_minutes = duration_minutes;
    this.poster_link = poster_link;
    this.trailer_link = trailer_link;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
