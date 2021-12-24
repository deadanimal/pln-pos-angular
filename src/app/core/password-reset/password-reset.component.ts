import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CustomValidators } from "src/app/shared/class/custom-validators";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-password-reset",
  templateUrl: "./password-reset.component.html",
  styleUrls: ["./password-reset.component.scss"],
})
export class PasswordResetComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // FormGroup
  passwordresetFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private w3cService: W3csService
  ) {
    this.passwordresetFormGroup = this.formBuilder.group(
      {
        uid: new FormControl("", Validators.compose([Validators.required])),
        token: new FormControl("", Validators.compose([Validators.required])),
        new_password1: new FormControl(
          "",
          Validators.compose([
            Validators.required, // check whether the entered password has a number
            // CustomValidators.patternValidator(/\d/, {
            //   hasNumber: true,
            // }),
            // // check whether the entered password has upper case letter
            // CustomValidators.patternValidator(/[A-Z]/, {
            //   hasCapitalCase: true,
            // }),
            // // check whether the entered password has a lower case letter
            // CustomValidators.patternValidator(/[a-z]/, {
            //   hasSmallCase: true,
            // }),
            // // check whether the entered password has a special character
            // CustomValidators.patternValidator(
            //   /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            //   {
            //     hasSpecialCharacters: true,
            //   }
            // ),
            // Validators.minLength(8),
          ])
        ),
        new_password2: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),
      }
      // {
      //   // check whether our password and confirm password match
      //   validator: CustomValidators.passwordMatchValidator,
      // }
    );

    this.passwordresetFormGroup.patchValue({
      uid: this.route.snapshot.paramMap.get("uid"),
      token: this.route.snapshot.paramMap.get("token"),
    });
  }

  ngOnInit() {
    this.w3cService.currentFontSize.subscribe((fontSize) => {
      this.fontSize = fontSize;
    });

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }

  resetpassword() {
    this.authService
      .resetPasswordConfirm(this.passwordresetFormGroup.value)
      .subscribe(
        (res) => {
          console.log("res", res);
          swal.fire({
            icon: "success",
            title: "Tukar kata laluan",
            text:
              "Tukar kata laluan anda sudah berjaya. Sila log masuk dengan kata laluan yang baru. Terima kasih.",
            buttonsStyling: false,
            confirmButtonText: "Tutup",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        },
        (err) => {
          console.error("err", err);
          swal.fire({
            icon: "warning",
            title: "Tukar kata laluan",
            text:
              "Tukar kata laluan anda tidak berjaya ditukar. Sila cuba lagi.",
            buttonsStyling: false,
            confirmButtonText: "Tutup",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
      );
  }
}
