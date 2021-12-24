export class VisitApplication {
  public id: string;
  public organisation_name: string;
  public organisation_category: string;
  public visit_date: string;
  public visit_time: string;
  public total_participant: number;
  public customer_id: string;
  public pic_id: string;
  public tour_guide: boolean;
  public status: string;
  public other_activities: string;
  public document_link: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    organisation_name: string,
    organisation_category: string,
    visit_date: string,
    visit_time: string,
    total_participant: number,
    customer_id: string,
    pic_id: string,
    tour_guide: boolean,
    status: string,
    other_activities: string,
    document_link: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.organisation_name = organisation_name;
    this.organisation_category = organisation_category;
    this.visit_date = visit_date;
    this.visit_time = visit_time;
    this.total_participant = total_participant;
    this.customer_id = customer_id;
    this.pic_id = pic_id;
    this.tour_guide = tour_guide;
    this.status = status;
    this.other_activities = other_activities;
    this.document_link = document_link;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
