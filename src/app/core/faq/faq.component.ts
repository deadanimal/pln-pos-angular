import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

import { FaqsService } from "src/app/shared/services/faqs/faqs.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FaqComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  customClass = "customClass";
  faqs = [];

  constructor(
    public translate: TranslateService,
    private faqService: FaqsService,
    private w3cService: W3csService
  ) {
    this.getData();
  }

  getData() {
    this.faqService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.faqs = res;
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
