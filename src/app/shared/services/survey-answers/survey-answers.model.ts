export class SurveyAnswer {
    public id: string
    public answer: string
    public survey_question_id: string
    public user_id: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        answer: string,
        survey_question_id: string,
        user_id: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.answer = answer
        this.survey_question_id = survey_question_id
        this.user_id = user_id
        this.created_date = created_date
        this.modified_date = modified_date
    }
}