import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { EmailTemplatesService } from "src/app/shared/services/email-templates/email-templates.service";
import { FeedbacksService } from "src/app/shared/services/feedbacks/feedbacks.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { SurveyAnswersService } from "src/app/shared/services/survey-answers/survey-answers.service";
import { SurveyQuestionsService } from "src/app/shared/services/survey-questions/survey-questions.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-survey",
  templateUrl: "./survey.component.html",
  styleUrls: ["./survey.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SurveyComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  defaultModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog",
    backdrop: false,
    ignoreBackdropClick: true,
  };

  // FormGroup
  feedbackFormGroup: FormGroup;
  surveyFormGroup: FormGroup;

  // Data
  typeQuestion: string = "";
  module: string = "";
  module_code: string = "";
  surveyquestions = [];

  // Dropdown
  modules = [
    {
      value: "M01",
      display_name_ms: "Tayangan",
      display_name_en: "Showing",
    },
    {
      value: "M02",
      display_name_ms: "Pameran",
      display_name_en: "Exhibition",
    },
    {
      value: "M03",
      display_name_ms: "Program Pendidikan",
      display_name_en: "Educational Program",
    },
    {
      value: "M04",
      display_name_ms: "Keberkesanan",
      display_name_en: "Effectiveness",
    },
    {
      value: "M05",
      display_name_ms: "Kembara Simulasi",
      display_name_en: "Space Pod",
    },
    {
      value: "M06",
      display_name_ms: "Lawatan",
      display_name_en: "Visit",
    },
    {
      value: "M07",
      display_name_ms: "Kutubkhanah Mini/Penerbitan",
      display_name_en: "Kutubkhanah Mini/Publication",
    },
    {
      value: "M08",
      display_name_ms: "Fasiliti",
      display_name_en: "Facility",
    },
  ];
  module_feedbacks = [
    {
      value: "simulator-ride",
      display_name_en: "Space Pod",
      display_name_ms: "Kembara Simulasi",
    },
    {
      value: "shows",
      display_name_en: "Showing",
      display_name_ms: "Tayangan",
    },
    {
      value: "exhibit",
      display_name_en: "Exhibition",
      display_name_ms: "Pameran",
    },
    {
      value: "visit",
      display_name_en: "Visit",
      display_name_ms: "Lawatan",
    },
    {
      value: "program",
      display_name_en: "Educational Program",
      display_name_ms: "Program Pendidikan",
    },
    {
      value: "facility",
      display_name_en: "Facility",
      display_name_ms: "Fasiliti",
    },
    {
      value: "publication",
      display_name_en: "Publication",
      display_name_ms: "Penerbitan",
    },
    {
      value: "virtual-library",
      display_name_en: "Kutubkhanah Mini",
      display_name_ms: "Kutubkhanah Mini",
    },
  ];

  constructor(
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private authService: AuthService,
    private emailtemplateService: EmailTemplatesService,
    private feedbackService: FeedbacksService,
    private jwtService: JwtService,
    private surveyanswerService: SurveyAnswersService,
    private surveyquestionService: SurveyQuestionsService,
    private userService: UsersService,
    private w3cService: W3csService
  ) {
    this.surveyFormGroup = new FormGroup({});

    this.feedbackFormGroup = this.formBuilder.group({
      full_name: ["", Validators.required],
      email: ["", Validators.required],
      comment_user: ["", Validators.required],
      user_id: ["", Validators.required],
      module: ["", Validators.required],
      status: [false],
    });

    this.getUser();
  }

  getUser() {
    if (this.jwtService.getToken("accessToken")) {
      this.userService.get(this.authService.decodedToken().user_id).subscribe(
        (res) => {
          // console.log("res", res);
          this.feedbackFormGroup.patchValue({
            full_name: res.full_name,
            email: res.email,
          });
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  ngOnInit() {
    this.addMetaTag();

    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }

  openDefaultModal(modalDefault: TemplateRef<any>) {
    this.defaultModal = this.modalService.show(modalDefault, this.default);
  }

  chooseQuestion(question: string, module: string, module_code: string) {
    if (this.defaultModal) this.defaultModal.hide();
    this.typeQuestion = question;
    this.module = module;
    console.log("module", module);
    this.module_code = module_code;

    if (this.typeQuestion == "soalselidik") {
      this.surveyquestionService.get().subscribe(
        (res) => {
          // console.log("res", res);
          this.surveyquestions = res;
          let group = {};
          res.forEach((question) => {
            if (question.questionnaire_type == "CB") {
              group[question.questionnaire_fieldname] = this.arrayFormControl(
                question.questionnaire_answer
              );
            } else
              group[question.questionnaire_fieldname] = new FormControl("");
          });
          this.surveyFormGroup = new FormGroup(group);
          console.log(this.surveyFormGroup);
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  arrayFormControl(questionnaire_answer) {
    const arr = questionnaire_answer.map((element) => {
      return this.formBuilder.control(false);
    });

    return this.formBuilder.array(arr);
  }

  changeCheckbox(event, field_name) {
    console.log("event", event);
    console.log("field_name", field_name);
  }

  changeTab(event) {
    this.module = event.heading;
  }

  back() {
    this.typeQuestion = "";
  }

  submitSurvey() {
    if (this.jwtService.getToken("accessToken")) {
      for (let key in this.surveyFormGroup.value) {
        let answer = this.surveyFormGroup.value[key];
        let surveyquestion = this.surveyquestions.find((obj) => {
          return obj.questionnaire_fieldname == key;
        });

        let postObj = {
          answer: answer.toString(),
          survey_question_id: surveyquestion.id,
          user_id: this.authService.decodedToken().user_id,
        };

        this.surveyanswerService.post(postObj).subscribe(
          (res) => {
            console.log("res", res);
          },
          (err) => {
            console.error("err", err);
          },
          () => {
            swal
              .fire({
                icon: "success",
                title: "Terima kasih atas kerjasama yang diberikan",
                buttonsStyling: false,
                confirmButtonText: "Tutup",
                customClass: {
                  confirmButton: "btn btn-success",
                },
              })
              .then((result) => {
                if (result.value) {
                  this.typeQuestion = "";
                }
              });
          }
        );
      }
    } else {
      this.toastr.error(
        "Harap maaf. Anda perlu log masuk terlebih dahulu untuk menghantar soal selidik anda.",
        "Ralat"
      );
    }
  }

  submitFeedback() {
    if (this.jwtService.getToken("accessToken")) {
      this.feedbackFormGroup.value.user_id = this.authService.decodedToken().user_id;

      this.feedbackService.post(this.feedbackFormGroup.value).subscribe(
        (res) => {
          console.log("res", res);
          swal
            .fire({
              icon: "success",
              title: "Terima kasih atas kerjasama yang diberikan",
              text: "Maklum balas anda akan dibalas dalam waktu 3 hari bekerja",
              buttonsStyling: false,
              confirmButtonText: "Tutup",
              customClass: {
                confirmButton: "btn btn-success",
              },
            })
            .then((result) => {
              if (result.value) {
                this.typeQuestion = "";
              }
            });

          let obj = {
            code: "EMEL01",
            to: this.authService.decodedToken().email,
            context: null, //JSON.stringify({ name: this.authService.decodedToken().full_name }),
          };
          this.emailtemplateService.sending_mail(obj).subscribe(
            (res) => {
              console.log("res", res);
            },
            (err) => {
              console.error("err", err);
            }
          );
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else {
      this.toastr.error(
        "Harap maaf. Anda perlu log masuk terlebih dahulu untuk menghantar maklum balas / aduan anda.",
        "Ralat"
      );
    }
  }

  addMetaTag() {
    this.metaTagService.addTags([
      { name: "og:title", content: this.route.snapshot.data["title"] },
      {
        name: "og:description",
        content: this.route.snapshot.data["description"],
      },
      { name: "og:url", content: this.route.snapshot.data["url"] },
      { name: "og:site_name", content: this.route.snapshot.data["site_name"] },
      {
        name: "og:image",
        content: this.route.snapshot.data["image"],
      },
      {
        name: "twitter:card",
        content: this.route.snapshot.data["twitter_card"],
      },
      {
        name: "twitter:description",
        content: this.route.snapshot.data["twitter_description"],
      },
      {
        name: "twitter:title",
        content: this.route.snapshot.data["twitter_title"],
      },
      {
        name: "twitter:image",
        content: this.route.snapshot.data["twitter_image"],
      },
      {
        name: "twitter:url",
        content: this.route.snapshot.data["twitter_url"],
      },
    ]);
  }
}
