export class FacilitySubcategory {
  public id: string;
  public code: string;
  public name_en: string;
  public name_ms: string;
  public image_link: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    code: string,
    name_en: string,
    name_ms: string,
    image_link: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.code = code;
    this.name_en = name_en;
    this.name_ms = name_ms;
    this.image_link = image_link;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
