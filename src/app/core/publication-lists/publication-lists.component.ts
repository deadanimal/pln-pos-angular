import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import swal from "sweetalert2";

import { PublicationsService } from "src/app/shared/services/publications/publications.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-publication-lists",
  templateUrl: "./publication-lists.component.html",
  styleUrls: ["./publication-lists.component.scss"],
})
export class PublicationListsComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  publication_category_id: string = "";
  publications = [];
  showSelectedPublication: boolean = false;
  selectedPublication = {
    title_en: "",
    title_ms: "",
    call_number: "",
    description_en: "",
    description_ms: "",
    abstract_en: "",
    abstract_ms: "",
    author_name: "",
    editor_name: "",
    publisher_name: "",
    published_date: "",
    isbn: "",
    issn: "",
    poster_link: "",
    pdf_link: "",
    year: "",
    edition: "",
    publication_category_id: "",
  };

  constructor(
    public translate: TranslateService,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private publicationService: PublicationsService,
    private w3cService: W3csService
  ) {
    this.publication_category_id = this.route.snapshot.paramMap.get("id");

    this.getPublication();
  }

  getPublication() {
    this.publicationService
      .filter("publication_category_id=" + this.publication_category_id)
      .subscribe(
        (res) => {
          console.log("res", res);
          this.publications = res;
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

  downloadPDF(publication) {
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

  openPublication(publication) {
    this.showSelectedPublication = true;
    this.selectedPublication = publication;
  }

  backPublication() {
    this.showSelectedPublication = false;
    this.selectedPublication = this.emptyPublication();
  }

  emptyPublication() {
    return {
      title_en: "",
      title_ms: "",
      call_number: "",
      description_en: "",
      description_ms: "",
      abstract_en: "",
      abstract_ms: "",
      author_name: "",
      editor_name: "",
      publisher_name: "",
      published_date: "",
      isbn: "",
      issn: "",
      poster_link: "",
      pdf_link: "",
      year: "",
      edition: "",
      publication_category_id: "",
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
