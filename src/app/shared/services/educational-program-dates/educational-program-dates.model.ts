export class EducationalProgramDate {
  public id: string;
  public program_date: string;
  public program_id: any;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    program_date: string,
    program_id: any,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.program_date = program_date;
    this.program_id = program_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
