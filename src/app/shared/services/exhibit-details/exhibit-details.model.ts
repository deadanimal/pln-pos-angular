export class ExhibitDetail {
  public id: string;
  public name_en: string;
  public description_en: string;
  public name_ms: string;
  public description_ms: string;
  public video_link: string;
  public venue_id: string;
  public qrcode: string;
  public status: string;
  public exhibit_list_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name_en: string,
    description_en: string,
    name_ms: string,
    description_ms: string,
    video_link: string,
    venue_id: string,
    qrcode: string,
    status: string,
    exhibit_list_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name_en = name_en;
    this.description_en = description_en;
    this.name_ms = name_ms;
    this.description_ms = description_ms;
    this.video_link = video_link;
    this.venue_id = venue_id;
    this.qrcode = qrcode;
    this.status = status;
    this.exhibit_list_id = exhibit_list_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
