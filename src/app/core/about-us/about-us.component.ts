import {
  Component,
  OnInit,
  HostListener,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { DynamicContentsService } from "src/app/shared/services/dynamic-contents/dynamic-contents.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AboutUsComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  dynamiccontents = [];
  establishedYear = 1994;
  year: number = 0;

  // Screen size
  screenWidth: any;
  screenHeight: any;

  constructor(
    public translate: TranslateService,
    private dynamiccontentService: DynamicContentsService,
    private w3cService: W3csService,
    private router: Router
  ) {
    this.year = new Date().getFullYear() - this.establishedYear;

    this.getData();
  }

  getData() {
    this.dynamiccontentService
      .filter("status=true&category=" + this.router.url.replace("/", ""))
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.dynamiccontents = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    this.w3cService.currentFontSize.subscribe((fontSize) => {
      this.fontSize = fontSize;
    });

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
}
