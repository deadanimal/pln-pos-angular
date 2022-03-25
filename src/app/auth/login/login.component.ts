import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UsersService } from 'src/app/shared/services/users/users.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  email: string;
  password: string;

  loginFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private userService: UsersService,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {
    this.loginFormGroup = this.formBuilder.group({
      username: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {}

  login() {
    this.authService.obtainToken(this.loginFormGroup.value).subscribe(
      (res) => {
        let left = 500 + 1000;
        let currentUser = this.authService.decodedToken();
        this.userService.currentUser = currentUser;

        this.userService.get(currentUser.user_id).subscribe(
          (res) => {
            if (res.user_type == "TC") { 
              this.router.navigate(["/app/home"]);
              window.open("#/customer-display", "_blank", 'toolbar=0,location=0,menubar=0,width=500,height=320,left=500,top=100');
            }
            else {
              this.toastr
              .warning("Hanya pengguna jenis Pentadbir Kaunter Tiket Dibenarkan Masuk", "Info")
            }
          },
          (err) => {},
          () => {}
        );




      },
      (err) => {
        swal.fire({
          title: "Warning",
          text:
            "You have entered an invalid username or password. Please try again.",
          buttonsStyling: false,
        });
      }
    );
  }

 
}
