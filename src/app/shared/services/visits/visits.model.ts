export class Visit {
  public id: string;
  public title: string;
  public description: string;
  public status: string;
  public image_link: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    title: string,
    description: string,
    status: string,
    image_link: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.image_link = image_link;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
