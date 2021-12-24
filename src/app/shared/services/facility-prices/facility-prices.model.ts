export class FacilityPrice {
  public id: string;
  public facility_description_en: string;
  public facility_description_ms: string;
  public facility_price_half: number;
  public facility_price_full: number;
  public equipment: string;
  // public facility_days: string;
  public facility_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    facility_description_en: string,
    facility_description_ms: string,
    facility_price_half: number,
    facility_price_full: number,
    equipment: string,
    // facility_days: string,
    facility_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.facility_description_en = facility_description_en;
    this.facility_description_ms = facility_description_ms;
    this.facility_price_half = facility_price_half;
    this.facility_price_full = facility_price_full;
    this.equipment = equipment;
    // this.facility_days = facility_days;
    this.facility_id = facility_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
