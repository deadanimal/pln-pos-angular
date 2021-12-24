import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, NavigationEnd } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { CustomValidators } from "src/app/shared/class/custom-validators";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";
import { ReportingService } from "src/app/shared/services/reporting/reporting.service";
import { DailyReports } from "src/app/shared/services/reporting/reporting.model";
import { map, tap, catchError } from "rxjs/operators";


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  // CSS class
  themeColor: string;

  // Default
  isCollapsed = true;
  autoclose = false;

  numberStr:string = "0";
  dailyReports: DailyReports[] = [];
  user_id: string;


  // Switch
  switch = true;
  onText = "BM";
  offText = "EN";
  onColor = "danger";
  offColor = "primary";

  // Language
  languageSwitcher: string = "ms";

  // Forms
  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  forgotPasswordFormGroup: FormGroup;

  // Data
  addToCartCount: number;
  rememberMe: boolean = false;
  user: any;

  // Token
  currentUser: any;
  accessToken: string;
  refreshToken: string;

  // Modal
  loginModal: BsModalRef;
  registerModal: BsModalRef;
  forgotPasswordModal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
    backdrop: false,
    ignoreBackdropClick: true,
  };

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

  // Icons
  password: boolean = false;

  constructor(
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService,
    public cartService: CartsService,
    public jwtService: JwtService,
    public userService: UsersService,
    public translate: TranslateService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private w3cService: W3csService,
    private reportingService: ReportingService,

  ) {
    router.events.subscribe((val) => {
      this.autoclose = true;
      this.isCollapsed = true;
    });

    this.loginFormGroup = this.formBuilder.group({
      username: [
        "",
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });

    this.forgotPasswordFormGroup = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
    });

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
        phone: ["", Validators.compose([Validators.required])],
        address_1: ["", Validators.compose([Validators.required])],
        address_2: ["", Validators.compose([])],
        address_3: ["", Validators.compose([])],
        postcode: ["", Validators.compose([Validators.required])],
        city: ["", Validators.compose([Validators.required])],
        state: ["", Validators.compose([Validators.required])],
        country: ["", Validators.compose([Validators.required])],
        birth_date: ["", Validators.compose([Validators.required])],
        gender_type: ["", Validators.compose([Validators.required])],
        race_type: ["", Validators.compose([Validators.required])],
        user_type: ["CS"],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );
  }

  ngOnInit() {
    this.accessToken = this.jwtService.getToken("accessToken");
    this.refreshToken = this.jwtService.getToken("refreshToken");
    this.currentUser = this.authService.decodedToken().full_name;
    this.user_id = this.authService.decodedToken().user_id;

    if (this.authService.subsVar == undefined) {
      this.authService.subsVar = this.authService.invokeLogoutFunction.subscribe(
        (name: string) => {
          this.clickLogout();
        }
      );
    }

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );

    this.w3cService.currentAddToCartCount.subscribe(
      (addToCartCount) => (this.addToCartCount = addToCartCount)
    );

    this.w3cService.currentTranslation.subscribe(
      (translation) => (this.languageSwitcher = translation)
    );

    if (this.accessToken && this.refreshToken) {
      // to get add to cart count
      this.getAddToCartCount();

      // to check if user tick remember me
      if (this.cookieService.check("rememberMe"))
        if (this.cookieService.get("rememberMe") == "true")
          this.checkTokenExpired();
    }

    if (this.cookieService.check("rememberMe")) this.rememberMe = true;

  }

  getAddToCartCount() {
    this.cartService
      .extended(
        "cart_status=CR&user=" + this.authService.decodedToken().user_id
      )
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.w3cService.changeAddToCartCount(res.length);
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  checkTokenExpired() {
    console.log("checkTokenExpired triggered");
    let access = this.jwtService.getToken("accessToken");
    let refresh = this.jwtService.getToken("refreshToken");
    if (access && refresh) {
      // check if the refresh is not expired
      if (this.authService.isTokenExpired(refresh)) {
        // return true
        this.jwtService.destroyToken();
        this.cookieService.delete("rememberMe");
        this.router.navigate(["/landing"]);
      } else {
        // return false
        // check if the access is not expired
        if (this.authService.isTokenExpired(access)) {
          // return true
          let body = {
            refresh: refresh,
          };
          this.authService.refreshToken(body).subscribe(
            (res) => {
              this.jwtService.saveToken("accessToken", res.access);
            },
            (err) => {
              console.error("err", err);
            }
          );
        } else {
          // return false
        }
      }
    }
  }

  onSwitchChange(event) {
    // console.log(event);
    if (event.currentValue == true) {
      this.translate.use("ms");
    } else {
      this.translate.use("en");
    }
  }

  navigatePage(link: string) {
    this.router.navigate([link]);
  }

  clickLogin() {
    if (this.rememberMe) this.cookieService.set("rememberMe", "true", 1);
    else {
      if (this.cookieService.check("rememberMe"))
        this.cookieService.delete("rememberMe");
    }

    this.authService.obtainToken(this.loginFormGroup.value).subscribe(
      (res) => {
        // console.log("res", res);
        this.toastr.success(
          "Log masuk berjaya. Sila tunggu sebentar.",
          "Berjaya",
          {
            progressBar: true,
            progressAnimation: "increasing",
          }
        );
        this.accessToken = res.access;
        this.loginModal.hide();
        this.router.navigate(["/home"]);

        if (this.accessToken) {
          this.userService
            .get(this.authService.decodedToken().user_id)
            .subscribe(
              (res) => {
                // console.log("res", res);
                this.user = res;
              },
              (err) => {
                console.error("err", err);
              }
            );
        }
      },
      (err) => {
        // console.error("err", err);
        this.toastr.error(
          "Harap maaf, terdapat masalah ketika anda ingin log masuk. Sila cuba lagi.",
          "Ralat"
        );
      }
    );
  }

  clickLogout() {
    this.toastr.info("Anda telah log keluar. Terima kasih.", "Info");
    this.jwtService.destroyToken();
    this.cookieService.delete("rememberMe");
    this.accessToken = this.jwtService.getToken("accessToken");
    this.router.navigate(["/landing"]);
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
                this.registerModal.hide();
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

  clickForgotPassword() {
    this.authService
      .resetPassword(this.forgotPasswordFormGroup.value)
      .subscribe(
        (res) => {
          // console.log("res", res);
          if (res) {
            swal
              .fire({
                icon: "success",
                title: "Tukar kata laluan",
                text:
                  "Tukar kata laluan sudah dihantar kepada emel anda. Sila semak emel anda. Terima kasih.",
                buttonsStyling: false,
                confirmButtonText: "Tutup",
                customClass: {
                  confirmButton: "btn btn-success",
                },
              })
              .then((result) => {
                if (result.value) {
                  this.forgotPasswordModal.hide();
                }
              });
          }
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  openLoginModal(template: TemplateRef<any>) {
    this.loginModal = this.modalService.show(template, this.modalConfig);
  }

  closeLoginModal() {
    this.loginModal.hide();
  }

  openForgotPasswordModal(template: TemplateRef<any>) {
    this.closeLoginModal();
    this.forgotPasswordModal = this.modalService.show(
      template,
      this.modalConfig
    );
  }

  closeForgotPasswordModal() {
    this.forgotPasswordModal.hide();
  }

  openRegisterModal(template: TemplateRef<any>) {
    this.registerModal = this.modalService.show(template, this.modalConfig);
  }

  closeRegisterModal() {
    this.registerModal.hide();
  }

  changeLanguageSwitcher(language: string) {
    this.languageSwitcher = language;
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    this.w3cService.changeTranslation(language);
  }

  changePasswordIcon() {
    this.password = !this.password;
  }

  logout() {
    this.jwtService.destroyToken();
    this.router.navigate(['/auth/login']);
  }

  reporting() {
    this.router.navigate(['/app/reporting']);

  }

  settings() {
    this.router.navigate(['/app/settings']);
  }

  transaksi() {
    this.router.navigate(['/app/transactions-list']);
  }


  // update initial cash report 
  openModal(template: TemplateRef<any>) {
    this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalService.hide();
  }

  inputRegister(input: string) {

    // reset condition
    if (input=='del') {
      this.numberStr = "0";
      input = "0";
    }

    this.numberStr = this.numberStr + input;
  }



  updatePos() {
    // call reporting service
    // find reporting data for that day(open), dor that user
    let today_date = new Date().toJSON("yyyy-MM-dd").slice(0,10);
    this.reportingService.filter("user=" + this.user_id).pipe(map(x => x.filter(i => i.created_date.slice(0,10) == today_date 
      && i.status == "OP" ))).subscribe(
      (res) => {
        this.dailyReports = res;
      },
      (err) => {
        console.log(err);
      },
      () => {

      let obj = {
        "initial_cash": this.numberStr,
      }

      this.reportingService.update(obj, this.dailyReports[0].id).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {

        },
        () => {
          //window.location.reload();
        });
      });



    this.modalService.hide();

  }
}
