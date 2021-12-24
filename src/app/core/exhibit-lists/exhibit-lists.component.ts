import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { ExhibitsService } from "src/app/shared/services/exhibits/exhibits.service";
import { ExhibitListsService } from "src/app/shared/services/exhibit-lists/exhibit-lists.service";

import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-exhibit-lists",
  templateUrl: "./exhibit-lists.component.html",
  styleUrls: ["./exhibit-lists.component.scss"],
})
export class ExhibitListsComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  exhibitlists = [
    // {
    //   title: "Langit & kita",
    //   description: "",
    //   img: "../../../assets/img/exhibit/langit-kita.jpeg",
    // },
    // {
    //   title: "Anti graviti",
    //   description: "",
    //   img: "../../../assets/img/exhibit/anti-graviti.jpeg",
    // },
    // {
    //   title: "Replika ahli falak",
    //   description: "",
    //   img: "../../../assets/img/exhibit/replika-ahli-falak.jpeg",
    // },
    // {
    //   title: "Spacepod",
    //   description: "",
    //   img: "../../../assets/img/exhibit/kembara-simulasi.jpeg",
    // },
  ];
  zone: string = "";

  constructor(
    public translate: TranslateService,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private exhibitService: ExhibitsService,
    private exhibitlistService: ExhibitListsService,
    private w3cService: W3csService
  ) {
    this.zone = this.route.snapshot.paramMap.get("zone");
    this.getExhibitList();
  }

  getExhibitList() {
    this.exhibitService.filter("zone=" + this.zone).subscribe(
      (res) => {
        console.log("res", res);
        if (res.length > 0) {
          this.exhibitlistService.filter("exhibit_id=" + res[0].id).subscribe(
            (res) => {
              console.log("res", res);
              this.exhibitlists = res;
            },
            (err) => {
              console.error("err", err);
            }
          );
        }
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
