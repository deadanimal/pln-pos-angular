export class SimulatorRide {
  public id: string;
  public image_link: string;
  public title: string;
  public description: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    image_link: string,
    title: string,
    description: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.image_link = image_link;
    this.title = title;
    this.description = description;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
