export class EmployeeDirectory {
  public id: string;
  public name: string;
  public position: string;
  public extension: string;
  public email: string;
  public department: string;
  public status: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    position: string,
    extension: string,
    email: string,
    department: string,
    status: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.extension = extension;
    this.email = email;
    this.department = department;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
