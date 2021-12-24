export class Facility {
  public id: string;
  public name_en: string;
  public name_ms: string;
  public description_en: string;
  public description_ms: string;
  public facility_category: string;
  public facility_subcategory: string;
  public area_size: string;
  public max_capacity: number;
  public have_price: boolean;
  public pdf_link: string;
  public promo_link: string;
  public pic_id: string;
  public venue_id: string;
  public equipment_name_en: string;
  public equipment_name_ms: string;
  public equipment_description_en: string;
  public equipment_description_ms: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name_en: string,
    name_ms: string,
    description_en: string,
    description_ms: string,
    facility_category: string,
    facility_subcategory: string,
    area_size: string,
    max_capacity: number,
    have_price: boolean,
    pdf_link: string,
    promo_link: string,
    pic_id: string,
    venue_id: string,
    equipment_name_en: string,
    equipment_name_ms: string,
    equipment_description_en: string,
    equipment_description_ms: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name_en = name_en;
    this.name_ms = name_ms;
    this.description_en = description_en;
    this.description_ms = description_ms;
    this.facility_category = facility_category;
    this.facility_subcategory = facility_subcategory;
    this.area_size = area_size;
    this.max_capacity = max_capacity;
    this.have_price = have_price;
    this.pdf_link = pdf_link;
    this.promo_link = promo_link;
    this.pic_id = pic_id;
    this.venue_id = venue_id;
    this.equipment_name_en = equipment_name_en;
    this.equipment_name_ms = equipment_name_ms;
    this.equipment_description_en = equipment_description_en;
    this.equipment_description_ms = equipment_description_ms;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
