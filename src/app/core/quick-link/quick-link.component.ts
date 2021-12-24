import { Component, OnInit } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

import { QuickLinkCategoriesService } from "src/app/shared/services/quick-link-categories/quick-link-categories.service";
import { QuickLinksService } from "src/app/shared/services/quick-links/quick-links.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-quick-link",
  templateUrl: "./quick-link.component.html",
  styleUrls: ["./quick-link.component.scss"],
})
export class QuickLinkComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  quicklinks = [];

  // Dropdown
  categories = [];

  constructor(
    public translate: TranslateService,
    private quicklinkcategoryService: QuickLinkCategoriesService,
    private quicklinkService: QuickLinksService,
    private w3cService: W3csService
  ) {
    this.getCategory();
    this.getData();
  }

  getCategory() {
    this.quicklinkcategoryService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.categories = res;
        for (let i = 0; i < this.categories.length; i++) {
          this.categories[i].show = false;
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getData() {
    this.quicklinkService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.quicklinks = res;
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

  showMore(index: number) {
    this.categories[index].show = !this.categories[index].show;
  }
}
