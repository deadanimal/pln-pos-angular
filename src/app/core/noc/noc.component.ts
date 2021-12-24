import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { DynamicContentsService } from "src/app/shared/services/dynamic-contents/dynamic-contents.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-noc",
  templateUrl: "./noc.component.html",
  styleUrls: ["./noc.component.scss"],
  // encapsulation: ViewEncapsulation.None,
})
export class NocComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  dynamiccontents = [];
  nodes: any = [
    {
      name: "",
      cssClass: "",
      image: "",
      title: "Jawatankuasa Astronomi Kebangsaan (JAK)",
      childs: [
        {
          name: "",
          cssClass: "",
          image: "",
          title: "National Outreach Coordinator (NOC)",
          childs: [
            {
              name: "",
              cssClass: "",
              image: "",
              title: "Planetarium",
            },
            {
              name: "",
              cssClass: "",
              image: "",
              title: "Balai Cerap",
            },
            {
              name: "",
              cssClass: "",
              image: "",
              title: "Organisasi Bukan Kerajaan",
            },
          ],
        },
        {
          name: "",
          cssClass: "",
          image: "",
          title: "National Capacity Building Committee (CBC)",
        },
      ],
    },
  ];

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
