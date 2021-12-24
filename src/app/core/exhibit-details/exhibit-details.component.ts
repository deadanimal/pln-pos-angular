import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from "ngx-gallery-9";
import { Observable } from "rxjs";

import { ExhibitDetailsService } from "src/app/shared/services/exhibit-details/exhibit-details.service";
import { ExhibitDetailImagesService } from "src/app/shared/services/exhibit-detail-images/exhibit-detail-images.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";


@Component({
  selector: "app-exhibit-details",
  templateUrl: "./exhibit-details.component.html",
  styleUrls: ["./exhibit-details.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ExhibitDetailsComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  exhibit_detail_id: string = "";
  exhibitdetails = [];
  exhibitdetailimages = [];
  exhibitdetailimages$: Observable<any>;

  // Modal
  readmoreModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog",
    backdrop: false,
    ignoreBackdropClick: true,
  };

  // Ngx Gallery
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    public translate: TranslateService,
    private metaTagService: Meta,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private exhibitdetailService: ExhibitDetailsService,
    private exhibitdetailimageService: ExhibitDetailImagesService,
    private w3cService: W3csService
  ) {
    this.exhibit_detail_id = this.route.snapshot.paramMap.get("detail");
    this.getExhibitDetail();
  }

  getExhibitDetail() {
    this.exhibitdetailService
      .filter("exhibit_list_id=" + this.exhibit_detail_id)
      .subscribe(
        (res) => {
          console.log("res", res);
          this.exhibitdetails = res;
          this.getExhibitImage(res[0].id);
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  getExhibitImage(exhibit_detail_id) {
    this.exhibitdetailimageService
      .filter("exhibit_detail_id=" + exhibit_detail_id)
      .subscribe(
        (res) => {
          console.log("res", res);
          this.transformImage(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  transformImage(result) {
    let array = [];
    for (let i = 0; i < result.length; i++) {
      let image = {
        small: result[i].exhibit_detail_image,
        medium: result[i].exhibit_detail_image,
        big: result[i].exhibit_detail_image,
      };
      array.push(image);
    }
    this.exhibitdetailimages = array;
  }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: "100%",
        height: "600px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageArrows: false,
        thumbnailsArrows: false,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    this.addMetaTag();

    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }

  openReadMoreModal(modalDefault: TemplateRef<any>) {
    this.readmoreModal = this.modalService.show(modalDefault, this.default);
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
