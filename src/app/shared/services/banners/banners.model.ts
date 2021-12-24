export class Banner {
  public id: string;
  public title: string;
  public description: string;
  public image_link: string;
  public status: boolean;
  public program_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    title: string,
    description: string,
    image_link: string,
    status: boolean,
    program_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image_link = image_link;
    this.status = status;
    this.program_id = program_id;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
