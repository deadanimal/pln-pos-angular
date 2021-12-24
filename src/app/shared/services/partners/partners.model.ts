export class Partner {
  public id: string;
  public name: string;
  public image_link: string;
  public status: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    image_link: string,
    status: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.image_link = image_link;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
