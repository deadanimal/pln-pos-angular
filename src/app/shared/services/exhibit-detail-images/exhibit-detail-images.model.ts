export class ExhibitDetailImage {
  public id: string;
  public exhibit_detail_image: string;
  public exhibit_detail_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    exhibit_detail_image: string,
    exhibit_detail_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.exhibit_detail_image = exhibit_detail_image;
    this.exhibit_detail_id = exhibit_detail_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
