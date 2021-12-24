export class FacilityImage {
  public id: string;
  public facility_image: string;
  public facility_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    facility_image: string,
    facility_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.facility_image = facility_image;
    this.facility_id = facility_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
