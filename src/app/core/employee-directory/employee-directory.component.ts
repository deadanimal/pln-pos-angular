import { Component, OnInit } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

import { EmployeeDirectoriesService } from "src/app/shared/services/employee-directories/employee-directories.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-employee-directory",
  templateUrl: "./employee-directory.component.html",
  styleUrls: ["./employee-directory.component.scss"],
})
export class EmployeeDirectoryComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  employeedirectories = [];
  param: any;

  // Dropdown
  departments = [
    {
      value: "PPP",
      display_name_ms: "Pejabat Pengarah Planetarium Negara",
      display_name_en: "Office of the Director of the National Planetarium",
    },
    {
      value: "UPA",
      display_name_ms: "Unit Perhubungan Awam",
      display_name_en: "Public Relations Unit",
    },
    {
      value: "SPP",
      display_name_ms: "Seksyen Pendidikan - Pameran",
      display_name_en: "Education Section - Exhibition",
    },
    {
      value: "SPC",
      display_name_ms: "Seksyen Pendidikan - Pencerapan",
      display_name_en: "Education Section - Observation",
    },
    {
      value: "SPB",
      display_name_ms: "Seksyen Pendidikan - Pembudayaan",
      display_name_en: "Education Section - Cultivation",
    },
    {
      value: "UTK",
      display_name_ms: "Unit Teknikal",
      display_name_en: "Technical Unit",
    },
    {
      value: "SPK",
      display_name_ms: "Seksyen Perkhidmatan",
      display_name_en: "Services Unit",
    },
    {
      value: "UKW",
      display_name_ms: "Unit Kewangan",
      display_name_en: "Financial Unit",
    },
    {
      value: "UTM",
      display_name_ms: "Unit Teknologi Maklumat",
      display_name_en: "Information Technology Unit",
    },
    {
      value: "UPF",
      display_name_ms: "Unit Pengurusan Fasiliti",
      display_name_en: "Facilities Management Unit",
    },
    {
      value: "UPT",
      display_name_ms: "Unit Pentadbiran",
      display_name_en: "Administration Unit",
    },
  ];

  constructor(
    public translate: TranslateService,
    private employeedirectoryService: EmployeeDirectoriesService,
    private w3cService: W3csService
  ) {
    this.getEmployeeDirectory();
  }

  getEmployeeDirectory() {
    this.employeedirectoryService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.employeedirectories = res;
        this.param = { value: this.employeedirectories.length };
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

  getDepartment(value: string) {
    let result = this.departments.find((obj) => {
      return obj.value == value;
    });
    if (this.translate.currentLang == 'en') return result.display_name_en;
    if (this.translate.currentLang == 'ms') return result.display_name_ms;
  }
}
