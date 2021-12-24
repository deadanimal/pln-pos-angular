import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Gallery } from "@ngx-gallery/core";
import { Lightbox } from "@ngx-gallery/lightbox";
import { TranslateService } from "@ngx-translate/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from "ngx-gallery-9";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CalendarsService } from "src/app/shared/services/calendars/calendars.service";
import { CloseBookingsService } from "src/app/shared/services/close-bookings/close-bookings.service";
import { EmailTemplatesService } from "src/app/shared/services/email-templates/email-templates.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { EducationalProgramsService } from "src/app/shared/services/educational-programs/educational-programs.service";
import { EducationalProgramApplicationsService } from "src/app/shared/services/educational-program-applications/educational-program-applications.service";
import { EducationalProgramDatesService } from "src/app/shared/services/educational-program-dates/educational-program-dates.service";
import { EducationalProgramImagesService } from "src/app/shared/services/educational-program-images/educational-program-images.service";
import { EducationalProgramActivitiesService } from "src/app/shared/services/educational-program-activities/educational-program-activities.service";
import { ModulesService } from "src/app/shared/services/modules/modules.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-program",
  templateUrl: "./program.component.html",
  styleUrls: ["./program.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProgramComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Modal
  defaultModal: BsModalRef;
  readmoreModal: BsModalRef;
  videoModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog",
    backdrop: false,
    ignoreBackdropClick: true,
  };

  // FormGroup
  eduprogramappFormGroup: FormGroup;

  // Data
  calendars = [];
  closebookings = [];
  module: any;
  programs = [];
  selectedProgram = {
    id: "",
    title_en: "",
    description_en: "",
    title_ms: "",
    description_ms: "",
    video_link: "",
    activity: false,
  };
  programdates = [];
  programimages = [];
  programactivities = [];
  enabledProgramDates = [];
  selectedDateTooltips = [];
  today: Date = new Date();

  // Dropdown
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
  programtypes = [
    {
      value: "PL",
      display_name: "Public",
    },
    {
      value: "PV",
      display_name: "Private",
    },
  ];
  programcategories = [
    {
      value: "P1",
      display_name_en: "STUDENT / TEACHER DEVELOPMENT PROGRAM",
      display_name_ms: "PROGRAM PEMBANGUNAN MURID/GURU",
    },
    {
      value: "P2",
      display_name_en: "OBSERVATION PROGRAM",
      display_name_ms: "PROGRAM PENCERAPAN",
    },
    {
      value: "P3",
      display_name_en: "SPECIAL PROGRAM",
      display_name_ms: "PROGRAM KHAS",
    },
    {
      value: "P4",
      display_name_en: "NATIONAL PROGRAM",
      display_name_ms: "PROGRAM KEBANGSAAN",
    },
    {
      value: "P5",
      display_name_en: "INTERNATIONAL PROGRAM",
      display_name_ms: "PROGRAM ANTARABANGSA",
    },
    {
      value: "P6",
      display_name_en: "COOPERATION PROGRAM",
      display_name_ms: "PROGRAM KERJASAMA",
    },
    {
      value: "P7",
      display_name_en: "EXPECTION PROGRAM",
      display_name_ms: "PROGRAM JANGKAUAN",
    },
    {
      value: "P8",
      display_name_en: "SEMINARS, TALKS, PLANETARIUM TALKS",
      display_name_ms: "SEMINAR, CERAMAH, PLANETARIUM TALKS",
    },
  ];
  programsubcategories = [
    {
      value: "NSC",
      display_name: "National Space Challenge",
    },
    {
      value: "KRK",
      display_name: "Kejohanan Roket Kebangsaan",
    },
    {
      value: "NAV",
      display_name: "Not Available",
    },
  ];
  statuses = [
    {
      value: "AV",
      display_name: "Available",
    },
    {
      value: "NA",
      display_name: "Not Available",
    },
  ];

  // Lightbox
  galleryId = "myLightbox";

  // Ngx Gallery
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    public formBuilder: FormBuilder,
    public gallery: Gallery,
    public lightbox: Lightbox,
    public translate: TranslateService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private calendarService: CalendarsService,
    private closebookingService: CloseBookingsService,
    private emailtemplateService: EmailTemplatesService,
    private jwtService: JwtService,
    private eduprogramService: EducationalProgramsService,
    private eduprogramappService: EducationalProgramApplicationsService,
    private eduprogramdateService: EducationalProgramDatesService,
    private eduprogramimageService: EducationalProgramImagesService,
    private eduprogramactivityService: EducationalProgramActivitiesService,
    private moduleService: ModulesService,
    private userService: UsersService,
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

    this.today.setDate(this.today.getDate() + 1);

    this.eduprogramappFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      full_name: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      organisation_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      organisation_category: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      customer_id: new FormControl(""),
      educational_program_id: new FormControl(""),
      educational_program_date: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      educational_program_date_id: new FormControl(""),
      participant: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      age: new FormControl("", Validators.compose([Validators.required])),
      activity: new FormControl(""),
      status: new FormControl("IP"),
      document_link: new FormControl(""),
      image_link: new FormControl(""),
      video_link: new FormControl(""),
    });

    this.getProgram();
    this.getProgramImage();
    this.getUser();
    this.getCalendar();
    this.getCloseBooking();
  }

  getProgram() {
    this.eduprogramService.filter("status=AV").subscribe(
      (res) => {
        // console.log("res", res);
        this.programs = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getProgramDate(program_id: string, program_code: string) {
    this.eduprogramdateService.filter("program_id=" + program_id).subscribe(
      (res) => {
        // console.log("res", res);
        this.programdates = res;
        for (let i = 0; i < res.length; i++) {
          let date = new Date(res[i].program_date);
          let programDate = {
            date: date,
            tooltipText: program_code,
          };
          this.enabledProgramDates.push(date);
          // this.selectedDateTooltips.push(programDate);
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getProgramImage() {
    this.eduprogramimageService.getAll().subscribe(
      (res) => {
        // console.log("res", res);
        this.programimages = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getUser() {
    if (this.jwtService.getToken("accessToken")) {
      this.userService.get(this.authService.decodedToken().user_id).subscribe(
        (res) => {
          // console.log("res", res);
          this.eduprogramappFormGroup.patchValue({
            ...res,
            customer_id: res.id,
            id: "",
          });
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  getCalendar() {
    this.calendarService.filter("status=true").subscribe(
      (res) => {
        // console.log("res", res);
        this.calendars = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getCloseBooking() {
    this.closebookingService.filter("module=program").subscribe(
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

  getProgramActivity(program_id: string) {
    this.eduprogramactivityService.filter("program_id=" + program_id).subscribe(
      (res) => {
        // console.log("res", res);
        this.programactivities = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: "400px",
        height: "500px",
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
  }

  openDefaultModal(modalDefault: TemplateRef<any>, program) {
    if (this.jwtService.getToken("accessToken")) {
      let result = this.closebookings.find((obj) => {
        return obj.status == true;
      });
      // to check if the close booking is exist for program
      if (result) {
        if (this.translate.currentLang == "en")
          this.sweetAlertWarning(result.title_en, result.description_en);
        if (this.translate.currentLang == "ms")
          this.sweetAlertWarning(result.title_ms, result.description_ms);
      }
      // to check if the calendar is block the program to be registered
      // else if (this.checkCalendar(program.id)) {
      //   this.sweetAlertWarning(
      //     "Ralat",
      //     "Harap maaf, program ini tidak dapat dijalankan atas sebab-sebab tertentu."
      //   );
      // }
      // no close booking and no calendar
      else {
        // jika program tiada sub-program
        if (program.program_subcategory == "NAV") {
          this.defaultModal = this.modalService.show(
            modalDefault,
            this.default
          );

          this.selectedProgram = program;
          this.getProgramDate(program.id, program.program_code);
          this.getUser();

          if (program.activity) {
            this.getProgramActivity(program.id);
          }
        } else {
          this.router.navigate(["/program/forms/" + program.id]);
        }
      }
    } else {
      this.toastr.error(
        this.translate.instant("RalatLoginJoin"),
        this.translate.instant("Ralat")
      );
    }
  }

  checkCalendar(program_id: string, booking_date: string): boolean {
    let countTrue = 0;
    for (let i = 0; i < this.calendars.length; i++) {
      let date_start = new Date(this.calendars[i].date_start).setHours(0, 0, 0);
      let date_end = new Date(this.calendars[i].date_end).setHours(23, 59, 59);
      let date_current = new Date(booking_date).getTime();

      if (date_current > date_start && date_current < date_end) {
        for (
          let j = 0;
          j < this.calendars[i].activity_cancellation.length;
          j++
        ) {
          if (program_id == this.calendars[i].activity_cancellation[j])
            countTrue++;
        }
      }
    }

    if (countTrue > 0) return true;
    // if exist in the calendar and fulfill the criteria
    else return false; // if not exist in the calendar and not fulfill the criteria
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

  openReadMoreModal(modalDefault: TemplateRef<any>, program) {
    this.selectedProgram = program;
    this.readmoreModal = this.modalService.show(modalDefault, this.default);
  }

  openVideoModal(modalDefault: TemplateRef<any>, program) {
    this.selectedProgram = program;
    // this.videoModal = this.modalService.show(modalDefault, this.default);
    this.gallery.destroyAll();
    const lightboxRef = this.gallery.ref();
    lightboxRef.addYoutube({ src: program.video_link.split("v=")[1] });
  }

  // Image Process
  onChange(event, type: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (type == "document_link")
        this.eduprogramappFormGroup.get("document_link").setValue(file);
      if (type == "image_link")
        this.eduprogramappFormGroup.get("image_link").setValue(file);
      if (type == "video_link")
        this.eduprogramappFormGroup.get("video_link").setValue(file);
    }
  }

  openAfterBooking() {
    let selectedProgramDate = this.formatDate(
      this.eduprogramappFormGroup.value.educational_program_date
    );

    let result = this.programdates.find((obj) => {
      return obj.program_date == selectedProgramDate;
    });
    this.eduprogramappFormGroup.value.educational_program_date_id = result.id;
    this.eduprogramappFormGroup.value.educational_program_id = this.selectedProgram.id;

    if (this.checkCalendar(this.selectedProgram.id, selectedProgramDate)) {
      this.sweetAlertWarning(
        "Ralat",
        "Harap maaf, tarikh yang anda pilih sudah dibatal oleh pihak kami"
      );
    } else {
      const formData = new FormData();
      formData.append(
        "organisation_name",
        this.eduprogramappFormGroup.value.organisation_name
      );
      formData.append(
        "organisation_category",
        this.eduprogramappFormGroup.value.organisation_category
      );
      formData.append(
        "customer_id",
        this.eduprogramappFormGroup.value.customer_id
      );
      formData.append(
        "educational_program_id",
        this.eduprogramappFormGroup.value.educational_program_id
      );
      formData.append(
        "educational_program_date_id",
        this.eduprogramappFormGroup.value.educational_program_date_id
      );
      formData.append(
        "participant",
        this.eduprogramappFormGroup.value.participant
      );
      formData.append("age", this.eduprogramappFormGroup.value.age);
      formData.append("activity", this.eduprogramappFormGroup.value.activity);
      formData.append("status", this.eduprogramappFormGroup.value.status);
      if (
        typeof this.eduprogramappFormGroup.get("document_link").value !=
        "string"
      ) {
        formData.append(
          "document_link",
          this.eduprogramappFormGroup.get("document_link").value
        );
      }
      if (
        typeof this.eduprogramappFormGroup.get("image_link").value != "string"
      ) {
        formData.append(
          "image_link",
          this.eduprogramappFormGroup.get("image_link").value
        );
      }
      if (
        typeof this.eduprogramappFormGroup.get("video_link").value != "string"
      ) {
        formData.append(
          "video_link",
          this.eduprogramappFormGroup.get("video_link").value
        );
      }

      this.eduprogramappService.post(formData).subscribe(
        (res) => {
          // console.log("res", res);
          this.defaultModal.hide();
          swal.fire({
            icon: "success",
            title: this.translate.instant("TerimaKasih"),
            text: this.translate.instant("ProgramPendidikanSuccessMessage"),
            buttonsStyling: false,
            confirmButtonText: this.translate.instant("Tutup"),
            customClass: {
              confirmButton: "btn btn-success",
            },
          });

          let obj = {
            code: "EMEL06",
            to: this.authService.decodedToken().email,
            context: null, //JSON.stringify({ name: this.authService.decodedToken().full_name }),
          };
          this.emailtemplateService.sending_mail(obj).subscribe(
            (res) => {
              // console.log("res", res);
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
