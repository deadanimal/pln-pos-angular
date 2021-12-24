export class SurveyQuestion {
  public id: string;
  public questionnaire_fieldname: string;
  public questionnaire_question_en: string;
  public questionnaire_question_ms: string;
  public questionnaire_type: string;
  public questionnaire_answer: string;
  public questionnaire_module: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    questionnaire_fieldname: string,
    questionnaire_question_en: string,
    questionnaire_question_ms: string,
    questionnaire_type: string,
    questionnaire_answer: string,
    questionnaire_module: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.questionnaire_fieldname = questionnaire_fieldname;
    this.questionnaire_question_en = questionnaire_question_en;
    this.questionnaire_question_ms = questionnaire_question_ms;
    this.questionnaire_type = questionnaire_type;
    this.questionnaire_answer = questionnaire_answer;
    this.questionnaire_module = questionnaire_module;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
