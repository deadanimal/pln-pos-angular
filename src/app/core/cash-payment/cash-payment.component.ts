import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { CashPaymentService } from "src/app/shared/services/cash-payment/cash-payment.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { Cart } from "src/app/shared/services/carts/carts.model";
import { CashTransactions } from "src/app/shared/services/cash-payment/cash-payment.model";
import { CartComponent } from "src/app/components/cart/cart.component";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { DataServiceService } from "src/app/shared/services/data-service/data-service.service";
import { InvoiceReceiptsService } from "src/app/shared/services/invoice-receipts/invoice-receipts.service";
import { ShowbookingsService } from "src/app/shared/services/showbookings/showbookings.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";
import { SimulatorRideBookingsService } from "src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ShowtimesService } from "src/app/shared/services/showtimes/showtimes.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-cash-payment',
  templateUrl: './cash-payment.component.html',
  styleUrls: ['./cash-payment.component.scss']
})
export class CashPaymentComponent implements OnInit {

  // data
  user_id: any;
  temp: number;
  customValue: number;
  cartValue: number;
  message: number;
  numberStr: string;
  carts: Cart[] = [];
  current_ticket = 0;

  qrFormGroup: FormGroup;

  ticket_numbers = [];
  ticket_numbers_sim = [];


  totalprice: number;

  customStatus: boolean = true;

