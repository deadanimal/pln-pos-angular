import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

import { DynamicContentsService } from "src/app/shared/services/dynamic-contents/dynamic-contents.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-mission-vision",
  templateUrl: "./mission-vision.component.html",
  styleUrls: ["./mission-vision.component.scss"],
  // encapsulation: ViewEncapsulation.None,
})
export class MissionVisionComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  dynamiccontents = [];

  constructor(
    public translate: TranslateService,
    private dynamiccontentService: DynamicContentsService,
    private w3cService: W3csService,
    private router: Router
  ) {
    this.getData();
  }

  getData() {
    this.dynamiccontentService
      .filter("status=true&category=" + this.router.url.replace("/", ""))
      .subscribe(
        (res) => {
          console.log("res", res);
          this.dynamiccontents = res;
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
}
