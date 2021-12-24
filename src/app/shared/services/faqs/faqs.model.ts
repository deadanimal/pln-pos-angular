export class Faq {
  public id: string;
  public question_en: string;
  public answer_en: string;
  public question_ms: string;
  public answer_ms: string;
  public order: number;
  public status: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    question_en: string,
    answer_en: string,
    question_ms: string,
    answer_ms: string,
    order: number,
    status: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.question_en = question_en;
    this.answer_en = answer_en;
    this.question_ms = question_ms;
    this.answer_ms = answer_ms;
    this.order = order;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
