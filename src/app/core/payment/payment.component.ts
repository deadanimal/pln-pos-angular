import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { BankListsService } from "src/app/shared/services/bank-lists/bank-lists.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { FpxTransactionsService } from "src/app/shared/services/fpx-transactions/fpx-transactions.service";
import { InvoiceReceiptsService } from "src/app/shared/services/invoice-receipts/invoice-receipts.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { RedirectService } from "src/app/shared/services/redirect/redirect.service";
import { ShowbookingsService } from "src/app/shared/services/showbookings/showbookings.service";
import { SimulatorRideBookingsService } from "src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  invoice_receipt_id: string = "";
  user_id: string = "";
  timeout: number = 0;
  totalprice: number = 0;
  fpx_confirm: any;
  fpx_created: any;
  banklists = [];
  banklistfromdb = [];
  banklistfromfpx = [];

  // FormGroup
  paymentdetailFormGroup: FormGroup;
  fpxtransactionFormGroup: FormGroup; // Request Message - AR

  constructor(
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private banklistService: BankListsService,
    private cartService: CartsService,
    private fpxtransactionService: FpxTransactionsService,
    private invoicereceiptService: InvoiceReceiptsService,
    private jwtService: JwtService,
    private redirectService: RedirectService,
    private showbookingService: ShowbookingsService,
    private simulatorridebookingService: SimulatorRideBookingsService,
    private userService: UsersService,
    private w3cService: W3csService
  ) {
    this.getUser();
    this.getBankList();

    this.paymentdetailFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      full_name: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      payment_method: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      bank_selected: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });

    this.fpxtransactionFormGroup = this.formBuilder.group({
      fpx_msgType: new FormControl(""),
      fpx_msgToken: new FormControl(""),
      fpx_sellerExId: new FormControl(""),
      fpx_sellerExOrderNo: new FormControl(""),
      fpx_sellerTxnTime: new FormControl(""),
      fpx_sellerOrderNo: new FormControl(""),
      fpx_sellerId: new FormControl(""),
      fpx_sellerBankCode: new FormControl(""),
      fpx_txnCurrency: new FormControl(""),
      fpx_txnAmount: new FormControl(0),
      fpx_buyerEmail: new FormControl(""),
      fpx_checkSum: new FormControl(""),
      fpx_buyerName: new FormControl(""),
      fpx_buyerBankId: new FormControl(""),
      fpx_buyerBankBranch: new FormControl(""),
      fpx_buyerAccNo: new FormControl(""),
      fpx_buyerId: new FormControl(""),
      fpx_makerName: new FormControl(""),
      fpx_buyerIban: new FormControl(""),
      fpx_productDesc: new FormControl(""),
      fpx_version: new FormControl(""),
      fpx_eaccountNum: new FormControl(""),
      fpx_ebuyerId: new FormControl(""),
    });
  }

  getUser() {
    if (this.jwtService.getToken("accessToken")) {
      this.userService.get(this.authService.decodedToken().user_id).subscribe(
        (res) => {
          // console.log("res", res);
          this.paymentdetailFormGroup.patchValue({
            ...res,
            id: "",
          });
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  getBankList() {
    this.banklistService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.banklistfromdb = res;
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.fpxtransactionService.fpx_get_bank_list().subscribe(
          (res) => {
            // console.log("res", res);
            this.banklistfromfpx = Object.entries(res);
          },
          (err) => {
            console.error("err", err);
          },
          () => {
            // to filter the active bank from FPX and DB
            this.banklistfromdb.filter((obj_db) => {
              this.banklistfromfpx.filter((obj_fpx) => {
                // obj_fpx[0] : Bank ID
                // obj_fpx[1] : Bank Active
                // A - Active
                // B - Blocked
                if (obj_db.bank_id == obj_fpx[0] && obj_fpx[1] == "A") {
                  this.banklists.push(obj_db);
                }
              });
            });
          }
        );
      }
    );
  }

  ngOnInit() {
    this.user_id = this.authService.decodedToken().user_id;

    this.route.queryParams.subscribe((params) => {
      this.invoice_receipt_id = params.id;

      // to check if the invoice and receipt belongs to the person who logged in
      this.invoicereceiptService
        .extended("id=" + this.invoice_receipt_id)
        .subscribe(
          (res) => {
            // console.log("res", res);
            this.totalprice = res[0].total_price_after_voucher;
            this.getInvoiceCreatedDateTime(
              res[0].invoice_created_datetime,
              res[0].id,
              res[0].cart_id
            );

            if (res[0].user.id != this.user_id) {
              this.toastr.error(
                "Harap maaf. Anda perlu log masuk terlebih dahulu untuk membuat bayaran.",
                "Ralat"
              );
              this.router.navigate(["/landing"]);
            }
          },
          (err) => {
            console.error("err", err);
          }
        );
    });

    this.w3cService.currentFontSize.subscribe((fontSize) => {
      this.fontSize = fontSize;
    });

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }

  getInvoiceCreatedDateTime(invoice_created_datetime, id, cart) {
    // to get datetime from invoice_created_datetime
    let date = invoice_created_datetime.substring(0, 10);
    let time = invoice_created_datetime.substring(11, 19);
    var datetime15min = new Date(date + "T" + time);

    // add more security - detect first GMT +08:00 for Malaysia Time
    var currentdatetime = new Date();

    // add 15 minute for payment timeout
    datetime15min.setMinutes(datetime15min.getMinutes() + 15);

    // get diff_minutes and times with 60 to get seconds
    this.timeout = this.diff_minutes(currentdatetime, datetime15min) * 60;

    // to delete show booking, simulator ride booking, cart, and invoice receipt if timeout more than 15 minutes
    if (this.timeout > 900) {
      let cart_id = [];
      let show_booking_id = [];
      let simulator_ride_booking_id = [];
      cart.forEach((obj) => {
        cart_id.push(obj.id);
        if (obj.show_booking_id.length > 0) {
          obj.show_booking_id.forEach((obj) => {
            show_booking_id.push(obj.id);
          });
        }
        if (obj.simulator_ride_booking_id.length > 0) {
          obj.simulator_ride_booking_id.forEach((obj) => {
            simulator_ride_booking_id.push(obj.id);
          });
        }
      });

      let obj = {
        id,
        cart_id,
        show_booking_id,
        simulator_ride_booking_id,
      };

      this.invoicereceiptService.delete_invoice_receipt(obj).subscribe(
        (res) => {
          // console.log("res", res);
        },
        (err) => {
          console.error("err", err);
        },
        () => {
          this.toastr.error(
            "Harap maaf. Tempahan anda terbatal kerana tidak membayar dalam masa 15 minit.",
            "Ralat"
          );
          this.router.navigate(["/landing"]);
        }
      );
    }
  }

  diff_minutes(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  selectPaymentMethod(payment_method: string) {
    this.paymentdetailFormGroup.patchValue({
      payment_method,
    });
  }

  submitPayment() {
    let body = {
      fpx_buyerBankId: this.paymentdetailFormGroup.value.bank_selected,
      fpx_buyerEmail:
        this.paymentdetailFormGroup.value.email.length <= 50
          ? this.paymentdetailFormGroup.value.email
          : "",
      fpx_buyerName:
        this.paymentdetailFormGroup.value.full_name.length <= 40
          ? this.paymentdetailFormGroup.value.full_name
          : "",
      fpx_txnAmount: this.totalprice,
    };
    // To generate checksum and other information for FPX from backend
    this.fpxtransactionService.fpx_confirm(body).subscribe(
      (res) => {
        // console.log("res", res);
        this.fpxtransactionFormGroup.patchValue({
          ...res,
        });
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        // To submit the generated information from backend into fpx_transaction table
        this.fpxtransactionService
          .post(this.fpxtransactionFormGroup.value)
          .subscribe(
            (res) => {
              // console.log("res", res);
              this.fpx_created = res;
            },
            (err) => {
              console.error("err", err);
            },
            () => {
              // to update fpx_transaction_id on table invoice_receipt
              let obj = {
                pending_payment_datetime: this.getCurrentDateTime(),
                fpx_transaction_id: this.fpx_created.id,
                status: "PP",
              };
              this.invoicereceiptService
                .update(obj, this.invoice_receipt_id)
                .subscribe(
                  (res) => {
                    // console.log("res", res);
                  },
                  (err) => {
                    console.error("err", err);
                  },
                  () => {
                    this.redirectService.post(
                      this.fpxtransactionFormGroup.value,
                      "https://uat.mepsfpx.com.my/FPXMain/seller2DReceiver.jsp"
                    );
                  }
                );
            }
          );
      }
    );
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
}
