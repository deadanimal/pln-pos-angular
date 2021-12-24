import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

import { CloseBookingsService } from "src/app/shared/services/close-bookings/close-bookings.service";
import { FeedbacksService } from "src/app/shared/services/feedbacks/feedbacks.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { ModulesService } from "src/app/shared/services/modules/modules.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-simulator-ride",
  templateUrl: "./simulator-ride.component.html",
  styleUrls: ["./simulator-ride.component.scss"],
})
export class SimulatorRideComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  closebookings = [];
  module: any;
  simulatorridefeedbacks = [];

  constructor(
    public translate: TranslateService,
    private closebookingService: CloseBookingsService,
    private feedbackService: FeedbacksService,
    private jwtService: JwtService,
    private moduleService: ModulesService,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private w3cService: W3csService
  ) {
    // to get module detail based on router
    this.moduleService.filter("module=" + this.router.url.substr(1)).subscribe(
      (res) => {
        // console.log("res", res);
        this.module = res[0];
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {
    this.addMetaTag();
    this.getFeedback();
    this.getCloseBooking();

    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }

  getFeedback() {
    this.feedbackService.extended("module=simulator-ride&display=true").subscribe(
      (res) => {
        // console.log("res", res);
        this.simulatorridefeedbacks = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getCloseBooking() {
    this.closebookingService.filter("module=simulator-ride").subscribe(
      (res) => {
        // console.log("res", res);
        this.closebookings = res;
        this.compareDates();
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  changeAdultQuantity(value: number): void {
    console.log(value);
  }

  changeChildrenQuantity(value: number): void {
    console.log(value);
  }

  changeSeniorQuantity(value: number): void {
    console.log(value);
  }

  clickBook() {
    if (this.jwtService.getToken("accessToken")) {
      let result = this.closebookings.find((obj) => {
        return obj.status == true;
      });
      if (result) {
        if (this.translate.currentLang == "en")
          this.sweetAlertWarning(result.title_en, result.description_en);
        if (this.translate.currentLang == "ms")
          this.sweetAlertWarning(result.title_ms, result.description_ms);
      } else this.router.navigate(["/simulator-ride/simulator-ride-book"]);
    } else {
      this.toastr.error(
        this.translate.instant("RalatLoginBook"),
        this.translate.instant("Ralat")
      );
    }
  }

  compareDates() {
    for (let i = 0; i < this.closebookings.length; i++) {
      let date_start = new Date(this.closebookings[i].date_start).setHours(
        0,
        0,
        0
      );
      let date_end = new Date(this.closebookings[i].date_end).setHours(
        23,
        59,
        59
      );
      let date_current = new Date().getTime();

      if (date_current > date_start && date_current < date_end)
        this.closebookings[i].status = true;
    }
  }

  sweetAlertWarning(title, text) {
    swal.fire({
      title,
      text,
      icon: "warning",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-warning",
      },
    });
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
