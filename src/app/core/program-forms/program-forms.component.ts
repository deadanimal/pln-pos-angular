import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { EmailTemplatesService } from "src/app/shared/services/email-templates/email-templates.service";
import { EducationalProgramFormsService } from "src/app/shared/services/educational-program-forms/educational-program-forms.service";
import { EducationalProgramsService } from "src/app/shared/services/educational-programs/educational-programs.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-program-forms",
  templateUrl: "./program-forms.component.html",
  styleUrls: ["./program-forms.component.scss"],
})
export class ProgramFormsComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // FormGroup
  zeroFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  // Data
  program_id: string;
  program = [];

  // Dropdown
  religions = [
    {
      value: "IS",
      display_name: "Islam",
    },
    {
      value: "HD",
      display_name: "Hindu",
    },
    {
      value: "BD",
      display_name: "Buddha",
    },
    {
      value: "CT",
      display_name: "Christian",
    },
    {
      value: "OT",
      display_name: "Other",
    },
  ];
  genders = [
    {
      value: "FM",
      display_name_en: "Female",
      display_name_ms: "Perempuan",
    },
    {
      value: "ML",
      display_name_en: "Male",
      display_name_ms: "Lelaki",
    },
  ];
  citizenships = [
    {
      value: "CZ",
      display_name_en: "Citizen",
      display_name_ms: "Warganegara",
    },
    {
      value: "NC",
      display_name_en: "Non-Citizen",
      display_name_ms: "Bukan Warganegara",
    },
  ];
  maritalstatuses = [
    {
      value: "S",
      display_name_en: "Single",
      display_name_ms: "Bujang",
    },
    {
      value: "M",
      display_name_en: "Married",
      display_name_ms: "Kahwin",
    },
  ];
  tshirtsizes = [
    {
      value: "S",
      display_name: "S",
    },
    {
      value: "M",
      display_name: "M",
    },
    {
      value: "L",
      display_name: "L",
    },
    {
      value: "XL",
      display_name: "XL",
    },
    {
      value: "2XL",
      display_name: "2XL",
    },
    {
      value: "3XL",
      display_name: "3XL",
    },
  ];
  truefalses = [
    {
      value: "true",
      display_name_en: "Yes",
      display_name_ms: "Ya",
    },
    {
      value: "false",
      display_name_en: "No",
      display_name_ms: "Tidak",
    },
  ];

  constructor(
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private emailtemplateService: EmailTemplatesService,
    private eduprogramService: EducationalProgramsService,
    private eduprogramformService: EducationalProgramFormsService,
    private w3cService: W3csService
  ) {
    this.zeroFormGroup = this.formBuilder.group({
      educational_program_id: new FormControl(""),
      customer_id: new FormControl(""),
      status: new FormControl("IP"),
    });

    this.firstFormGroup = this.formBuilder.group({
      teacher_name: new FormControl(""),
      teacher_school_name: new FormControl(""),
      teacher_school_address: new FormControl(""),
      teacher_school_postcode: new FormControl(""),
      teacher_school_division: new FormControl(""),
      teacher_school_state: new FormControl(""),
      teacher_tel: new FormControl(""),
      teacher_hp: new FormControl(""),
      teacher_email: new FormControl(""),
      teacher_fax: new FormControl(""),
      teacher_dob: new FormControl(""),
      teacher_age: new FormControl(""),
      teacher_religion: new FormControl(""),
      teacher_gender: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_citizenship: new FormControl(""),
      teacher_nric_passportno: new FormControl(""),
      teacher_maritalstatus: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_tshirt_size: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_contactperson_name: new FormControl(""),
      teacher_contactperson_tel: new FormControl(""),
      teacher_anysickness: new FormControl(""),
      teacher_anyallergies: new FormControl(""),
      teacher_vegetarian: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });

    this.secondFormGroup = this.formBuilder.group({
      student_1_name: new FormControl(""),
      student_1_dob: new FormControl(""),
      student_1_age: new FormControl(""),
      student_1_year: new FormControl(""),
      student_1_religion: new FormControl(""),
      student_1_gender: new FormControl(""),
      student_1_citizenship: new FormControl(""),
      student_1_nric_passportno: new FormControl(""),
      student_1_tshirt_size: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_1_contactperson_name: new FormControl(""),
      student_1_contactperson_tel: new FormControl(""),
      student_1_anysickness: new FormControl(""),
      student_1_anyallergies: new FormControl(""),
      student_1_vegetarian: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });

    this.thirdFormGroup = this.formBuilder.group({
      student_2_name: new FormControl(""),
      student_2_dob: new FormControl(""),
      student_2_age: new FormControl(""),
      student_2_year: new FormControl(""),
      student_2_religion: new FormControl(""),
      student_2_gender: new FormControl(""),
      student_2_citizenship: new FormControl(""),
      student_2_nric_passportno: new FormControl(""),
      student_2_tshirt_size: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_2_contactperson_name: new FormControl(""),
      student_2_contactperson_tel: new FormControl(""),
      student_2_anysickness: new FormControl(""),
      student_2_anyallergies: new FormControl(""),
      student_2_vegetarian: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });

    this.fourthFormGroup = this.formBuilder.group({
      accept: new FormControl(
        false,
        Validators.compose([Validators.requiredTrue])
      ),
    });

    this.program_id = this.route.snapshot.paramMap.get("id");
    if (this.program_id) this.getProgram();
  }

  getProgram() {
    this.eduprogramService.filter("id=" + this.program_id).subscribe(
      (res) => {
        console.log("res", res);
        this.program = res;
        this.zeroFormGroup.patchValue({
          educational_program_id: this.program[0].id,
          customer_id: this.authService.decodedToken().user_id,
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {
    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }

  submitEntry() {
    this.firstFormGroup.value.teacher_dob = this.formatDate(
      this.firstFormGroup.value.teacher_dob
    );
    this.secondFormGroup.value.student_1_dob = this.formatDate(
      this.secondFormGroup.value.student_1_dob
    );
    this.thirdFormGroup.value.student_2_dob = this.formatDate(
      this.thirdFormGroup.value.student_2_dob
    );

    let postArray = {
      ...this.zeroFormGroup.value,
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
    };
    console.log("postArray", postArray);

    this.eduprogramformService.create(postArray).subscribe(
      (res) => {
        console.log("res", res);
        swal
          .fire({
            icon: "success",
            title: "Terima kasih",
            text:
              "Pihak kami akan memberi maklum balas terhadap permohonan tersebut dalam masa 3 hari bekerja",
            buttonsStyling: false,
            confirmButtonText: "Tutup",
            customClass: {
              confirmButton: "btn btn-success",
            },
          })
          .then((result) => {
            if (result.value) {
              this.router.navigate(["/program"]);
            }
          });

        let obj = {
          code: "EMEL06",
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
  }

  formatDate(date) {
    let selectedDate = date;
    let year = selectedDate.getFullYear();
    let month =
      selectedDate.getMonth() + 1 < 10
        ? "0" + (selectedDate.getMonth() + 1)
        : selectedDate.getMonth() + 1;
    let day =
      selectedDate.getDate() < 10
        ? "0" + selectedDate.getDate()
        : selectedDate.getDate();
    let formatDate = year + "-" + month + "-" + day;

    return formatDate;
  }

  getGender(value: string) {
    let result = this.genders.find((obj) => {
      return obj.value == value;
    });
    if (this.translate.currentLang == "en") return result.display_name_en;
    if (this.translate.currentLang == "ms") return result.display_name_ms;
  }

  getMaritalStatus(value: string) {
    let result = this.maritalstatuses.find((obj) => {
      return obj.value == value;
    });
    if (this.translate.currentLang == "en") return result.display_name_en;
    if (this.translate.currentLang == "ms") return result.display_name_ms;
  }

  getCitizenship(value: string) {
    let result = this.citizenships.find((obj) => {
      return obj.value == value;
    });
    if (this.translate.currentLang == "en") return result.display_name_en;
    if (this.translate.currentLang == "ms") return result.display_name_ms;
  }

  getTrueFalse(value: string) {
    let result = this.truefalses.find((obj) => {
      return obj.value == value;
    });
    if (this.translate.currentLang == "en") return result.display_name_en;
    if (this.translate.currentLang == "ms") return result.display_name_ms;
  }
}
