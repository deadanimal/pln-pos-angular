import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { Gallery } from "@ngx-gallery/core";
import { Lightbox } from "@ngx-gallery/lightbox";
import { TranslateService } from "@ngx-translate/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

import { CloseBookingsService } from "src/app/shared/services/close-bookings/close-bookings.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { ModulesService } from "src/app/shared/services/modules/modules.service";
import { ShowingsService } from "src/app/shared/services/showings/showings.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-shows",
  templateUrl: "./shows.component.html",
  styleUrls: ["./shows.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ShowsComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Form
  focus;

  // Data
  closebookings = [];
  module: any;
  showings = []; //: Show[] = [];

  // Carousel
  itemsPerSlide = 3;
  singleSlideOffset = false;
  noWrap = false;
  activeSlideIndex = 0;

  // Lightbox
  galleryId = "myLightbox";

  // Modal
  videoModal: BsModalRef;

  constructor(
    public gallery: Gallery,
    public lightbox: Lightbox,
    public translate: TranslateService,
    private closebookingService: CloseBookingsService,
    private jwtService: JwtService,
    private moduleService: ModulesService,
    private modalService: BsModalService,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private showingService: ShowingsService,
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

    this.getShowing();
    this.getCloseBooking();
  }

  getShowing() {
    let filterField = "status=AV";
    this.showingService.filter(filterField).subscribe(
      (res) => {
        // console.log("res", res);
        this.showings = res;
        for (let i = 0; i < this.showings.length; i++) {
          this.showings[i].show = false;
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getCloseBooking() {
    this.closebookingService.filter("module=shows").subscribe(
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

  ngOnInit() {
    this.addMetaTag();

    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }

  navigatePage(path: string, id: string) {
    this.router.navigate([path]);
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

  openModal(template: TemplateRef<any>, showing) {
    // this.videoModal = this.modalService.show(template, { class: "modal-lg" });
    this.gallery.destroyAll();
    const lightboxRef = this.gallery.ref();
    lightboxRef.addYoutube({ src: showing.trailer_link.split("v=")[1] });
  }

  makeBooking(id: number, title: string) {
    if (this.jwtService.getToken("accessToken")) {
      let result = this.closebookings.find((obj) => {
        return obj.status == true;
      });
      // to check if the close booking is exist for shows
      if (result) {
        if (this.translate.currentLang == "en")
          this.sweetAlertWarning(result.title_en, result.description_en);
        if (this.translate.currentLang == "ms")
          this.sweetAlertWarning(result.title_ms, result.description_ms);
      }
      // no close booking and no calendar
      else {
        this.postMessage(id);
        this.router.navigate(["/app/shows/shows-book/" + id]);
      }
    } else {
      this.toastr.error(
        this.translate.instant("RalatLoginBook"),
        this.translate.instant("Ralat")
      );
    }
  }

  postMessage(id) {
    let broadcastChannel = new BroadcastChannel("channel1");

    let msg = {
      "event": "openSeatEvent",
      "id": id
    }

    broadcastChannel.postMessage(msg);

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

  showMore(index: number) {
    this.showings[index].show = !this.showings[index].show;
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
