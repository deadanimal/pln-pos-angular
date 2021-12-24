export class EmailTemplate {
  public id: string;
  public name: string;
  public code: string;
  public subject: string;
  public body: string;
  public status: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    code: string,
    subject: string,
    body: string,
    status: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.subject = subject;
    this.body = body;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
