import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { InvoiceReceiptsService } from "src/app/shared/services/invoice-receipts/invoice-receipts.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-receipt",
  templateUrl: "./receipt.component.html",
  styleUrls: ["./receipt.component.scss"],
})
export class ReceiptComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;
  
  // Data
  invoice_receipt_id: string = "";
  invoicereceipts = [];
  summarycarts = [];
  totalprice: number = 0;
  user: any;

  // Dropdown
  simulatorridedays = [
    {
      value: "MON",
      display_name_en: "Monday",
      display_name_ms: "Isnin",
    },
    {
      value: "TUE",
      display_name_en: "Tuesday",
      display_name_ms: "Selasa",
    },
    {
      value: "WED",
      display_name_en: "Wednesday",
      display_name_ms: "Rabu",
    },
    {
      value: "THU",
      display_name_en: "Thursday",
      display_name_ms: "Khamis",
    },
    {
      value: "FRI",
      display_name_en: "Friday",
      display_name_ms: "Jumaat",
    },
    {
      value: "SAT",
      display_name_en: "Saturday",
      display_name_ms: "Sabtu",
    },
    {
      value: "SUN",
      display_name_en: "Sunday",
      display_name_ms: "Ahad",
    },
  ];
  simulatorriderounds = [
    {
      value: "P1",
      display_name_en: "Round 1",
      display_name_ms: "Pusingan 1",
    },
    {
      value: "P2",
      display_name_en: "Round 2",
      display_name_ms: "Pusingan 2",
    },
    {
      value: "P3",
      display_name_en: "Round 3",
      display_name_ms: "Pusingan 3",
    },
    {
      value: "P4",
      display_name_en: "Round 4",
      display_name_ms: "Pusingan 4",
    },
    {
      value: "P5",
      display_name_en: "Round 5",
      display_name_ms: "Pusingan 5",
    },
  ];
  ticketcategories = [
    {
      value: "AD",
      display_name_en: "Adult",
      display_name_ms: "Dewasa",
    },
    {
      value: "KD",
      display_name_en: "Children",
      display_name_ms: "Kanak-kanak",
    },
    {
      value: "OF",
      display_name_en: "Senior citizen",
      display_name_ms: "Warga emas",
    },
    {
      value: "SD",
      display_name_en: "Student",
      display_name_ms: "Pelajar",
    },
    {
      value: "OK",
      display_name_en: "OKU",
      display_name_ms: "OKU",
    },
  ];

  constructor(
    public translate: TranslateService,
    private authService: AuthService,
    private invoicereceiptService: InvoiceReceiptsService,
    private jwtService: JwtService,
    private route: ActivatedRoute,
    private userService: UsersService,
    private w3cService: W3csService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.invoice_receipt_id = params.receiptId;
      if (this.invoice_receipt_id) this.getInvoiceReceipt();
    });

    this.getUser();
  }

  getUser() {
    if (this.jwtService.getToken("accessToken")) {
      this.userService.get(this.authService.decodedToken().user_id).subscribe(
        (res) => {
          // console.log("res", res);
          this.user = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  getInvoiceReceipt() {
    this.invoicereceiptService
      .extended("id=" + this.invoice_receipt_id)
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.invoicereceipts = res;
          this.getBookingDetail(this.invoicereceipts[0].cart_id);
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  getBookingDetail(carts) {
    for (let i = 0; i < carts.length; i++) {
      // to check if show_booking_id have a value
      if (carts[i].show_booking_id.length > 0) {
        this.summarycarts.push(this.summaryShowing(carts[i].show_booking_id));
      }
      // to check if simulator_ride_booking_id have a value
      else if (carts[i].simulator_ride_booking_id.length > 0) {
        this.summarycarts.push(
          this.summarySimulatorRide(carts[i].simulator_ride_booking_id)
        );
      }

      // to calculate total price of all carts
      if (i === carts.length - 1) {
        this.calculateTotalPriceAllCart();
      }
    }
  }

  summaryShowing(show_booking_id) {
    let array = [];
    for (let i = 0; i < show_booking_id.length; i++) {
      let obj = {
        ticket_category_en: this.getTicketCategory(
          show_booking_id[i].ticket_category,
          "en"
        ),
        ticket_category_ms: this.getTicketCategory(
          show_booking_id[i].ticket_category,
          "ms"
        ),
        ticket_seat: show_booking_id[i].ticket_seat,
        showing_title_en: show_booking_id[i].show_id.title_en,
        showing_title_ms: show_booking_id[i].show_id.title_ms,
        showing_duration_hours: show_booking_id[i].show_id.duration_hours,
        showing_duration_minutes: show_booking_id[i].show_id.duration_minutes,
        showtime_show_date: show_booking_id[i].showtime_id.show_date,
        showtime_show_time: show_booking_id[i].showtime_id.show_time,
        total_price: +show_booking_id[i].total_price,
        type: "showing",
        showing_poster_link: show_booking_id[i].show_id.poster_link,
      };
      array.push(obj);
    }
    return array;
  }

  summarySimulatorRide(simulator_ride_booking_id) {
    let array = [];
    for (let i = 0; i < simulator_ride_booking_id.length; i++) {
      let obj = {
        ticket_category_en: this.getTicketCategory(
          simulator_ride_booking_id[i].ticket_category,
          "en"
        ),
        ticket_category_ms: this.getTicketCategory(
          simulator_ride_booking_id[i].ticket_category,
          "ms"
        ),
        simulator_ride_time:
          simulator_ride_booking_id[i].simulator_ride_time_id.time,
        simulator_ride_day_en: this.getSimulatorRideDay(
          simulator_ride_booking_id[i].simulator_ride_time_id.day,
          "en"
        ),
        simulator_ride_day_ms: this.getSimulatorRideDay(
          simulator_ride_booking_id[i].simulator_ride_time_id.day,
          "ms"
        ),
        simulator_ride_round_en: this.getSimulatorRideRound(
          simulator_ride_booking_id[i].simulator_ride_time_id.round,
          "en"
        ),
        simulator_ride_round_ms: this.getSimulatorRideRound(
          simulator_ride_booking_id[i].simulator_ride_time_id.round,
          "ms"
        ),
        total_price: +simulator_ride_booking_id[i].total_price,
        type: "simulator-ride",
      };
      array.push(obj);
    }
    return array;
  }

  calculatoPriceEachCart(summarycarts) {
    let total_price = 0;
    for (let i = 0; i < summarycarts.length; i++) {
      total_price += +summarycarts[i].total_price;
    }
    return total_price.toFixed(2);
  }

  calculateTotalPriceAllCart() {
    for (let i = 0; i < this.summarycarts.length; i++) {
      for (let j = 0; j < this.summarycarts[i].length; j++) {
        this.totalprice += +this.summarycarts[i][j].total_price;
      }
    }
  }

  ngOnInit() {
    this.w3cService.currentFontSize.subscribe((fontSize) => {
      this.fontSize = fontSize;
    });

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }

  getSimulatorRideDay(value: string, lang: string) {
    let result = this.simulatorridedays.find((obj) => {
      return obj.value == value;
    });
    if (result && lang == "en") return result.display_name_en;
    if (result && lang == "ms") return result.display_name_ms;
  }

  getSimulatorRideRound(value: string, lang: string) {
    let result = this.simulatorriderounds.find((obj) => {
      return obj.value == value;
    });
    if (result && lang == "en") return result.display_name_en;
    if (result && lang == "ms") return result.display_name_ms;
  }

  getTicketCategory(value: string, lang: string) {
    let result = this.ticketcategories.find((obj) => {
      return obj.value == value;
    });
    if (result && lang == "en") return result.display_name_en;
    if (result && lang == "ms") return result.display_name_ms;
  }
}
