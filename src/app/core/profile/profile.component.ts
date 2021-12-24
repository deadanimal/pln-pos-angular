import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router, NavigationEnd } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CustomValidators } from "src/app/shared/class/custom-validators";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { InvoiceReceiptsService } from "src/app/shared/services/invoice-receipts/invoice-receipts.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  invoicereceipts = [];
  user: any;
  selectedTab: string = "maklumat-am";

  // Dropdown
  invoicereceiptstatuses = [
    {
      value: "IC",
      display_name_en: "Invoice Created",
      display_name_ms: "Invois Dibuat",
    },
    {
      value: "PP",
      display_name_en: "Pending Payment",
      display_name_ms: "Pembayaran Belum Selesai",
    },
    {
      value: "PS",
      display_name_en: "Payment Successful",
      display_name_ms: "Pembayaran Berjaya",
    },
    {
      value: "PR",
      display_name_en: "Payment Rejected",
      display_name_ms: "Pembayaran Ditolak",
    },
    {
      value: "RC",
      display_name_en: "Receipt Created",
      display_name_ms: "Resit Dibuat",
    },
  ];
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
  passwordchangeFormGroup: FormGroup;
  userFormGroup: FormGroup;

  // Icons
  new_password1: boolean = false;
  new_password2: boolean = false;
  old_password: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private invoicereceiptService: InvoiceReceiptsService,
    public jwtService: JwtService,
    private userService: UsersService,
    private w3cService: W3csService
  ) {
    this.userFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      full_name: new FormControl(""),
      nric: new FormControl(""),
      nric_picture: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      birth_date: new FormControl(""),
      age: new FormControl(0),
      address_1: new FormControl(""),
      address_2: new FormControl(""),
      address_3: new FormControl(""),
      postcode: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl(""),
      country: new FormControl(""),
      user_type: new FormControl(""),
      gender_type: new FormControl(""),
      race_type: new FormControl(""),
      is_active: new FormControl(false),
    });

    this.passwordchangeFormGroup = this.formBuilder.group(
      {
        new_password1: new FormControl(
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
          ])
        ),
        new_password2: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),
        old_password: new FormControl(""),
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.changepasswordMatchValidator,
      }
    );

    this.getUser();
    this.getInvoiceReceipt();
  }

  getUser() {
    this.userService.get(this.authService.decodedToken().user_id).subscribe(
      (res) => {
        console.log("res", res);
        this.user = res;
        this.userFormGroup.patchValue({
          ...res,
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getInvoiceReceipt() {
    this.invoicereceiptService
      .extended("user=" + this.authService.decodedToken().user_id)
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.invoicereceipts = res;
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

  selectTab(tab: string) {
    this.selectedTab = tab;

    if (this.selectedTab == "log-keluar") {
      this.authService.clickLogout();
      // this.toastr.info("Anda telah log keluar. Terima kasih.", "Info");
      // this.jwtService.destroyToken();
      // this.router.navigate(["/landing"]);
    }
  }

  updateProfile() {
    this.userService
      .update(this.userFormGroup.value, this.userFormGroup.value.id)
      .subscribe(
        (res) => {
          console.log("res", res);
          swal.fire({
            icon: "success",
            title: "Maklumat AM",
            text: "Maklumat am anda berjaya dikemaskini. Terima kasih.",
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
            text: "Maklumat am anda tidak berjaya dikemaskini. Sila cuba lagi.",
            buttonsStyling: false,
            confirmButtonText: "Tutup",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
      );
  }

  changePassword() {
    this.authService
      .changePassword(this.passwordchangeFormGroup.value)
      .subscribe(
        (res) => {
          console.log("res", res);
          swal.fire({
            icon: "success",
            title: "Tukar kata laluan",
            text: "Kata laluan anda berjaya dikemaskini. Terima kasih.",
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
            text: "Kata laluan anda tidak berjaya dikemaskini. Sila cuba lagi.",
            buttonsStyling: false,
            confirmButtonText: "Tutup",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
      );
  }

  getInvoiceReceiptStatus(value: string) {
    let html = "";
    switch (value) {
      case "IC":
        html = "<span class='badge badge-primary'>Invois Dibuat</span>";
        break;
      case "PP":
        html =
          "<span class='badge badge-warning'>Pembayaran Belum Selesai</span>";
        break;
      case "PS":
        html = "<span class='badge badge-success'>Pembayaran Berjaya</span>";
        break;
      case "PR":
        html = "<span class='badge badge-danger'>Pembayaran Ditolak</span>";
        break;
      case "RC":
        html = "<span class='badge badge-info'>Resit Dibuat</span>";
        break;
    }
    return html;
  }

  changePasswordIcon(formControl: string) {
    switch (formControl) {
      case "new_password1":
        this.new_password1 = !this.new_password1;
        break;
      case "new_password2":
        this.new_password2 = !this.new_password2;
        break;
      case "old_password":
        this.old_password = !this.old_password;
    }
  }
}
