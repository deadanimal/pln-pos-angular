export class EducationalProgramImage {
  public id: string;
  public program_image: string;
  public program_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    program_image: string,
    program_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.program_image = program_image;
    this.program_id = program_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