  cashTransactions: CashTransactions[] = [];
  cartComponent: CartComponent;

  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
    backdrop: false,
    ignoreBackdropClick: true,
  };


  constructor(
    public cartService: CartsService,
    public authService: AuthService,
    public cashPaymentService: CashPaymentService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private data: DataServiceService,
    private router: Router,
    private invoicereceiptService: InvoiceReceiptsService,
    private showbookingService: ShowbookingsService,
    private facilitybookingService: FacilityBookingsService,
    private simulatorridebookingService: SimulatorRideBookingsService,
    private modalService: BsModalService,
    private showtimeService: ShowtimesService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.user_id = this.authService.decodedToken().user_id;
    this.data.currentMessage.subscribe(message => this.message = message)
    this.numberStr = "0";


    this.totalprice = this.message

    this.qrFormGroup = this.formBuilder.group({
      qr_notes: ["", Validators.compose([Validators.required])]
    });

    this.getAllTicketNumbers();
    this.getAllTicketNumbersSim();
  }

  getAllTicketNumbers() {
    this.showbookingService.get().subscribe(
      (res) => {
        for (let i=0; i < res.length; i++) {
          this.ticket_numbers.push(+res[i].ticket_number);
        }

        console.log(this.ticket_numbers);
      },
      (err) => {
        console.log(err);

      }
    );

  }

  getAllTicketNumbersSim() {
    this.simulatorridebookingService.get().subscribe(
      (res) => {
        for (let i=0; i < res.length; i++) {
          this.ticket_numbers_sim.push(+res[i].ticket_number);
        }

        if (this.ticket_numbers_sim.length == 0) {
          this.ticket_numbers_sim.push(1);
        }

      },
      (err) => {
        console.log(err);

      }
    );

  }


  inputRegister(input: string) {

    // reset condition
    if (input=='del') {
      this.numberStr = "0";
      input = "";
    }

    if (this.numberStr == "0") {
      this.numberStr = "";
    } else {
      this.numberStr = this.numberStr;
    }

    this.numberStr = this.numberStr + input;
    console.log(this.numberStr)
  }

  submitPayment(type) {
    var amount_change = 0;
    var amount_receive = 0;
    var trx_type: string;

    if (type=="cash") {
      amount_receive = +this.numberStr;
      amount_change = amount_receive - this.message;
      trx_type = "T";


    } else if (type=="qr") {
      amount_receive = this.message; 
      amount_change = 0;
      trx_type = "Q";

    }

    if (amount_change >= 0) {

      let body = {
        "amount_receive": amount_receive,
        "amount_change": amount_change,
        "user_id": this.user_id,
      }

      let cash_tx_id: any;

      this.cashPaymentService.post(body).subscribe(
        (res) => {
          console.log("res payment", res);
          cash_tx_id = res.id;
          
        },
        (err) => {
          console.log("err paymeny", err);
        },
        () => {
          // process receipt
        this.cartService.filter("cart_status=CR&user="+this.user_id).subscribe(
        (res) => { this.carts = res },
        (err) => {},
        () => {
          this.modalService.hide();
          this.updateCartStatus();
          this.generateInvoiceReceipt(cash_tx_id, trx_type);
          
         }
        );

        }
      ); 
    } else {
      this.toastr.error(
        this.translate.instant("Tunai Tidak Mencukupi"),
        "Ralat"
      );

    }
  }

  cancelPayment() {
    this.router.navigate(["/app/home"]);
  }

  updateCartStatus() {
    let body = { "cart_status": "CM" } 
    for (let i = 0; i < this.carts.length; i++) {
      this.cartService.update(body, this.carts[i].id).subscribe(
        (res)=> { console.log(res) },
        (err)=> {}
      );
    }

    let id = ""
    let paidStatus = ""

    let current = this.arrayMax(this.ticket_numbers)
    let current_sim = this.arrayMax(this.ticket_numbers_sim)

    for (let i=0; i <= this.carts.length - 1; i++) {

      if (this.carts[i].show_booking_id.length > 0) {
        // add logic to prepare ticket number
        console.log("Current Count", current);

        paidStatus = "SB05"
        for (let j=0; j<= this.carts[i].show_booking_id.length-1; j++) {
          current++;
          id = this.carts[i].show_booking_id[j] 
          this.updateShowBookingStatus(id, paidStatus, current)
        }

        this.updateShowTime(id, this.carts[i].show_booking_id.length)

      } else if (this.carts[i].simulator_ride_booking_id.length > 0) {

        paidStatus = "SRB03"

        for (let j=0; j<= this.carts[i].simulator_ride_booking_id.length-1; j++) {
          current_sim++;
          id = this.carts[i].simulator_ride_booking_id[j] 
          this.updateSimulatorRideBookingStatus(id, paidStatus, current_sim)
        }


      } else if (this.carts[i].facility_booking_id.length > 0) {
        paidStatus = "FB04"
        for (let j=0; j<= this.carts[i].facility_booking_id.length-1; j++) {
          id = this.carts[i].facility_booking_id[j] 
          this.updateFacilityBookingStatus(id, paidStatus)
        }
      }
    }
  }

  updateShowBookingStatus(id, paidStatus, c) {
    let obj = {
      "status": paidStatus,
      "ticket_number": c.toString().padStart(7, "0")
    }
    this.showbookingService.update(obj, id).subscribe(
      (res) => {
        console.log("after ticket", res);
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  
  updateShowTime(id, c) {
    this.showbookingService.getOne(id).subscribe(
      (res) => {
        let qty = res.ticket_quantity
        let showtime_id = res.showtime_id

        this.showtimeService.getOne(showtime_id).subscribe(
          (res) => {
            if (this.current_ticket == 0) {
              this.current_ticket = res.available_ticket
            }
          },
          (err) => {
            console.log("err", err);
          },
          () => {
            this.current_ticket = this.current_ticket - c;

            let obj = {
              "available_ticket": this.current_ticket
            }

            this.showtimeService.update(obj, showtime_id).subscribe(
              (res) => {
                this.current_ticket = res.available_ticket;
              },
              (err) => {
                console.log(err);
              }
            );

          }
        );
      },
      (err) => {
        console.log("err", err);
      }
    );


  }

  updateSimulatorRideBookingStatus(id, paidStatus, c) {
    let obj = {
      "ticket_number": c.toString().padStart(7, "0"),
      "status": paidStatus
    }
    this.simulatorridebookingService.update(obj, id).subscribe(
      (res) => {},
      (err) => {}
    );
  }

  updateFacilityBookingStatus(id, paidStatus) {
    let obj = {
      "status": paidStatus
    }
    this.facilitybookingService.updateNew(obj, id).subscribe(
      (res) => {},
      (err) => {}
    );
  }

  generateInvoiceReceipt(cash_transaction_id, trx_type) {
    // this.receipt_obj["total_price_before_voucher"] = 0 
    // this.receipt_obj["total_voucher"] = 0
    // this.receipt_obj["user"] = this.user_id

    // this.receipt_obj["pending_payment_datetime"] = new Date().toJSON("yyyy/MM/dd HH:mm");
    // this.receipt_obj["payment_successful_datetime"] = new Date().toJSON("yyyy/MM/dd HH:mm");
    // this.receipt_obj["receipt_created_datetime"] = new Date().toJSON("yyyy/MM/dd HH:mm");

    // this.invoicereceiptService.post(this.receipt_obj).subscribe(
    //   (res) => {
    //     console.log("Successfully updated invoice", res);
    //   }, 
    //   (err) => {
    //     console.log("Un-successfully updated invoice", err);
    //   }
    // );

    // do what ? 
    // just fetch that on ic and update status and time
    let id = "";
    this.invoicereceiptService.filter("status=IC&user" + this.user_id).subscribe(
      (res) => {
        id = res[0].id;
        console.log("receipt id: ", id);
      },
      (err) => {

      },
      () => {
        let obj = {
          "cash_transaction_id": cash_transaction_id,
          "status": "PS",
          "pending_payment_datetime" : new Date().toJSON("yyyy/MM/dd HH:mm"),
          "payment_successful_datetime" : new Date().toJSON("yyyy/MM/dd HH:mm"),    
          "receipt_created_datetime" : new Date().toJSON("yyyy/MM/dd HH:mm"),
          "type": trx_type,
          "qr_notes": this.qrFormGroup.value.qr_notes,
        }

        this.invoicereceiptService.update(obj, id).subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(["/app/checkout"]);
          },
          (err) => {
            console.log(err); 
          },
          () => {
            // update seat available

          }
        );

      });
    }
  goToQrPay() {
    this.router.navigate(["/app/qr-payment"]);
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalService.hide()
  }

  arrayMax(arr) {
  return arr.reduce(function (p, v) {
    return ( p > v ? p : v );
  });

}




}
