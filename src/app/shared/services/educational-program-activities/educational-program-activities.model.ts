export class EducationalProgramActivity {
  public id: string;
  public program_activity: string;
  public program_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    program_activity: string,
    program_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.program_activity = program_activity;
    this.program_id = program_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
