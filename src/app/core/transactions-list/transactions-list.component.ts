import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { InvoiceReceiptsService } from "src/app/shared/services/invoice-receipts/invoice-receipts.service";
import { map, tap, catchError } from "rxjs/operators";

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  user_id: any;
  selectedDate: any;
  qrTrx: any[] = [];
  cashTrx: any[] = [];
  qrTrxTemp: any[] = [];
  cashTrxTemp: any[] = [];



  constructor(
    private authService: AuthService,
    private invoiceReceiptService: InvoiceReceiptsService,
  ) {
  }

  ngOnInit(): void {
    this.user_id = this.authService.decodedToken().user_id;
    this.selectedDate = new Date();
    this.getCashTransactions();
    this.getQrTransaction();
  }

  getCashTransactions() {
    this.invoiceReceiptService.filter("user=" + this.user_id + "&type=T&status=PS").pipe(map(x => x.filter(i => i.payment_successful_datetime.slice(0,10) == this.selectedDate.toJSON("yyyy-MM-dd").slice(0,10)))).subscribe(
      (res) => {
        console.log("res", res);
        this.cashTrx = res;
        this.cashTrxTemp = this.cashTrx.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };
        });

      },
      (err) => {
        console.log("err", err);
      }
    );
    
  }

  getQrTransaction() {
    this.invoiceReceiptService.filter("user=" + this.user_id + "&type=Q&status=PS").pipe(map(x => x.filter(i => i.payment_successful_datetime.slice(0,10) == this.selectedDate.toJSON("yyyy-MM-dd").slice(0,10)))).subscribe(
      (res) => {
        console.log("res", res);
        this.qrTrx = res;
        this.qrTrxTemp = this.qrTrx.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };
        });

      },
      (err) => {
        console.log("err", err);
      }
    );


  }

  filterQRTable($event) {
    let val = $event.target.value;
    this.qrTrxTemp = this.qrTrx.filter(function (d) {
      for (var key in d) {
        if (d[key] != "" && d[key] != null) {
          if (
            d[key]
              .toString()
              .toLowerCase()
              .indexOf(val.toString().toLowerCase()) !== -1
          ) {
            return true;
          }
        }
      }
      return false;
    });

  }

  filterCashTable($event) {
    let val = $event.target.value;
    this.cashTrxTemp = this.cashTrx.filter(function (d) {
      for (var key in d) {
        if (d[key] != "" && d[key] != null) {
          if (
            d[key]
              .toString()
              .toLowerCase()
              .indexOf(val.toString().toLowerCase()) !== -1
          ) {
            return true;
          }
        }
      }
      return false;
    });

  }



}
