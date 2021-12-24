import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { VirtualLibraryArticlesService } from "src/app/shared/services/virtual-library-articles/virtual-library-articles.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-virtual-library-artikel-terkini",
  templateUrl: "./virtual-library-artikel-terkini.component.html",
  styleUrls: ["./virtual-library-artikel-terkini.component.scss"],
})
export class VirtualLibraryArtikelTerkiniComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  virtual_library_article_category_id: string = "";
  vl_articles = [];
  showSelectedArticle: boolean = false;
  selectedArticle = {
    id: "",
    name_en: "",
    name_ms: "",
    description_en: "",
    description_ms: "",
    date: "",
    pdf_link: "",
  };

  constructor(
    public translate: TranslateService,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private virtuallibraryarticleService: VirtualLibraryArticlesService,
    private w3cService: W3csService
  ) {
    this.virtual_library_article_category_id = this.route.snapshot.paramMap.get(
      "category_id"
    );
    if (this.virtual_library_article_category_id) this.getData();
  }

  getData() {
    this.virtuallibraryarticleService
      .filter(
        "virtual_library_article_category_id" +
          this.virtual_library_article_category_id +
          "&status=true"
      )
      .subscribe(
        (res) => {
          console.log("res", res);
          this.vl_articles = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
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

  readMore(article) {
    this.showSelectedArticle = true;
    this.selectedArticle = article;
  }

  backArticle() {
    this.showSelectedArticle = false;
    this.selectedArticle = this.emptyArticle();
  }

  emptyArticle() {
    return {
      id: "",
      name_en: "",
      name_ms: "",
      description_en: "",
      description_ms: "",
      date: "",
      pdf_link: "",
    };
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
