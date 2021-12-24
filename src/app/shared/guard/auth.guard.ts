import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { JwtService } from "../jwt/jwt.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService
  ) {}

  canActivate() {
    let accessToken = this.jwt.getToken("accessToken");
    if (accessToken) {
      // console.log("Authenticated");
      return true;
    } else {
      // console.log("Not Authenticated");
      this.toastr.error(
        this.translate.instant("RalatProceed"),
        this.translate.instant("Ralat")
      );
      return false;
      // return this.router.navigate(["/landing"]);
    }
  }
}
