import {
  Component,
  OnInit,
  HostListener,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin, { DayGridView } from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { TranslateService } from "@ngx-translate/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { AnnouncementsService } from "src/app/shared/services/announcements/announcements.service";
import { BannersService } from "src/app/shared/services/banners/banners.service";
import { CalendarsService } from "src/app/shared/services/calendars/calendars.service";
import { EducationalProgramDatesService } from "src/app/shared/services/educational-program-dates/educational-program-dates.service";
import { FeedbacksService } from "src/app/shared/services/feedbacks/feedbacks.service";
import { PartnersService } from "src/app/shared/services/partners/partners.service";
import { WhatisinterestingsService } from "src/app/shared/services/whatisinterestings/whatisinterestings.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LandingComponent implements OnInit {
   constructor(
   ) {

  }
  ngOnInit() {
  }
}
