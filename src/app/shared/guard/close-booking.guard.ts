import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ActivatedRoute,
  CanActivate,
  Router,
} from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { JwtService } from "../jwt/jwt.service";
import { CloseBookingsService } from "../services/close-bookings/close-bookings.service";

@Injectable({
  providedIn: "root",
})
export class CloseBookingGuard implements CanActivate {
  // Data
  closebookings = [];

  constructor(
    private jwt: JwtService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    private closebookingService: CloseBookingsService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    // console.log("router", route.url[0].path);
    /* if (route.url[0].path == "simulator-ride-book") {
      this.checkCloseBooking("simulator-ride");

      if (this.compareDates(this.closebookings)) return true;
      else {
        this.toastr.error(
          this.translate.instant("RalatProceed"),
          this.translate.instant("Ralat")
        );
        return false;
      }
    } else if (route.url[0].path == "shows-book") {
      this.checkCloseBooking("shows");

      if (this.compareDates(this.closebookings)) return true;
      else {
        this.toastr.error(
          this.translate.instant("RalatProceed"),
          this.translate.instant("Ralat")
        );
        return false;
      }
    } */
    return true;
  }

  checkCloseBooking(module: string) {
    this.closebookingService.filter("module=" + module).subscribe(
      (res) => {
        // console.log("res", res);
        this.closebookings = res;
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.compareDates(this.closebookings);
      }
    );
  }

  compareDates(res) {
    let countTrue = 0;
    for (let i = 0; i < res.length; i++) {
      let date_start = new Date(res[i].date_start).setHours(0, 0, 0);
      let date_end = new Date(res[i].date_end).setHours(23, 59, 59);
      let date_current = new Date().getTime();

      if (date_current > date_start && date_current < date_end) {
        res[i].status = true;
        countTrue++;
      }
    }

    if (countTrue > 0) return false;
    else return true;
  }
}
