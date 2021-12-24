import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from "ngx-gallery-9";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CloseBookingsService } from "src/app/shared/services/close-bookings/close-bookings.service";
import { EmailTemplatesService } from "src/app/shared/services/email-templates/email-templates.service";
import { FacilitiesService } from "src/app/shared/services/facilities/facilities.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";
import { FacilityImagesService } from "src/app/shared/services/facility-images/facility-images.service";
import { FacilityPricesService } from "src/app/shared/services/facility-prices/facility-prices.service";
import { FacilitySubcategoriesService } from "src/app/shared/services/facility-subcategories/facility-subcategories.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-facility-details",
  templateUrl: "./facility-details.component.html",
  styleUrls: ["./facility-details.component.scss"],
})
export class FacilityDetailsComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  closebookings = [];
  currentFacility: any;
  facility_category: string = "";
  facilities$: Observable<any>;
  facilityimages = [];
  facilityprices = [];
  facilityselectedprices = [];
  have_equipment: boolean = false;
  selectedFacility = {
    facility_subcategory: "",
    value: "",
    display_name_en: "",
    display_name_ms: "",
    link: "",
    have_subcategory: false,
  };
  today: Date = new Date();

  // Dropdown
  bookingdays = [
    {
      value: "HALF",
      display_name_en: "Half Day",
      display_name_ms: "Separuh Hari",
    },
    {
      value: "FULL",
      display_name_en: "Full Day",
      display_name_ms: "Satu Hari",
    },
  ];
  facilitycategories = [
    {
      facility_subcategory: "",
      value: "TA",
      display_name_en: "Space Theater",
      display_name_ms: "Teater Angkasa",
      link: "teater-angkasa",
      have_subcategory: false,
    },
    {
      facility_subcategory: "",
      value: "GP",
      display_name_en: "Exhibition Gallery",
      display_name_ms: "Galeri Pameran",
      link: "galeri-pameran",
      have_subcategory: false,
    },
    {
      facility_subcategory: "",
      value: "TT",
      display_name_en: "Orion Room",
      display_name_ms: "Bilik Orion",
      link: "teatret",
      have_subcategory: false,
    },
    {
      facility_subcategory: "",
      value: "BC",
      display_name_en: "Centaurus Room",
      display_name_ms: "Bilik Centaurus",
      link: "bilik-centaurus",
      have_subcategory: false,
    },
    {
      facility_subcategory: "",
      value: "KR",
      display_name_en: "Recreation Area",
      display_name_ms: "Kawasan Rekreasi",
      link: "kawasan-rekreasi",
      have_subcategory: false,
    },
    {
      facility_subcategory: "",
      value: "SM",
      display_name_en: "Microsatellar Station",
      display_name_ms: "Stesen Mikrosatelit",
      link: "stesen-mikrosatelit",
      have_subcategory: false,
    },
    {
      facility_subcategory: "",
      value: "NA",
      display_name_en: "Not Available",
      display_name_ms: "Tidak Ada",
      link: "not-available",
      have_subcategory: false,
    },
  ];
  facilitysubcategories = [];
  organisationcategories = [
    {
      value: "GV",
      display_name_en: "Government",
      display_name_ms: "Kerajaan",
    },
    {
      value: "SC",
      display_name_en: "School",
      display_name_ms: "Sekolah",
    },
    {
      value: "UN",
      display_name_en: "University",
      display_name_ms: "Universiti",
    },
    {
      value: "NA",
      display_name_en: "None",
      display_name_ms: "Tiada",
    },
  ];

  // FormGroup
  facilitybookingFormGroup: FormGroup;

  // Modal
  defaultModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog",
    backdrop: false,
    ignoreBackdropClick: true,
  };

  // Ngx Gallery
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private modalService: BsModalService,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private closebookingService: CloseBookingsService,
    private emailtemplateService: EmailTemplatesService,
    private jwtService: JwtService,
    private facilityService: FacilitiesService,
    private facilitybookingService: FacilityBookingsService,
    private facilityimageService: FacilityImagesService,
    private facilitypriceService: FacilityPricesService,
    private facilitysubcategoryService: FacilitySubcategoriesService,
    private userService: UsersService,
    private w3cService: W3csService
  ) {
    this.today.setDate(this.today.getDate() + 1);

    this.facility_category = this.route.snapshot.paramMap.get("id");


    this.facilitybookingFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      user_name: new FormControl(""),
      user_email: new FormControl(""),
      user_phone: new FormControl(""),
      title: new FormControl(""),
      organisation_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      organisation_category: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      booking_date: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      booking_days: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      number_of_people: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      total_price: new FormControl(0.0),
      want_equipment: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      user_id: new FormControl(""),
      pic_id: new FormControl(""),
      facility_id: new FormControl(""),
      status: new FormControl("FB01"),
    });
  }

  facilityCheck() {
    console.log(this.facility_category);
    this.facilityService.filter("facility_category=" + this.facility_category).subscribe(
      (res) => {
        this.currentFacility = res[0];
      },
      (err) => {},
      () => {

        // preModal check
        this.facilitypriceService
          .filter("facility_id=" + this.currentFacility.id)
          .subscribe(
            (res) => {
              this.facilityselectedprices = res;
              res.forEach((obj) => {
                if (obj.equipment == "WITH" || obj.equipment == "WOUT") {
                  this.have_equipment = true;
                } else {
                  this.facilitybookingFormGroup.removeControl("want_equipment");
                }
              });
            },
            (err) => {
              console.error("err", err);
            }
          );

      }
    );

    
  }

  getFacility() {
    this.facilities$ = this.facilityService.filter(
      "facility_category=" + this.facility_category
    );
    for (let i = 0; i < this.facilitycategories.length; i++) {
      if (this.facilitycategories[i].value == this.facility_category) {
        this.selectedFacility = this.facilitycategories[i];
      }
    }
    this.facilities$
      .forEach((res) => {
        for (let j = 0; j < res.length; j++) {
          if (res[j].facility_subcategory) {
            this.selectedFacility.have_subcategory = true;
            this.selectedFacility.facility_subcategory =
              res[j].facility_subcategory;
          }
        }
      })
      .finally(() => {
        this.getFacilitySubcategory();
      });
  }

  getFacilitySubcategory() {
    if (this.selectedFacility.facility_subcategory) {
      this.facilitysubcategoryService
        .filter("facility_category=" + this.selectedFacility.value)
        .subscribe(
          (res) => {
            console.log("res", res);
            this.facilitysubcategories = res;
          },
          (err) => {
            console.error("err", err);
          }
        );
    }
  }

  getFacilityImage() {
    this.facilityimageService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.facilityimages = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getFacilityPrice() {
    this.facilitypriceService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.facilityprices = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getCloseBooking() {
    this.closebookingService.filter("module=facility").subscribe(
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

  getUser() {
    // 
    this.userService.get(this.authService.decodedToken().user_id).subscribe(
      (res) => {
        // console.log("res", res);
        this.facilitybookingFormGroup.patchValue({
          ...res,
          user_id: res.id,
        });
      },

      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit(): void {
    this.facilityCheck();
    this.getFacility();
    this.getFacilityImage();
    this.getFacilityPrice();
    this.getCloseBooking();

    this.galleryOptions = [
      {
        width: "600px",
        height: "600px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageArrows: false,
        thumbnailsArrows: false,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    this.addMetaTag();

    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );

    console.log("current facility: ", this.selectedFacility)
  }

  openDefaultModal(modalDefault: TemplateRef<any>, facility) {
    if (this.jwtService.getToken("accessToken")) {
      let result = this.closebookings.find((obj) => {
        return obj.status == true;
      });
      if (result) {
        if (this.translate.currentLang == "en")
          this.sweetAlertWarning(result.title_en, result.description_en);
        if (this.translate.currentLang == "ms")
          this.sweetAlertWarning(result.title_ms, result.description_ms);
      } else {
        this.facilitypriceService
          .filter("facility_id=" + facility.id)
          .subscribe(
            (res) => {
              this.facilityselectedprices = res;
              res.forEach((obj) => {
                if (obj.equipment == "WITH" || obj.equipment == "WOUT") {
                  this.have_equipment = true;
                } else {
                  this.facilitybookingFormGroup.removeControl("want_equipment");
                }
              });
            },
            (err) => {
              console.error("err", err);
            }
          );

        this.defaultModal = this.modalService.show(modalDefault, this.default);
        this.getUser();

        this.facilitybookingFormGroup.patchValue({
          facility_id: facility.id,
        });
      }
    } else {
      this.toastr.error(
        "Harap maaf. Anda perlu log masuk terlebih dahulu untuk menempah fasiliti.",
        "Ralat"
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

  openFacilityDetailZone(selectedFacility, facility_zone) {
    this.router.navigate([
      "app/facility/details/",
      selectedFacility.value,
      facility_zone.id,
    ]);
  }

  openAfterBooking() {
    // get facility objects - filtered by facility_category
    console.log("faciliti id: ", this.currentFacility.id)
    this.facilitybookingFormGroup.patchValue({
      facility_id: this.currentFacility.id,
    });


    this.facilitybookingFormGroup.value.booking_date = this.formatDate(
      this.facilitybookingFormGroup.value.booking_date
    );

    // to set the price of facility booking
    let result = this.facilityselectedprices.find((obj) => {
      console.log("obj thing", obj);
      if (obj.equipment != "NA")
        return (
          obj.equipment == this.facilitybookingFormGroup.value.want_equipment
        );
      else return obj;
    });
    if (result) {
      if (this.facilitybookingFormGroup.value.booking_days == "FULL")
        this.facilitybookingFormGroup.value.total_price =
          result.facility_price_full;
      else if (this.facilitybookingFormGroup.value.booking_days == "HALF")
        this.facilitybookingFormGroup.value.total_price =
          result.facility_price_half;
    }

    console.log(this.facilitybookingFormGroup)
    this.facilitybookingService
      .post(this.facilitybookingFormGroup.value)
      .subscribe(
        (res) => {
          console.log("res", res);
          this.toastr.info(
            this.translate.instant("Tempahan Berjaya"),
            "Info"
          );


          let obj = {
            code: "EMEL03",
            to: this.authService.decodedToken().email,
            context: null, //JSON.stringify({ name: this.authService.decodedToken().full_name }),
          };
          this.emailtemplateService.sending_mail(obj).subscribe(
            (res) => {
              console.log("res", res);
              this.router.navigate(["/app/home"]);
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

  getFacilityCategory(value: string, lang: string) {
    let result = this.facilitycategories.find((obj) => {
      return obj.value == value;
    });
    if (lang == "en") return result.display_name_en;
    if (lang == "ms") return result.display_name_ms;
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
