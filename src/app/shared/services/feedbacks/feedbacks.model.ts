export class Feedback {
  public id: string;
  public comment_user: string;
  public comment_admin: string;
  public user_id: string;
  public status: boolean;
  public display: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    comment_user: string,
    comment_admin: string,
    user_id: string,
    status: boolean,
    display: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.comment_user = comment_user;
    this.comment_admin = comment_admin;
    this.user_id = user_id;
    this.status = status;
    this.display = display;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
