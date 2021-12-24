import { Pipe, PipeTransform } from "@angular/core";

import { SurveyQuestion } from "./survey-question";

@Pipe({
  name: "surveyquestionfilter",
  pure: false,
})
export class SurveyQuestionFilterPipe implements PipeTransform {
  transform(items: SurveyQuestion[], filter: SurveyQuestion): SurveyQuestion[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: SurveyQuestion) => this.applyFilter(item, filter));
  }

  /**
   * Perform the filtering.
   *
   * @param {SurveyQuestion} survey question The survey question to compare to the filter.
   * @param {SurveyQuestion} filter The filter to apply.
   * @return {boolean} True if survey question satisfies filters, false if not.
   */
  applyFilter(surveyquestion: SurveyQuestion, filter: SurveyQuestion): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === "string") {
          if (
            surveyquestion[field]
              .toLowerCase()
              .indexOf(filter[field].toLowerCase()) === -1
          ) {
            return false;
          }
        } else if (typeof filter[field] === "number") {
          if (surveyquestion[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
