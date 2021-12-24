import { Component, OnInit, TemplateRef } from '@angular/core';
import { CashPaymentService } from "src/app/shared/services/cash-payment/cash-payment.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { InvoiceReceiptsService } from "src/app/shared/services/invoice-receipts/invoice-receipts.service";
import { RefundsService } from "src/app/shared/services/refunds/refunds.service";
import { map, tap, catchError } from "rxjs/operators";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { ShowbookingsService } from "src/app/shared/services/showbookings/showbookings.service";
import { SimulatorRideBookingsService } from "src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";
import { DailyReports } from "src/app/shared/services/reporting/reporting.model";
import { ReportingService } from "src/app/shared/services/reporting/reporting.service";
import { Router, NavigationEnd } from "@angular/router";
import { JwtService } from "src/app/shared/jwt/jwt.service";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";


@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss'],
})
export class ReportingComponent implements OnInit {

  // today's date
  today_date = new Date().toJSON("yyyy-MM-dd").slice(0,10);
  opened_timestamp = "";

  // staff id
  name: any;
  user_id: any;

  // fake uuid dont worry bout it
  uuid = "8b4c212e-8ba6-11eb-b98c-1e00f2364090"

  // REPORT DATA
  dailyReports: DailyReports[] = [];

  // cash summary
  grossCash: number = 0;
  netCash: number = 0;
  refund: number = 0;
  transactions: number = 0;
  refundTransactions: number = 0;

  show_cz_adult: number = 0; 
  show_cz_kid: number = 0;
  show_cz_student: number = 0 ;
  show_cz_oku: number = 0 ;
  show_cz_old_folk: number = 0 ;

  show_nz_adult: number = 0 ;
  show_nz_kid: number = 0 ;
  show_nz_student: number = 0 ;
  show_nz_oku: number = 0 ;
  show_nz_old_folk: number = 0 ;

  space_cz_adult: number = 0 ;
  space_cz_kid: number = 0 ;

  space_nz_adult: number = 0 ;
  space_nz_kid: number = 0 ;

  initial_cash: number = 0;
  expected_cash_at_closing: number = 0;

  // pilihan pembayaran
  debit: number = 0;
  credit: number = 0;
  qr: number = 0;

  debit_transactions: number = 0;
  credit_transactions: number = 0;
  qr_transactions: number = 0;

  debit_refund: number = 0;
  credit_refund: number = 0;
  qr_refund: number = 0;

  // facility
  total_facility_paid: number = 0;

