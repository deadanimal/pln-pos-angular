import {
  Component,
  ChangeDetectorRef,
  OnInit,
  TemplateRef,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { CustomValidators } from "src/app/shared/class/custom-validators";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  // CSS Class
  focus1;
  focus4;
  focus5;
  focus6;
  focus7;
  focus9;
  focus10;
  focus11;
  focus12;
  focus13;
  focus14;
  focus15;
  focus16;
  focus17;
  fontSize: string;
  themeColor: string;

  // Dropdown
  races = [
    {
      value: "ML",
      display_name: "Melayu",
    },
    {
      value: "CN",
      display_name: "Cina",
    },
    {
      value: "ID",
      display_name: "India",
    },
    {
      value: "OT",
      display_name: "Lain-lain",
    },
  ];
  genders = [
    {
      value: "FM",
      display_name: "Perempuan",
    },
    {
      value: "ML",
      display_name: "Lelaki",
    },
  ];

  // FormGroup
  registerFormGroup: FormGroup;

  // Language translation
  languageSwitcher: string = "ms";

  // Recaptcha
  siteKey: string = environment.reCaptchaSiteKey;
  size: string = "normal";
  lang: string = "ms";
  theme: string = "light";
  type: string = "image";

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService,
    public jwtService: JwtService,
    public userService: UsersService,
    public translate: TranslateService,
    private toastr: ToastrService,
    private w3cService: W3csService
  ) {
    this.registerFormGroup = this.formBuilder.group(
      {
        full_name: ["", Validators.compose([Validators.required])],
        username: ["", Validators.compose([])],
        email: [
          "",
          Validators.compose([Validators.required, Validators.email]),
        ],
        password1: [
          "",
          Validators.compose([
            Validators.required, // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true,
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true,
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true,
              }
            ),
            Validators.minLength(8),
          ]),
        ],
        password2: ["", Validators.compose([Validators.required])],
        phone: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern("^[0-9]*$"),
          ]),
        ],
        address_1: ["", Validators.compose([Validators.required])],
        address_2: ["", Validators.compose([])],
        address_3: ["", Validators.compose([])],
        postcode: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern("^[0-9]*$"),
          ]),
        ],
        city: ["", Validators.compose([Validators.required])],
        state: ["", Validators.compose([Validators.required])],
        country: ["", Validators.compose([Validators.required])],
        birth_date: ["", Validators.compose([Validators.required])],
        gender_type: ["", Validators.compose([Validators.required])],
        race_type: ["", Validators.compose([Validators.required])],
        user_type: ["CS"],
        recaptcha: ["", Validators.required],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );
  }

  ngOnInit() {
    this.w3cService.currentFontSize.subscribe((fontSize) => {
      this.fontSize = fontSize;
    });

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );

    this.w3cService.currentTranslation.subscribe(
      (translation) => (this.lang = translation)
    );
  }

  clickRegister() {
    this.registerFormGroup.value.username = this.registerFormGroup.value.email;

    this.authService.registerAccount(this.registerFormGroup.value).subscribe(
      (res) => {
        // console.log("res", res);
        if (res) {
          this.userService
            .update(this.registerFormGroup.value, res.user.pk)
            .subscribe(
              (res) => {
                // console.log("res", res);
                this.toastr.success(
                  "Pendaftaran anda berjaya. Sila log masuk.",
                  "Berjaya"
                );
              },
              (err) => {
                console.error("err", err);
                this.toastr.error(
                  "Pendaftaran anda tidak berjaya. Sila cuba lagi.",
                  "Ralat"
                );
              }
            );
        }
      },
      (err) => {
        console.error("err", err);
        this.toastr.error(
          "Pendaftaran anda tidak berjaya. Sila cuba lagi.",
          "Ralat"
        );
      }
    );
  }

  // ReCaptcha
  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.captchaIsExpired = false;
    // this.cdr.detectChanges();
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.captchaIsExpired = false;
    // this.cdr.detectChanges();
    this.verifyRecaptcha(captchaResponse);
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.captchaIsExpired = false;
    // this.cdr.detectChanges();
  }

  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
    // this.cdr.detectChanges();
  }

  verifyRecaptcha(response: string) {
    let obj = {
      secret: environment.reCaptchaSecretKey,
      response: response,
    };
    this.userService.verify_recaptcha(obj).subscribe(
      (res) => {
        // console.log("res", res);
      },
      (err) => {
        console.error("err", err);
      }
    );
  }
}
