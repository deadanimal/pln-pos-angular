import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { ShowbookingsService } from "src/app/shared/services/showbookings/showbookings.service";
import { SimulatorRideBookingsService } from "src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service";
import { VouchersService } from "src/app/shared/services/vouchers/vouchers.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";
import { EventEmitterService } from "src/app/shared/services/event-emitter/event-emitter.service";
import { DataServiceService } from "src/app/shared/services/data-service/data-service.service";
import { FacilitiesService } from "src/app/shared/services/facilities/facilities.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";
import { Facility } from "src/app/shared/services/facilities/facilities.model";
import { InvoiceReceiptsService } from "src/app/shared/services/invoice-receipts/invoice-receipts.service";
import { InvoiceReceipt } from "src/app/shared/services/invoice-receipts/invoice-receipts.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;
  
  // Data
  message: number; 
  user_id: string = "";
  carts = [];
  summarycarts = [];
  vouchers = [];
  voucher_id: string = "";
  voucher_code: string = "";
  voucher_amount: any;
  done_voucher_verify: boolean = false;
  totalprice: number = 0;
  queryParams: any;
  facility: Facility[] = [];

  // Invoice Receipt
  invoiceReceipt: InvoiceReceipt[] = [];

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

  // share price value to other component
  @Output() cartCalculatedEvent = new EventEmitter<number>();

  constructor(
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private router: Router,
    private authService: AuthService,
    private cartService: CartsService,
    private showbookingService: ShowbookingsService,
    private simulatorridebookingService: SimulatorRideBookingsService,
    private voucherService: VouchersService,
    private w3cService: W3csService,
    private eventEmitterService: EventEmitterService,
    private data: DataServiceService,
    private facilitiesService: FacilitiesService,
    private facilityBookingsService: FacilityBookingsService,
    private invoicereceiptService: InvoiceReceiptsService,
    public toastr: ToastrService,

  ) {
    this.getCart();
    this.getVoucher();

    this.done_voucher_verify = false;
  }

  getVoucher() {
    this.voucherService
      .get()
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.vouchers = res;
          console.log("vouchers", this.vouchers);
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

   // to get cart detail
  getCart() {
    // reset voucher if previous transaction use voucher
    this.done_voucher_verify = false;
    this.voucher_code = "";


    this.cartService
      .extended(
        "cart_status=CR&user=" + this.authService.decodedToken().user_id
      )
      .subscribe(
        (res) => {
          this.w3cService.changeAddToCartCount(res.length);
          this.carts = res;
          this.getBookingDetail();
          this.calculateTotalPriceAllCart() 

        },
        (err) => {
          console.error("err", err);
        });
  }

  getBookingDetail() {
    this.summarycarts = [];
    console.log("len carts", this.carts.length);
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

      // to check if facility_booking_id have a value
      else if (this.carts[i].facility_booking_id.length > 0) {
        this.summarycarts.push(
          this.summaryFacility(this.carts[i].facility_booking_id)
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

  summaryFacility(facility_booking_id) {
    // make request by id to get facility details to display on cart
    this.facilitiesService.filter("id" + facility_booking_id[0].id).subscribe(
      (res) => {
        this.facility = res;
      }
    );

    let array = [];
    for (let i = 0; i < facility_booking_id.length; i++) {
      let obj = {
        facility_name: this.facility[0].name_ms,
        organisation_name: facility_booking_id[i].organisation_name,
        booking_date: facility_booking_id[i].booking_date,
        booking_days: facility_booking_id[i].booking_days,
        total_price: +facility_booking_id[i].total_price,

        type: "facilities",
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

    this.cartCalculatedEvent.emit(total_price);
    return total_price.toFixed(2);
  }

  calculateTotalPriceAllCart() {
    this.totalprice = 0;
    // look up this function -> need to update properly
    for (let i = 0; i < this.summarycarts.length; i++) {
      for (let j = 0; j < this.summarycarts[i].length; j++) {
        this.totalprice += +this.summarycarts[i][j].total_price;
        console.log("tp", this.totalprice);
        this.total_price_before_voucher = this.totalprice;
      }
    }

    // push totalprice to event bus 
    // to be used by payment component
    this.data.changeMessage(this.totalprice);

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
    } else if (cart.facility_booking_id.length > 0) {
      child_array = cart.facility_booking_id;
      child_type = "facilities";
    }
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
                  //location.reload();
                  this.summarycarts = [];
                  this.totalprice = 0;
                  this.getCart();
                  this.calculateTotalPriceAllCart() 
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
                    this.summarycarts = [];
                    this.totalprice = 0;
                    this.getCart();
                    this.calculateTotalPriceAllCart() 
                  }
                }
              );

          } else if (child_type == "facilities") {
            // this.facilityBookingsService
            //   .delete(child_array[i].id)
            //   .subscribe(
            //     (res) => {

            //     },
            //     (err) => {

            //     },
            //     () => {
            //       if (i === child_array.length - 1) {
            //         this.summarycarts = [];
            //         this.totalprice = 0;
            //         this.getCart();
            //         this.calculateTotalPriceAllCart() 
            //       }
            //     }
            //   );
            
            if (i === child_array.length - 1) {
                this.summarycarts = [];
                this.totalprice = 0;
                this.getCart();
                this.calculateTotalPriceAllCart() 
              }
          }
        }
      }
    );


  }

  checkVoucherCode() {
    this.getVoucher();
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
          
          // update total price value at event bus
          // to be used by payment component
          this.data.changeMessage(this.totalprice);

          // to update done_voucher_verify to true
          this.done_voucher_verify = true;
        }
      } else {
        if (this.voucher_code.length == 0) {

        } else {
          this.toastr.error(
            this.translate.instant("Kod tidak sah"),
            "Ralat"
          );

          this.total_price_after_voucher = this.totalprice;
        }
        
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

                    console.log("cart id push ka tida", cart_id);
                    if (cart_id.length > 0) {
                      let obj = {
                        type: 'T',
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

                      console.log("obj", obj);
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
                                  this.router.navigate(["app/cash-payment"], {
                                    queryParams: { id: this.queryParams },
                                  });
                                }
                              );
                          } else {
                            this.router.navigate(["app/cash-payment"], {
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
              console.log("cart id push ka tida", cart_id);
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
                        this.router.navigate(["app/cash-payment"], {
                          queryParams: { id: this.queryParams },
                        });
                      }
                    );
                  } else {
                    this.router.navigate(["app/cash-payment"], {
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
    this.user_id = this.authService.decodedToken().user_id;

    this.w3cService.currentFontSize.subscribe((fontSize) => {
      this.fontSize = fontSize;
    });

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );

    // subscribe and call this method if event get called
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeCartComponentFunction.subscribe(() => {
        this.getCart(); 
      });
    }

    this.data.currentMessage.subscribe(message => this.message = message)
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
}
