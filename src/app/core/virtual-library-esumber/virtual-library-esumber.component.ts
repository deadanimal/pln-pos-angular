import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { SubModulesService } from "src/app/shared/services/sub-modules/sub-modules.service";
import { VirtualLibraryESourceCategoriesService } from "src/app/shared/services/virtual-library-esource-categories/virtual-library-esource-categories.service";
import { VirtualLibraryESourcesService } from "src/app/shared/services/virtual-library-esources/virtual-library-esources.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-virtual-library-esumber",
  templateUrl: "./virtual-library-esumber.component.html",
  styleUrls: ["./virtual-library-esumber.component.scss"],
})
export class VirtualLibraryEsumberComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  submodule: any;
  vl_esumber_categories = [];
  vl_esumbers = [];
  virtual_library_collection_category_id: string = "";
  virtual_library_collection_id: string = "";

  constructor(
    public translate: TranslateService,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private submoduleService: SubModulesService,
    private virtuallibraryesourcecategoryService: VirtualLibraryESourceCategoriesService,
    private virtuallibraryesourceService: VirtualLibraryESourcesService,
    private w3cService: W3csService
  ) {
    this.virtual_library_collection_category_id = this.route.snapshot.paramMap.get(
      "category_id"
    );
    this.virtual_library_collection_id = this.route.snapshot.paramMap.get(
      "collection_id"
    );
    if (
      this.virtual_library_collection_category_id &&
      this.virtual_library_collection_id
    ) {
      this.getData();
      this.getESumber();
      this.getSubModule();
    }
  }

  getData() {
    this.virtuallibraryesourcecategoryService
      .filter(
        "virtual_library_collection_id=" +
          this.virtual_library_collection_id +
          "&status=true"
      )
      .subscribe(
        (res) => {
          console.log("res", res);
          this.vl_esumber_categories = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  getESumber() {
    this.virtuallibraryesourceService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.vl_esumbers = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
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
