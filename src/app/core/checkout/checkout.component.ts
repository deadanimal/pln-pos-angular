import { Component, OnInit } from "@angular/core"; import { EventEmitterService } from "src/app/shared/services/event-emitter/event-emitter.service"; import { HttpClient } from "@angular/common/http"; import { FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms"; import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "src/environments/environment";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { Cart } from "src/app/shared/services/carts/carts.model";
import { InvoiceReceiptsService } from "src/app/shared/services/invoice-receipts/invoice-receipts.service"; import { SimulatorRideBookingsService } from "src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service"; import { VouchersService } from "src/app/shared/services/vouchers/vouchers.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";
import { CashPaymentService } from "src/app/shared/services/cash-payment/cash-payment.service";
import { CashTransactions } from "src/app/shared/services/cash-payment/cash-payment.model";
import { ShowbookingsService } from "src/app/shared/services/showbookings/showbookings.service";

import { ShowingsService } from "src/app/shared/services/showings/showings.service";
import { ShowtimesService } from "src/app/shared/services/showtimes/showtimes.service";
import { Showing } from "src/app/shared/services/showings/showings.model";

import { SimulatorRidesService } from "src/app/shared/services/simulator-rides/simulator-rides.service";
import { SimulatorRideTimesService } from "src/app/shared/services/simulator-ride-times/simulator-ride-times.service";
import { SimulatorRide } from "src/app/shared/services/simulator-rides/simulator-rides.model";


import { NgxSpinnerService } from "ngx-spinner";
import * as data from "src/app/shared/imagebyte/img.json";
import * as data2 from "src/app/shared/imagebyte/img2.json";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import JsBarcode from 'jsbarcode/bin/JsBarcode'


import * as FileSaver from 'file-saver';
import { map, tap, catchError } from "rxjs/operators";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  //Others
  imageUrl: any; 
  unix_ts : number;

  //Transaction
  received: any = 0;
  changed: any = 0;
  invoice_running_no: any;
  current_date = new Date();

  //Showings
  showing: Showing[] = [];
  simulator_ride: SimulatorRide[] = [];

  // Receipts
  receipt_id: string;
  ticket_array_show: any[] = [];
  ticket_array_space: any[] = [];

  ticket_array_show_data: any[] = [];
  ticket_array_space_data: any[] = [];

  // PdfMake
  spaceTicketContent = [];
  showTicketContent = [];
  bookingDatas = [];

  cart_id: any[] = [];
  
  // CSS class
  fontSize: string;
  themeColor: string;
  
  // Data
  carts: Cart[] = [];
  amount_change: string;
  user_id: string = "";
  summarycarts = [];
  vouchers = [];
  voucher_id: string = "";
  voucher_code: string = "";
  voucher_amount: any;
  done_voucher_verify: boolean = false;
  totalprice: number = 0;
  queryParams: any;

  cash_trx: CashTransactions[] = [];

  // Price
  total_price_before_voucher: number = 0;
  total_voucher: number = 0;
  total_price_after_voucher: number = 0;


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

  enumArray = {
    "AD": "Dewasa",
    "KD": "Kanak-kanak",
    "OF": "Warga Emas",
    "SD": "Student",
    "OK": "OKU"
  }

  constructor(
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private router: Router,
    private authService: AuthService,
    private cartService: CartsService,
    private invoicereceiptService: InvoiceReceiptsService,
    private showbookingService: ShowbookingsService,
    private simulatorridebookingService: SimulatorRideBookingsService,
    private voucherService: VouchersService,
    private w3cService: W3csService,
    private cashPaymentService: CashPaymentService,
    private eventEmitterService: EventEmitterService,
    private showbookingsservice: ShowbookingsService,
    private route: ActivatedRoute,
    private showingService: ShowingsService,
    private simulatorRideService: SimulatorRidesService,
    private simulatorRideTimesServices: SimulatorRideTimesService,
    private showtimesService: ShowtimesService,
    private ngxSpinner: NgxSpinnerService,

  ) {
    this.getCart();
    this.getVoucher();
    this.getChangeAmount();
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  getChangeAmount() {
    let user_id = this.authService.decodedToken().user_id
    this.cashPaymentService.filter("user="+ user_id).subscribe(
      (res) => {
        this.amount_change = res[0].amount_change;
      },
      (err) => {
      },
      () => {
      }
    )
  }

  getVoucher() {
    this.voucherService
      .filter("status=NU&user=" + this.authService.decodedToken().user_id)
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.vouchers = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  // to get cart detail
  getCart() {
    this.cartService
      .extended(
        "cart_status=CR&user=" + this.authService.decodedToken().user_id
      )
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.w3cService.changeAddToCartCount(res.length);
          this.carts = res;
          this.getBookingDetail();
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  getBookingDetail() {
    for (let i = 0; i < this.carts.length; i++) {
      // to check if show_booking_id have a value
      if (this.carts[i].show_booking_id.length > 0) {
        this.summarycarts.push(
          this.summaryShowing(this.carts[i].show_booking_id)
        );
      }
      // to check if simulator_ride_booking_id have a value
      else if (this.carts[i].simulator_ride_booking_id.length > 0) {
        this.summarycarts.push(
          this.summarySimulatorRide(this.carts[i].simulator_ride_booking_id)
        );
      }

      // to calculate total price of all carts
      if (i === this.carts.length - 1) {
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
        this.total_price_before_voucher = this.totalprice;
      }
    }
  }

  // to delete many2manyfield and other table that linked with many2manyfield
  clickDeleteCart(cart) {
    let child_array: any;
    let child_type: string;
    if (cart.show_booking_id.length > 0) {
      child_array = cart.show_booking_id;
      child_type = "showing";
    } else if (cart.simulator_ride_booking_id.length > 0) {
      child_array = cart.simulator_ride_booking_id;
      child_type = "simulator-ride";
    }

    swal
      .fire({
        icon: "info",
        title: this.translate.instant("BuangItem"),
        text: this.translate.instant("BuangItemDeskripsi"),
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: this.translate.instant("Ya"),
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-light",
        },
        cancelButtonText: this.translate.instant("Tidak"),
      })
      .then((result) => {
        if (result.value) {
          this.cartService.delete(cart.id).subscribe(
            (res) => {
              // console.log("res", res);
            },
            (err) => {
              console.error("error", err);
            },
            () => {
              for (let i = 0; i < child_array.length; i++) {
                if (child_type == "showing") {
                  this.showbookingService.delete(child_array[i].id).subscribe(
                    (res) => {
                      // console.log("res", res);
                    },
                    (err) => {
                      console.error("err", err);
                    },
                    () => {
                      if (i === child_array.length - 1) {
                        location.reload();
                      }
                    }
                  );
                } else if (child_type == "simulator-ride") {
                  this.simulatorridebookingService
                    .delete(child_array[i].id)
                    .subscribe(
                      (res) => {
                        // console.log("res", res);
                      },
                      (err) => {
                        console.error("err", err);
                      },
                      () => {
                        if (i === child_array.length - 1) {
                          location.reload();
                        }
                      }
                    );
                }
              }
            }
          );
        }
      });
  }

  checkVoucherCode() {
    this.voucher_code = this.voucher_code.toUpperCase();
    if (this.carts.length > 0) {
      if (this.voucher_code.length == 10 && !this.done_voucher_verify) {
        let result = this.vouchers.find((obj) => {
          return obj.voucher_code == this.voucher_code;
        });
        if (result) {
          this.voucher_id = result.id;
          this.voucher_code = result.voucher_code;
          this.total_voucher = result.voucher_amount;
          this.voucher_amount = { value: this.total_voucher };

          // to update total price after voucher inserted
          this.totalprice = this.totalprice - this.total_voucher;
          this.total_price_after_voucher = this.totalprice;

          // to update done_voucher_verify to true
          this.done_voucher_verify = true;
        }
      } else {
        this.total_price_after_voucher = this.totalprice;
      }
    }
  }

  clickMakePayment() {
    // trigger checkVoucherCode even the voucher is not inserted
    this.checkVoucherCode();

    // to check if invoice is existing and status is IC - Invoice Created
    this.invoicereceiptService
      .filter("status=IC&user=" + this.authService.decodedToken().user_id)
      .subscribe(
        (res) => {
          // console.log("res", res);
          if (res.length > 0) {
            res.forEach((obj, index) => {
              this.invoicereceiptService.delete(obj.id).subscribe(
                (res) => {
                  // console.log("res", res);
                },
                (err) => {
                  console.error("err", err);
                },
                () => {
                  if (index === res.length - 1) {
                    // to create new invoice after deleted old invoice which status is IC on table invoice_receipt
                    let cart_id = [];
                    this.carts.forEach((obj) => {
                      cart_id.push(obj.id);
                    });
                    if (cart_id.length > 0) {
                      let obj = {
                        invoice_created_datetime: this.getCurrentDateTime(),
                        user: this.authService.decodedToken().user_id,
                        cart_id: cart_id,
                        total_price_before_voucher: this.total_price_before_voucher.toFixed(
                          2
                        ),
                        total_voucher: this.total_voucher.toFixed(2),
                        total_price_after_voucher: this.total_price_after_voucher.toFixed(
                          2
                        ),
                        voucher_id: this.voucher_id,
                      };
                      this.invoicereceiptService.post(obj).subscribe(
                        (res) => {
                          // console.log("res", res);
                          this.queryParams = res.id;
                        },
                        (err) => {
                          console.error("err", err);
                        },
                        () => {
                          // to update the status code of voucher if the voucher code is used
                          if (this.voucher_id) {
                            let obj = {
                              status: "AU",
                            };
                            this.voucherService
                              .update(obj, this.voucher_id)
                              .subscribe(
                                (res) => {
                                  // console.log("res", res);
                                },
                                (err) => {
                                  console.error("err", err);
                                },
                                () => {
                                  this.router.navigate(["/payment"], {
                                    queryParams: { id: this.queryParams },
                                  });
                                }
                              );
                          } else {
                            this.router.navigate(["/payment"], {
                              queryParams: { id: this.queryParams },
                            });
                          }
                        }
                      );
                    }
                  }
                }
              );
            });
          }
          // to create new invoice if the invoice still not exist in the database
          else {
            let cart_id = [];
            this.carts.forEach((obj) => {
              cart_id.push(obj.id);
            });
            if (cart_id.length > 0) {
              let obj = {
                invoice_created_datetime: this.getCurrentDateTime(),
                user: this.authService.decodedToken().user_id,
                cart_id: cart_id,
                total_price_before_voucher: this.total_price_before_voucher.toFixed(
                  2
                ),
                total_voucher: this.total_voucher,
                total_price_after_voucher: this.total_price_after_voucher.toFixed(
                  2
                ),
                voucher_id: this.voucher_id,
              };
              this.invoicereceiptService.post(obj).subscribe(
                (res) => {
                  // console.log("res", res);
                  this.queryParams = res.id;
                },
                (err) => {
                  console.error("err", err);
                },
                () => {
                  // to update the status code of voucher if the voucher code is used
                  if (this.voucher_id) {
                    let obj = {
                      status: "AU",
                    };
                    this.voucherService.update(obj, this.voucher_id).subscribe(
                      (res) => {
                        // console.log("res", res);
                      },
                      (err) => {
                        console.error("err", err);
                      },
                      () => {
                        this.router.navigate(["/payment"], {
                          queryParams: { id: this.queryParams },
                        });
                      }
                    );
                  } else {
                    this.router.navigate(["/payment"], {
                      queryParams: { id: this.queryParams },
                    });
                  }
                }
              );
            }
          }
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  ngOnInit() {
    this.unix_ts = this.current_date.setHours(this.current_date.getHours());
    this.current_date = new Date(this.unix_ts);
    this.ngxSpinner.show();
    this.user_id = this.authService.decodedToken().user_id;

    this.w3cService.currentFontSize.subscribe((fontSize) => {
      this.fontSize = fontSize;
    });

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );

    // loading a while


    // get receipt and ticket id
    this.invoicereceiptService.filter("status=PS&user=" + this.user_id).subscribe(
      (res) => {
        console.log("resss", res);
        this.invoice_running_no = res[res.length - 1].invoice_running_no
        this.cashPaymentService.filter("id="+res[res.length - 1].cash_transaction_id).subscribe(
          (res) => {
            console.log("trx data", res);
            this.received = res[0].amount_receive
            this.changed = res[0].amount_change


          },
          (err) => {
            console.log("err", err);

          }
        );
        
        // sorting to make sure every transaction is tallied
        res.sort((a, b) => a.payment_successful_datetime < b.payment_successful_datetime ? -1 : a.payment_successful_datetime > b.payment_successful_datetime ? 1 : 0)
        this.cart_id = res[res.length - 1].cart_id;
        this.receipt_id = res[res.length - 1].id;

      },
      (err) => {
        console.log(err);
      },
      () => {
      
        for (let i = 0; i < this.cart_id.length; i++) {
          this.cartService.getOne(this.cart_id[i]).subscribe(
            (res) => {
              if ( res.show_booking_id.length > 0) {
                for (let j = 0; j < res.show_booking_id.length; j++) {
                  this.ticket_array_show.push(res.show_booking_id[j]);
                  this.ticket_array_show_data.push(res);
                }
                
              } else if ( res.simulator_ride_booking_id.length > 0) {
                for (let k = 0; k < res.simulator_ride_booking_id.length; k++) {
                  this.ticket_array_space.push(res.simulator_ride_booking_id[k]);
                  this.ticket_array_space_data.push(res);

                }

              }

            },
            (err) => {
              console.log(err);
            }

          );
        }
        this.ngxSpinner.hide();
      });

  }

  getCurrentDateTime() {
    let selectedDate = new Date();
    let year = selectedDate.getFullYear();
    let month =
      selectedDate.getMonth() + 1 < 10
        ? "0" + (selectedDate.getMonth() + 1)
        : selectedDate.getMonth() + 1;
    let day =
      selectedDate.getDate() < 10
        ? "0" + selectedDate.getDate()
        : selectedDate.getDate();
    let formatDate = year + "-" + month + "-" + day;

    let hour =
      selectedDate.getHours() < 10
        ? "0" + selectedDate.getHours()
        : selectedDate.getHours();
    let minute =
      selectedDate.getMinutes() < 10
        ? "0" + selectedDate.getMinutes()
        : selectedDate.getMinutes();
    let second =
      selectedDate.getSeconds() < 10
        ? "0" + selectedDate.getSeconds()
        : selectedDate.getSeconds();
    let formatTime = hour + ":" + minute + ":" + second;

    return formatDate + "T" + formatTime + "Z";
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

  clickSelesai() {
    // update cart status from created(CR) to complete(CM)
    this.cartService.filter("cart_status=CR&user="+this.user_id).subscribe(
      (res) => { this.carts = res },
      (err) => {},
      () => {

        let body = {" cart_status": "CM "} 
        for (let i = 0; i < this.carts.length; i++) {
          this.cartService.update(body, this.carts[i].id).subscribe(
            (res)=> { console.log(res) },
            (err)=> {}
          );
        }

      }
    );

    // quick patch only !
    // makesure all request is succesful before navigating to homepage
    setTimeout(() => {
      this.eventEmitterService.updateCart();
      this.router.navigate(["/app/home"]);
    }, 1000);
  }

  cetakTiket() {

    for (let i = 0; i < this.ticket_array_show.length; i++) {

      this.showbookingsservice.generateTicket("id=" + this.ticket_array_show[i]).subscribe(
        (res) => {                                                             
          let filename: string;
          filename = "Tiket Tayangan.pdf"                                               
          FileSaver.saveAs(res, filename)                                      
        },                                                                     
        (err) => {                                                             
          console.log(err)                                                     
      });                                                                    

    } 

    for (let i = 0; i < this.ticket_array_space.length; i++) {
      this.simulatorridebookingService.generateTicket("id=" + this.ticket_array_space[i]).subscribe(
        (res) => {                                                             
          let filename: string;
          filename = "Tiket Kembara.pdf"                                               
          FileSaver.saveAs(res, filename)                                      
        },                                                                     
        (err) => {                                                             
          console.log(err)                                                     
      });                                                                    
    } 

    
  }

  cetakTiket2() {

    this.ngxSpinner.show();
    let booking_data: any;
    let booking_meta_data: any;
    let booking_meta_data_2: any;

      for (let i = 0; i < this.ticket_array_space.length; i++) {
        let booking_data: any;
        let booking_meta_data: any;
        let booking_meta_data_2: any;

        this.simulatorridebookingService.getOne(this.ticket_array_space[i]).subscribe(
          (res) => {                                                             
            console.log(res);
            booking_data = res;
          },                                                                     
          (err) => {                                                             
            console.log(err)                                                     
          },
          () => {
            this.simulatorRideTimesServices.getOne(booking_data.simulator_ride_time_id).subscribe(
              (res) => {
                console.log(res);
                booking_meta_data = res;
              },
              (err) => {
                console.log(err);
              },
              () => {
                this.populateSpaceTicketContent(booking_data, booking_meta_data);
              }
            );

          }
        );                                                                    
      } 

    
    for (let i = 0; i < this.ticket_array_show.length; i++) {
      let booking_data: any;
      let booking_meta_data: any;
      let booking_meta_data_2: any;

      this.showbookingService.getOne(this.ticket_array_show[i]).subscribe(
        (res) => {                                                             
          console.log(res);
          booking_data = res;
        },                                                                     
        (err) => {                                                             
          console.log(err)                                                     
        },
        () => {
          this.showtimesService.getOne(booking_data.showtime_id).subscribe(
            (res) => {
              console.log(res);
              booking_meta_data = res;
            },
            (err) => {
              console.log(err);
            },
            () => {
              //console.log(booking_data, booking_meta_data);
              //this.generateShowTicket(booking_data, booking_meta_data);
              this.showingService.getOne(booking_data.show_id).subscribe(
                (res)=> {
                  console.log(res);
                  booking_meta_data_2 = res;
                },
                (err) => {
                  console.log(err);
                },
                () => {
                  this.populateShowTicketContent(booking_data, booking_meta_data, booking_meta_data_2);
                }
              );
            }
          );
        }
      );                                                                    
    } 
    

   
  }

  cetakResit() {
    let c = this.changed;
    let r = this.received;
    let ir = this.invoice_running_no;
    let imgs = data.image_byte;
    let imgs_2 = data.image_byte_2;


    let product_list = []
    let price_list = []

    for (let i = 0; i < this.ticket_array_show.length; i++) {
      console.log("show booked", this.ticket_array_show);

      this.showbookingsservice.getOne(this.ticket_array_show[i]).subscribe(
        (res) => {                                                             

          price_list.push(res.total_price);
          this.showingService.filter("id=" + res.show_id).subscribe(
            (res) => {
              product_list.push(res[0].title_ms);
            },

            (err) => {
              console.log("err", err);
            }
          );
          
        },                                                                     
        (err) => {                                                             
          console.log(err)                                                     
      });                                                                    

    } 

    for (let i = 0; i < this.ticket_array_space.length; i++) {
      console.log("space booked", this.ticket_array_space);

      this.simulatorridebookingService.getOne(this.ticket_array_space[i]).subscribe(
        (res) => {                                                             

          price_list.push(res.total_price);
          this.simulatorRideService.filter("id=" + res.simulator_ride_time_id).subscribe(
            (res) => {
              product_list.push(res[0].title);
            },

            (err) => {
              console.log("err", err);
            }
          );


        },                                                                     
        (err) => {                                                             
          console.log(err)                                                     
      });                                                                    
    } 

    let current_date = this.current_date;

    let timeout_delay = (product_list.length > 20) ? 1000 : 5000;


    setTimeout(function () {
      let total = price_list.reduce((a, b) => +a + +b, 0)
      
      // construct table body
      let table_body = [["Item","Harga"]]
      for (let i=0; i < product_list.length; i++) {
        let temp = [];
        temp.push(product_list[i], price_list[i]);
        table_body.push(temp);
      }

      // append total price
      table_body.push(["Jumlah", total + ".00"])

      console.log("tb", table_body);

      // pdfmake
      var dd = {
        pageSize: {
        width: 200,
        height: 400
        },

        content: [
          {columns: [

          {
			      image: imgs_2, 			     
            width: 50,
			      height: 50,
		      },
          {
            text: ' '
          },
          {
			      image: imgs, 			     
            width: 50,
			      height: 50,
		      }]},


          {text: 'Planetarium Negara \nKementerian Sains, Teknologi dan Inovasi\n(MOSTI)', alignment: 'center', style: 'header'},
          {text: 'RESIT BAYARAN', alignment: 'center', style: 'header'},


          // sub-header
          {lineHeight: 2, text: 'Tarikh: ' + new Date().toJSON().slice(0,10).split('-').reverse().join('/'), style: 'sub_header'},
          {lineHeight: 2, text: 'No. Resit: ' + ir, style: 'sub_header'},

          // product-detail
          {
            style: 'table',
            table: {
            headerRows: 1,
            widths: '*',
            body: table_body
            },
          },

          // page breaker
          //
          {text: '   ', alignment: 'center', style: 'pagebreaker'},
          {text: 'Tunai Diterima: RM' + r , style: 'sub_header'},
          {text: 'Baki: RM' + c, style: 'sub_header'},

          // footer
          //
          {text: '   ', alignment: 'center', style: 'pagebreaker2'},
          {text: 'Tel: 603-22734301', style: 'header_no_bold'},
          {text: 'info@planet.gov.my', style: 'header_no_bold'},
          {text: 'www.planetariumnegara.gov.my', style: 'header_no_bold'},

          // page breaker
          {text: '...', alignment: 'center', style: 'pagebreaker'},




          
        ],

        styles: {
      		qr: {
      			margin: [0, 30, 0, 30]
      	  },

      		header: {
      			fontSize: 8,
      			bold: true,
      			margin: [0, 20, 0, 5]
      	  },

          header_no_bold: {
      			fontSize: 8,
      			margin: [0, 0, 0, 0]
      	  },
          sub_header: {
      			fontSize: 8,
      			margin: [0, 0, 0, 0]
      	  },
          sub_header_end: {
      			fontSize: 8,
      			margin: [0, 200, 0, 0]
      	  },
          table: {
            fontSize: 8,
            margin: [0, 0, 0, 0],
            padding: [0, 0, 0, 0]

          },
          pagebreaker: {
            fontSize: 5,
            margin: [0, 10, 0, 0],
          },
          pagebreaker2: {
            fontSize: 5,
            margin: [0, 10, 0, 0],
          },


        }


      };

       (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
      pdfMake
        .createPdf(dd)
        .download("Resit Bayaran " + current_date + ".pdf");


       (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
      pdfMake
        .createPdf(dd)
        .print();



      
    }, timeout_delay);

  }

  populateShowTicketContent(booking_data, booking_meta_data, booking_meta_data_2) {
    let imgs = data.image_byte;
    let imgs_2 = data.image_byte_2;
    //let qr_array = [booking_meta_data_2.id, booking_data.user_id];
    //let qr_array = [booking_meta_data_2.id];
    let qr_array = [booking_data.ticket_number];
    let qr_string = qr_array.join("|");
    let status_kerakyatan = (booking_data.ticket_type == "CZ") ? "Ya" : "Bukan";

  
    // push logo into content
    this.showTicketContent.push({columns: [{image: imgs_2,width: 50,height: 50},{text: ' '},{image: imgs,width: 50,height: 50,}]})

    // push title & header into content
    this.showTicketContent.push({text: 'Planetarium Negara \nKementerian Sains, Teknologi dan Inovasi (MOSTI)', alignment: 'center', style: 'header'})
    this.showTicketContent.push({text: 'TIKET TAYANGAN', alignment: 'center', style: 'header'})

    this.showTicketContent.push({text: ' ', style: 'sub_header'})

    // push ticket details
    this.showTicketContent.push({text: 'Tajuk Tayangan: ' + booking_meta_data_2.title_en , style: 'sub_header'})
    this.showTicketContent.push({text: 'Tiket Kategori: ' + this.enumArray[booking_data.ticket_category] , style: 'sub_header'})
    this.showTicketContent.push({text: 'Tarikh Tayangan: ' + new Date(booking_meta_data.show_date).toJSON().slice(0,10).split('-').reverse().join('/'), style: 'sub_header'})
    this.showTicketContent.push({text: 'Masa Tayangan: ' + booking_meta_data.show_time , style: 'sub_header'})
    this.showTicketContent.push({text: 'Tempat: Teater Angkasa' , style: 'sub_header'})
    this.showTicketContent.push({text: 'No. Tempat Duduk: ' + booking_data.ticket_seat , style: 'sub_header'})
    this.showTicketContent.push({text: 'No. Tiket: ' + booking_data.ticket_number , style: 'sub_header'})
    //this.showTicketContent.push({text: 'Warganegara: ' + status_kerakyatan , style: 'sub_header'})
    this.showTicketContent.push({text: 'Harga: RM' + booking_data.price , style: 'sub_header'})

    this.showTicketContent.push({text: ' ', style: 'sub_header'})
    
    // footer
    this.showTicketContent.push({ qr: qr_string, fit: '65', alignment: 'center', style: 'qr'  }),

    this.showTicketContent.push({text: ' ', style: 'sub_header'})
    this.showTicketContent.push({text: 'Tel: 603-22734301', style: 'header_no_bold'})
    this.showTicketContent.push({text: 'info@planet.gov.my', style: 'header_no_bold'})
    this.showTicketContent.push({text: 'www.planetariumnegara.gov.my', style: 'header_no_bold'})

    this.showTicketContent.push({text: ' ', style: 'sub_header'})
    //this.showTicketContent.push({image: this.textToBase64Barcode(booking_data.id), width: 120, height: 30 }),
    console.log(this.ticket_array_show.length);


    if (this.showTicketContent.length == 19*this.ticket_array_show.length) {
      this.generateShowTicket();
    }

  }


  populateSpaceTicketContent(booking_data, meta_data) {
    this.bookingDatas.push(booking_data);
    console.log("tiket data", booking_data);

    let imgs = data.image_byte;
    let imgs_2 = data.image_byte_2;
    let status_kerakyatan = (booking_data.ticket_type == "CZ") ? "Ya" : "Bukan";

    // predefined  url -> change before push to live or staging env
    let qr_string = "https://api.planetariumnegara.gov.my/v1/simulator-ride-tickets/display_ticket?id=" + booking_data.id;  
    // push logo into content
    this.spaceTicketContent.push({columns: [{image: imgs_2,width: 50,height: 50},{text: ' '},{image: imgs,width: 50,height: 50,}]})

    // push title & header into content
    this.spaceTicketContent.push({text: 'Planetarium Negara \nKementerian Sains, Teknologi dan Inovasi (MOSTI)', alignment: 'center', style: 'header'})
    this.spaceTicketContent.push({text: 'TIKET KEMBARA', alignment: 'center', style: 'header'})

    // push ticket details
    this.spaceTicketContent.push({text: 'Tarikh: ' + new Date(booking_data.booking_date).toJSON().slice(0,10).split('-').reverse().join('/'), style: 'sub_header'})
    this.spaceTicketContent.push({text: 'Masa: ' + meta_data.time , style: 'sub_header'})
    this.spaceTicketContent.push({text: 'No. Tempat Duduk: S1/S2 ' , style: 'sub_header'})
    this.spaceTicketContent.push({text: 'No. Tiket: ' + booking_data.ticket_number , style: 'sub_header'})
    this.spaceTicketContent.push({text: 'Warganegara: ' + status_kerakyatan , style: 'sub_header'})
    this.spaceTicketContent.push({text: 'Jumlah: RM' + booking_data.total_price , style: 'sub_header'})
    this.spaceTicketContent.push({text: ' ', style: 'sub_header'})
    
    // footer
    this.spaceTicketContent.push({qr: qr_string, fit: '100', alignment: 'center', style: 'qr'  }),
    this.spaceTicketContent.push({text: ' ', style: 'sub_header'})
    this.spaceTicketContent.push({text: ' ', style: 'sub_header'})
    this.spaceTicketContent.push({text: ' ', style: 'sub_header'})
    this.spaceTicketContent.push({text: 'Tel: 603-22734301', style: 'header_no_bold'})
    this.spaceTicketContent.push({text: 'info@planet.gov.my', style: 'header_no_bold'})
    this.spaceTicketContent.push({text: 'www.planetariumnegara.gov.my', style: 'header_no_bold'})

    if (this.spaceTicketContent.length == 17*this.ticket_array_space.length) {
      this.generateSpaceTicket();
      let spaceTicketChunks = this.sliceIntoChunks(this.spaceTicketContent, 17);

        for (let i = 0; i<spaceTicketChunks.length; i++) {
          spaceTicketChunks[i].shift(); //logo
          //spaceTicketChunks[i].shift(); //logo 2

          let temp = [];
          temp.push({columns: [{image: imgs_2,width: 50,height: 50},{text: ' '},{image: imgs,width: 50,height: 50,}]})
          temp = temp.concat(spaceTicketChunks[i]);

          let booking_data = this.bookingDatas[i];
          var dds = {
            pageSize: {
            width: 200,
            height: 400
            },

          content: temp
            , 
            styles: {
              qr: {
          			margin: [0, 5, 0, 0]
          	  },

          		header: {
          			fontSize: 8,
          			bold: true,
          			margin: [0, 0, 0, 0]
          	  },

              header_no_bold: {
          			fontSize: 8,
          			margin: [0, 0, 0, 0]
          	  },
              sub_header: {
          			fontSize: 8,
          			margin: [0, 0, 0, 0]
          	  },
              sub_header_end: {
          			fontSize: 8,
          			margin: [0, 0, 0, 0]
          	  },
              table: {
                fontSize: 8,
                margin: [0, 0, 0, 0],
                padding: [0, 0, 0, 0]

              },
              pagebreaker: {
                fontSize: 5,
                margin: [0, 0, 0, 0],
              },

            }


          };


          pdfMake
            .createPdf(dds)
            .getDataUrl((dataUrl) => {

              let body = {
                "ticket_booking_id": booking_data.id,
                "ticket_link": dataUrl
              }

              console.log("submit ", body)

              this.simulatorridebookingService.submit_ticket(body).subscribe(
                (res) => {
                  console.log(res);
                },
                (err) => {
                  console.log(err);
                }
              );

            });


        }


      


    }



  }


  generateSpaceTicket() {
    let ticketContent = this.spaceTicketContent;

    var dd = {
        pageSize: {
        width: 200,
        height: 400
        },

      content: ticketContent 
        , 
        styles: {
          qr: {
      			margin: [0, 5, 0, 0]
      	  },

      		header: {
      			fontSize: 8,
      			bold: true,
      			margin: [0, 0, 0, 0]
      	  },

          header_no_bold: {
      			fontSize: 8,
      			margin: [0, 0, 0, 0]
      	  },
          sub_header: {
      			fontSize: 8,
      			margin: [0, 0, 0, 0]
      	  },
          sub_header_end: {
      			fontSize: 8,
      			margin: [0, 0, 0, 0]
      	  },
          table: {
            fontSize: 8,
            margin: [0, 0, 0, 0],
            padding: [0, 0, 0, 0]

          },
          pagebreaker: {
            fontSize: 5,
            margin: [0, 0, 0, 0],
          },

        }


      };

      // initiate printing job
      pdfMake
        .createPdf(dd)
        .download("Tiket Kembara " + this.current_date + ".pdf");


      pdfMake
        .createPdf(dd)
        .print();



     //  (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
     // pdfMake
     //   .createPdf(dd)
     //   .getDataUrl((dataUrl) => {

     //     let body = {
     //       "ticket_booking_id": booking_data.id,
     //       "ticket_link": dataUrl
     //     }

     //     console.log(body)

     //     this.simulatorridebookingService.submit_ticket(body).subscribe(
     //       (res) => {
     //         console.log(res);
     //       },
     //       (err) => {
     //         console.log(err);
     //       }
     //     );

     //   });


    //TODO
    //get the pdf array
    //split into length 
    //for each blocks -> create pdf -> get data url -> send to api -> store in db
    
    //console.log(this.spaceTicketContent);
    //let spaceTicketChunks = this.sliceIntoChunks(this.spaceTicketContent, 16);

    //for (let i = 0; i<spaceTicketChunks.length; i++) {
    //  spaceTicketChunks[i].shift();
    //  spaceTicketChunks[i].shift();
    //  var dds = {
    //    pageSize: {
    //    width: 200,
    //    height: 400
    //    },

    //  content: spaceTicketChunks[i]
    //    , 
    //    styles: {
    //      qr: {
    //  			margin: [0, 5, 0, 0]
    //  	  },

    //  		header: {
    //  			fontSize: 8,
    //  			bold: true,
    //  			margin: [0, 0, 0, 0]
    //  	  },

    //      header_no_bold: {
    //  			fontSize: 8,
    //  			margin: [0, 0, 0, 0]
    //  	  },
    //      sub_header: {
    //  			fontSize: 8,
    //  			margin: [0, 0, 0, 0]
    //  	  },
    //      sub_header_end: {
    //  			fontSize: 8,
    //  			margin: [0, 0, 0, 0]
    //  	  },
    //      table: {
    //        fontSize: 8,
    //        margin: [0, 0, 0, 0],
    //        padding: [0, 0, 0, 0]

    //      },
    //      pagebreaker: {
    //        fontSize: 5,
    //        margin: [0, 0, 0, 0],
    //      },

    //    }


    //  };


    //  pdfMake
    //    .createPdf(dds)
    //    .getDataUrl((dataUrl) => {

    //      let body = {
    //        "ticket_booking_id": booking_data.id,
    //        "ticket_link": dataUrl
    //      }

    //      console.log("submit ", body)

    //      this.simulatorridebookingService.submit_ticket(body).subscribe(
    //        (res) => {
    //          console.log(res);
    //        },
    //        (err) => {
    //          console.log(err);
    //        }
    //      );

    //    });


    //}

    this.ngxSpinner.hide();

          
  }

  sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
  }


  generateShowTicket() {
    let ticketContent = this.showTicketContent;

    var dd = {
        pageSize: {
        width: 200,
        height: 400
        },

      content: ticketContent 
        , 
        styles: {
          qr: {
      			margin: [0, 5, 0, 5]
      	  },

      		header: {
      			fontSize: 8,
      			bold: true,
      			margin: [0, 0, 0, 0]
      	  },

          header_no_bold: {
      			fontSize: 8,
      			margin: [0, 0, 0, 0]
      	  },
          sub_header: {
      			fontSize: 8,
      			margin: [0, 0, 0, 0]
      	  },
          sub_header_end: {
      			fontSize: 8,
      			margin: [0, 0, 0, 0]
      	  },
          table: {
            fontSize: 8,
            margin: [0, 0, 0, 0],
            padding: [0, 0, 0, 0]

          },
          pagebreaker: {
            fontSize: 5,
            margin: [0, 0, 0, 0],
          },

        }


      };

      // initiate printing job
     (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
      pdfMake
        .createPdf(dd)
        .download("Tiket Tayangan " + this.current_date + ".pdf");


       (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
      pdfMake
        .createPdf(dd)
        .print();

      this.ngxSpinner.hide();
  }


  
  generateShowTicketDeprecated(booking_data, booking_meta_data, booking_meta_data_2) {
    // generate qr array 
    let qr_array = ["PLN"+new Date().getFullYear(),booking_data.ticket_number,booking_meta_data.id, booking_meta_data_2.id, booking_data.user_id];
    console.log("qr array", qr_array);

    let qr_string = qr_array.join("|");
    console.log("qr string", qr_string)

    
    // generate pdf
    let imgs = data.image_byte;
    let imgs_2 = data.image_byte_2;

    var dd = {
        pageSize: {
        width: 200,
        height: 400
        },

        content: [

          {columns: [

          {
			      image: imgs_2, 			     
            width: 50,
			      height: 50,
		      },
          {
            text: ' '
          },
          {
			      image: imgs, 			     
            width: 50,
			      height: 50,
		      }]},
          {text: 'Planetarium Negara \nKementerian Sains, Teknologi dan Inovasi\n(MOSTI)', alignment: 'center', style: 'header'},
          
          // title
          {text: 'TIKET TAYANGAN', alignment: 'center', style: 'header'},

          // detail ticket
          //
          {text: 'Tajuk Tayangan: ' + booking_meta_data_2.title_en , style: 'sub_header'},
          {text: 'Tiket Kategori: ' + this.enumArray[booking_data.ticket_category] , style: 'sub_header'},
          {text: 'Tarikh Tayangan: ' + new Date(booking_meta_data.show_date).toJSON().slice(0,10).split('-').reverse().join('/'), style: 'sub_header'},
          {text: 'Masa Tayangan: ' + booking_meta_data.show_time , style: 'sub_header'},

          {text: 'Tempat: Teater Angkasa' , style: 'sub_header'},
          {text: 'No. Tempat Duduk: ' + booking_data.ticket_seat , style: 'sub_header'},
          {text: 'No. Tiket: ' + booking_data.ticket_number , style: 'sub_header'},
          {text: 'Harga: RM' + booking_data.price , style: 'sub_header'},

          // footer
          { qr: qr_string, fit: '120', alignment: 'center', style: 'qr'  },
          {text: 'Tel: 603-22734301', style: 'header_no_bold'},
          {text: 'info@planet.gov.my', style: 'header_no_bold'},
          {text: 'www.planetariumnegara.gov.my', style: 'header_no_bold'},


          // page breaker
          {text: '...', alignment: 'center', style: 'pagebreaker'},

        ],

        styles: {
          qr: {
      			margin: [0, 2, 0, 2]
      	  },

      		header: {
      			fontSize: 8,
      			bold: true,
      			margin: [0, 2, 0, 2]
      	  },

          header_no_bold: {
      			fontSize: 8,
      			margin: [0, 0, 0, 0]
      	  },
          sub_header: {
      			fontSize: 8,
      			margin: [0, 0, 0, 0]
      	  },
          sub_header_end: {
      			fontSize: 8,
      			margin: [0, 200, 0, 0]
      	  },
          table: {
            fontSize: 8,
            margin: [0, 0, 0, 0],
            padding: [0, 0, 0, 0]

          },
          pagebreaker: {
            fontSize: 5,
            margin: [0, 50, 0, 0],
          },

        }


      };

      // initiate printing job
       (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
      pdfMake
        .createPdf(dd)
        .print();


  }

  // receipt data already created in BE on previous step
  // deprecated
  cetakResitOld() {
    this.invoicereceiptService.generateReceipt("id=" + this.receipt_id).subscribe(
      (res) => {
        let filename: string;
        filename = "resit.pdf"
        FileSaver.saveAs(res, filename)
      },
      (err) => {
        console.log(err);
      });

  }
  textToBase64Barcode(text){
    console.log("called");
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {format: "CODE39"});
    return canvas.toDataURL("image/png");
  }

}
