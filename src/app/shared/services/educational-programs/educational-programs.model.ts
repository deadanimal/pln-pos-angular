export class EducationalProgram {
  public id: string;
  public title_en: string;
  public description_en: string;
  public title_ms: string;
  public description_ms: string;
  public program_code: string;
  public program_type: string;
  public program_category: string;
  public program_subcategory: string;
  public program_opento_en: string;
  public program_opento_ms: string;
  public min_participant: number;
  public max_participant: number;
  public price: number;
  public poster_link: string;
  public website_link: string;
  public video_link: string;
  public attachment_link: string;
  public registration: boolean;
  public activity: boolean;
  public venue_id: string;
  public coordinator_id: string;
  public status: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    title_en: string,
    description_en: string,
    title_ms: string,
    description_ms: string,
    program_code: string,
    program_type: string,
    program_category: string,
    program_subcategory: string,
    program_opento_en: string,
    program_opento_ms: string,
    min_participant: number,
    max_participant: number,
    price: number,
    poster_link: string,
    website_link: string,
    video_link: string,
    attachment_link: string,
    registration: boolean,
    activity: boolean,
    venue_id: string,
    coordinator_id: string,
    status: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title_en = title_en;
    this.description_en = description_en;
    this.title_ms = title_ms;
    this.description_ms = description_ms;
    this.program_code = program_code;
    this.program_type = program_type;
    this.program_category = program_category;
    this.program_subcategory = program_subcategory;
    this.program_opento_en = program_opento_en;
    this.program_opento_ms = program_opento_ms;
    this.min_participant = min_participant;
    this.max_participant = max_participant;
    this.price = price;
    this.poster_link = poster_link;
    this.website_link = website_link;
    this.video_link = video_link;
    this.attachment_link = attachment_link;
    this.registration = registration;
    this.activity = activity;
    this.venue_id = venue_id;
    this.coordinator_id = coordinator_id;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
