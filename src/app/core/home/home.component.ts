import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { EventEmitterService } from "src/app/shared/services/event-emitter/event-emitter.service";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { ModulesService } from "src/app/shared/services/modules/modules.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";
import { ReportingService } from "src/app/shared/services/reporting/reporting.service";
import { DailyReports } from "src/app/shared/services/reporting/reporting.model";
import { map, tap, catchError } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;
  user_id: any;

  dailyReports: DailyReports[] = [];
  
  // Modules
  modules = [];
  /* modules = [
    {
      title: "Kembara Simulasi",
      link: "/simulator-ride",
      img: "../../../assets/home/icon/kembara-simulasi.jpeg",
    },
    {
      title: "Tayangan",
      link: "/shows",
      img: "../../../assets/home/icon/tayangan.jpeg",
    },
    {
      title: "Pameran",
      link: "/exhibit",
      img: "../../../assets/home/icon/pameran.jpeg",
    },
    {
      title: "Lawatan",
      link: "/visit",
      img: "../../../assets/home/icon/lawatan.jpeg",
    },
    {
      title: "Program Pendidikan",
      link: "/program",
      img: "../../../assets/home/icon/program-pendidikan.jpeg",
    },
    {
      title: "Maklum Balas",
      link: "/survey",
      img: "../../../assets/home/icon/maklum-balas.jpeg",
    },
    {
      title: "Fasiliti",
      link: "/facility",
      img: "../../../assets/home/icon/fasiliti.jpeg",
    },
    {
      title: "Penerbitan",
      link: "/publication",
      img: "../../../assets/home/icon/penerbitan.jpeg",
    },
    {
      title: "Kutubkhanah Mini",
      link: "/virtual-library",
      img: "../../../assets/home/icon/perpustakaan-maya.jpeg",
    },
  ]; */

  constructor(
    public translate: TranslateService,
    private authService: AuthService,
    private cartService: CartsService,
    private jwtService: JwtService,
    private moduleService: ModulesService,
    private w3cService: W3csService,
    private eventEmitterService: EventEmitterService,
    private reportingService: ReportingService,

  ) {
    this.getData();
    this.getAddToCartCount();
    this.updateCart();
  }

  updateCart() {
    this.eventEmitterService.updateCart();
  }



  getData() {
    this.moduleService.filter("").subscribe(
      (res) => {
        console.log("module", res);
        for (var i = 0; i < res.length; i++) {
          let title = res[i].title_en
          if (title == 'Facility' || title == 'Show' ||  title == 'Space Pod') {
            
            // override space mod module path -> by pass directly to booking page without touching db
            if (title == 'Space Pod') {
              res[i].module = "simulator-ride/simulator-ride-book";
              res[i].image_link = "assets/img/space_icon.jpeg";
            }

            // override facility module -> to booking page
            else if (title == 'Facility') {
              res[i].module = "bookings";
              res[i].image_link = "assets/img/facility_icon.jpeg";

            }

            // overide show module
            else if (title == 'Show') {
              console.log("masuk la kau");
              res[i].image_link = "assets/img/show_icon.jpg";

            }

            this.modules.push(res[i])
          }   
        }

      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  getAddToCartCount() {
    if (this.jwtService.getToken("accessToken")) {
      this.cartService
        .filter(
          "cart_status=CR&user=" + this.authService.decodedToken().user_id
        )
        .subscribe(
          (res) => {
            this.w3cService.changeAddToCartCount(res.length);
          },
          (err) => {
            console.error("err", err);
          }
        );
    }
  }

  checkReport() {
    let today_date = new Date().toJSON("yyyy-MM-dd").slice(0,10);
    this.reportingService.filter("user=" + this.user_id).pipe(map(x => x.filter(i => i.created_date.slice(0,10) == today_date 
      && i.status == "OP" ))).subscribe(
      (res) => {
        this.dailyReports = res;
        console.log("che", this.dailyReports);
      },
      (err) => {
        console.log(err);
      },
      () => {
        if (this.dailyReports.length == 0) {
          let opened_timestamp = new Date();

          let obj = {
            "user": this.user_id,
            "opened_timestamp": opened_timestamp,
            "status": "OP",
          }

          this.reportingService.post(obj).subscribe(
            (res) => {
              console.log(res);
            },
            (err) => {

            },
            () => {

            });
        }
      });
  }

  ngOnInit() {

    this.user_id = this.authService.decodedToken().user_id;
    this.w3cService.currentFontSize.subscribe((fontSize) => {
      this.fontSize = fontSize;
    });

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
    this.updateCart();
    this.checkReport();
  }
}