  // modal
  closeCounterModal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
    backdrop: false,
    ignoreBackdropClick: true,
  };

  constructor(
    private authService: AuthService,
    private refundService: RefundsService,
    private cashTransactionService: CashPaymentService,
    private invoiceReceiptService: InvoiceReceiptsService,
    private cartService: CartsService,
    private showbookingService: ShowbookingsService,
    private simulatorridebookingService: SimulatorRideBookingsService,
    private facilitybookingService: FacilityBookingsService,
    private reportingService: ReportingService,
    private modalService: BsModalService,
    public jwtService: JwtService,
    private router: Router,

  ) {
    
    // call continuously
    setInterval(() => {this.refreshReportData()}, 3000)
  }

  ngOnInit(): void {

    this.name = this.authService.decodedToken().full_name;
    this.user_id = this.authService.decodedToken().user_id;

    this.getOpenedTimestamp();
    
  }

  getOpenedTimestamp() {
    // get reporting documents for the day, for the user, with status OP
    let today_date = new Date().toJSON("yyyy-MM-dd").slice(0,10);
    this.reportingService.filter("user=" + this.user_id).pipe(map(x => x.filter(i => i.created_date.slice(0,10) == today_date 
      && i.status == "OP" ))).subscribe(
      (res) => {
        this.opened_timestamp = res[0].opened_timestamp
        console.log("OP TS", this.opened_timestamp);
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.getCashTransactions();
        this.getRefundTransactions();
        this.getPurchaseHistory();
        this.getQRCount();

        setTimeout(() => {
          this.updateReports();

        }, 5000);


      });
  }

  getTotalQR(res) {
    for (let i = 0; i < res.length; i++) {
      this.qr = this.qr + +res[i].total_price_before_voucher;
    }
  }

  getQRCount() {
    this.invoiceReceiptService.filter("user=" + this.user_id + "&type=Q&status=PS").pipe(map(x => x.filter(i => i.payment_successful_datetime >= this.opened_timestamp ))).subscribe(
      (res) => {
        this.qr_transactions = res.length;
        this.getTotalQR(res);
      },
      (err) => {
        console.log("err", err);
      }
    );

  }

  getCashTransactions() {
    this.cashTransactionService.filter("user_id=" + this.user_id).pipe(map(x => x.filter(i => i.created_date > this.opened_timestamp))).subscribe(
      (res) => {
        console.log("cash transaction", res);
        //update transaction count
        this.transactions = res.length;
        
        let temp = 0;
        for (let i = 0; i < res.length; i++) {
          let product_amount = +res[i].amount_receive - +res[i].amount_change;
          temp += product_amount
        }
        this.grossCash = temp;
        
      },
      (err) => {
        console.log(err);
      } 
    );
  }


  getRefundTransactions() {
    this.refundService.filter("user=" + this.user_id).pipe(map(x => x.filter(i => i.created_date > this.opened_timestamp))).subscribe(
      (res) => {
        this.refundTransactions = res.length;
        
        let temp = 0;
        for (let i=0; i < res.length; i++) {
          temp += +res[i].amount;
        }
        this.refund = temp;
      },
      (err) => {

      },
      () => {

      }
    );
  }

 getPurchaseHistory() {
   this.invoiceReceiptService.filter("user=" + this.user_id)
     .pipe(map(x => x.filter(i => i.fpx_transaction_id == null && 
       i.payment_successful_datetime > this.opened_timestamp
       // i.status == "PS" ||
       // i.status == "RC"
     ))).subscribe(
     (res) => {

       console.log("receipt length", res.length);
       for (let i=0; i < res.length; i++) {

         let carts = res[i].cart_id
         if (carts.length > 0) {
           for (let j=0; j < carts.length; j++) {
             this.cartService.getOne(carts[j]).subscribe(
               (res) => {

                 let show_id = res.show_booking_id;
                 let space_id = res.simulator_ride_booking_id;
                 let facility_id = res.facility_booking_id;

                 if (show_id.length > 0) {
                  for (let i=0; i < show_id.length; i++) {
                    this.showbookingService.getOne(show_id[i]).subscribe(
                      (res) => {

                        if (res.ticket_type=="CZ") {

                          if (res.ticket_category=="AD") { this.show_cz_adult += res.ticket_quantity; }
                          else if (res.ticket_category=="KD") { this.show_cz_kid += res.ticket_quantity; }
                          else if (res.ticket_category=="OF") { this.show_cz_old_folk += res.ticket_quantity; }
                          else if (res.ticket_category=="SD") { this.show_cz_student += res.ticket_quantity; }
                          else if (res.ticket_category=="OK") { this.show_cz_oku += res.ticket_quantity; }

                        } else if (res.ticket_type=="NC") {

                          if (res.ticket_category=="AD") { this.show_nz_adult += res.ticket_quantity; }
                          else if (res.ticket_category=="KD") { this.show_nz_kid += res.ticket_quantity; }
                          else if (res.ticket_category=="OF") { this.show_nz_old_folk += res.ticket_quantity; }
                          else if (res.ticket_category=="SD") { this.show_nz_student += res.ticket_quantity; }
                          else if (res.ticket_category=="OK") { this.show_nz_oku += res.ticket_quantity; }

                        }
                        
                      },
                      (err) => {
                        console.log(err);
                      }
                    );
                  }

                 /// BREAKER
                   
                 } else if (space_id.length > 0) {
                   for (let i=0; i < space_id.length; i++) {
                      this.simulatorridebookingService.getOne(space_id[i]).subscribe(
                        (res) => {
                          if (res.ticket_type=="CZ") {

                            if (res.ticket_category=="AD") { this.space_cz_adult += res.ticket_quantity; }
                            else if (res.ticket_category=="KD") { this.space_cz_kid += res.ticket_quantity; }

                          } else if (res.ticket_type=="NC") {

                            if (res.ticket_category=="AD") { this.space_nz_adult += res.ticket_quantity; }
                            else if (res.ticket_category=="KD") { this.space_nz_kid += res.ticket_quantity; }

                          }

                        },
                        (err) => {
                          console.log(err);
                        }
                      );
                 }
                 /// BREAKER

                 } else if (facility_id.length > 0) {
                   for (let i=0; i < facility_id.length; i++) {
                    this.facilitybookingService.getOne(facility_id[i]).subscribe(
                     (res) => {
                       this.total_facility_paid += +res.total_price;
                     },
                     (err) => {
                       console.log(err);
                     }
                   );

                   }
                   
                 }
                 
               },
               (err) => {
                 console.log(err);
               }
             );
           }
         }
                  
       }
       
     },
     (err) => {
       console.log(err);
     },
     () => {

     }
   );

  }


  updateReports() {
    console.log(this.space_cz_kid, this.space_cz_adult, this.space_nz_adult, this.space_nz_kid);
    this.reportingService.filter("status=OP&user=" + this.user_id).pipe(map(x => x.filter(i => i.status == "OP"))).subscribe(
      (res) => {
        this.dailyReports = res;

      },
      (err) => {
        console.log(err);
      },
      () => {
        if (this.dailyReports.length > 0) {

                    this.netCash  = this.initial_cash - +this.refund + +this.grossCash;
          let obj = {

            "expected_cash_at_closing": this.netCash,
            "gross": this.grossCash,
            "transactions": this.transactions,
            "refund": this.refund,
            "refund_transactions": this.refundTransactions,
            "net": this.grossCash - +this.refund + +this.initial_cash,
            "debit": this.debit,
            "credit": this.credit,
            "qr": this.qr,
            "debit_refund": this.debit_refund,
            "credit_refund": this.credit_refund,
            "qr_refund": this.qr_refund,
            "debit_transactions": this.debit_transactions,
            "credit_transactions": this.credit_transactions,
            "qr_transactions": this.qr_transactions,
            "show_cz_adult": this.show_cz_adult,
            "show_cz_kid": this.show_cz_kid,
            "show_cz_student": this.show_cz_student,
            "show_cz_oku": this.show_cz_oku,
            "show_cz_old_folk": this.show_cz_old_folk,
            "space_cz_kid": this.space_cz_kid,
            "space_cz_adult": this.space_cz_adult,
            "space_nz_adult": this.space_nz_adult,
            "space_nz_kid": this.space_nz_kid ,
            "total_facility_paid": this.total_facility_paid,

          }

          console.log("updating the obj", obj);

          this.reportingService.update(obj, this.dailyReports[0].id).subscribe(
            (res) => {
              console.log("update", res);
            },
            (err) => {
              console.log(err);
            }
          );

        }
      }
    );

    

  }

  closeCounter() {
    let closed_timestamp = new Date();

    let obj = {
      "status": "CL",
      "closed_timestamp": closed_timestamp, 
    }
    this.reportingService.update(obj, this.dailyReports[this.dailyReports.length -1].id).subscribe(
      (res) => {
        this.modalService.hide();
        this.jwtService.destroyToken();
        this.router.navigate(['/auth/login']);

      },
      (err) => {
        console.log(err);
      }
    );
  }

  refreshReportData() {
    this.reportingService.filter("status=OP&user=" + this.user_id).pipe(map(x => x.filter(i => i.status == "OP"))).subscribe(
      (res) => {
        console.log("res lang", res);
        this.dailyReports = res;
        if (this.dailyReports.length > 0){
          this.initial_cash = this.dailyReports[res.length -1].initial_cash;
          console.log("reportS", this.dailyReports);
        }

      },
      (err) => {
        console.log(err);
      }
    );

  }

  printReport() {
    this.router.navigate(['/app/reporting-print']);
  }

  // modal handlers

  openModal(template: TemplateRef<any>) {
    this.closeCounterModal = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalService.hide()
  }


 

}
