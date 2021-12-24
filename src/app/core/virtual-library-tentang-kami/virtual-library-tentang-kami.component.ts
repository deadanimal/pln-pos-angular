import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { SubModulesService } from "src/app/shared/services/sub-modules/sub-modules.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-virtual-library-tentang-kami",
  templateUrl: "./virtual-library-tentang-kami.component.html",
  styleUrls: ["./virtual-library-tentang-kami.component.scss"],
})
export class VirtualLibraryTentangKamiComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  submodule: any;

  constructor(
    public translate: TranslateService,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private submoduleService: SubModulesService,
    private w3cService: W3csService
  ) {
    this.getSubModule();
  }

  getSubModule() {
    if (this.router.url.includes("arkib-kutubkhanah")) {
      this.submoduleService.filter("submodule=arkib-kutubkhanah").subscribe(
        (res) => {
          // console.log("res", res);
          this.submodule = res[0];
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
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
