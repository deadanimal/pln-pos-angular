import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import swal from "sweetalert2";

import { ModulesService } from "src/app/shared/services/modules/modules.service";
import { PublicationCategoriesService } from "src/app/shared/services/publication-categories/publication-categories.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-publication",
  templateUrl: "./publication.component.html",
  styleUrls: ["./publication.component.scss"],
})
export class PublicationComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  module: any;
  publicationcategories = [];

  constructor(
    public translate: TranslateService,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private publicationcategoryService: PublicationCategoriesService,
    private moduleService: ModulesService,
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

    this.getPublicationCategory();
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

  getPublicationCategory() {
    this.publicationcategoryService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.publicationcategories = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  openAfterDownload() {
    swal.fire({
      icon: "success",
      title: "Terima kasih kerana memuat turun informasi daripada kami",
      text:
        "Sila tunggu sebentar. Muat turun anda akan berlangsung sebentar lagi",
      buttonsStyling: false,
      confirmButtonText: "Tutup",
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
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
