import {
  Component,
  OnInit,
  Renderer2,
  HostListener,
  Inject,
} from "@angular/core";
import { Location } from "@angular/common";
import { DOCUMENT } from "@angular/common";
import { NavigationStart, NavigationEnd, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { CanonicalService } from "./shared/canonical/canonical.service";

declare let gtag: Function;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  subscription: Subscription;

  constructor(
    private renderer: Renderer2,
    public location: Location,
    @Inject(DOCUMENT) document,
    private router: Router,
    public translate: TranslateService,
    private canonicalService: CanonicalService
  ) {
    this.translate.addLangs(["en", "ms"]);
    this.translate.setDefaultLang("ms");
    this.translate.use("ms");

    // zoom 
    document.body.style.zoom = "100%";

    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // console.log("navigationStart");
      }
    });

    // Google Analytics
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event.urlAfterRedirects);
        gtag("config", "G-QD8NVBEQQ3", {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    if (window.pageYOffset > 300) {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.remove("navbar-transparent");
        element.classList.add("bg-default");
      }
    } else {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.add("navbar-transparent");
        element.classList.remove("bg-default");
      }
    }
  }

  ngOnInit() {
    this.onWindowScroll(event);
    this.canonicalService.setCanonicalURL();
  }
}
