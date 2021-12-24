import { Component, OnInit } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-operating-hour",
  templateUrl: "./operating-hour.component.html",
  styleUrls: ["./operating-hour.component.scss"],
})
export class OperatingHourComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  tickets = [
    {
      venue_ms: "TAYANGAN PLANETARIUM",
      venue_en: "PLANETARIUM SHOWS",
      normalAdult: "RM12.00",
      mykadAdult: "RM6.00",
      normalChildren: "RM8.00",
      mykadChildren: "RM4.00",
      normalStudent: "RM8.00",
      mykadStudent: "RM4.00",
    },
    {
      venue_ms: "KEMBARA SIMULASI SPACE POD",
      venue_en: "SPACE POD SIMULATOR RIDE",
      normalAdult: "RM24.00",
      mykadAdult: "RM12.00",
      normalChildren: "RM16.00",
      mykadChildren: "RM8.00",
      normalStudent: "tiada",
      mykadStudent: "tiada",
    },
    {
      venue_ms: "GALERI PAMERAN",
      venue_en: "EXHIBITION GALLERY",
      normalAdult: "",
      mykadAdult: "",
      normalChildren: "",
      mykadChildren: "",
      normalStudent: "",
      mykadStudent: "",
    },
  ];

  constructor(public translate: TranslateService, private w3cService: W3csService) {}

  ngOnInit() {
    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }
}
