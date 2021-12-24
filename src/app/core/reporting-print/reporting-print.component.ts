import { Component, OnInit } from '@angular/core';
import { DailyReports } from "src/app/shared/services/reporting/reporting.model";
import { ReportingService } from "src/app/shared/services/reporting/reporting.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { TranslateService } from "@ngx-translate/core";

import { ToastrService } from "ngx-toastr";
import { map, tap, catchError } from "rxjs/operators";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";


@Component({
  selector: 'app-reporting-print',
  templateUrl: './reporting-print.component.html',
  styleUrls: ['./reporting-print.component.scss']
})
export class ReportingPrintComponent implements OnInit {

  // class variable 
  selectedDate:any;
  user_id: string;
  full_name: string;
  temp: DailyReports;
  dailyReports: DailyReports[] = [];

  tableRows: any;
  tableTemp: any;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private reportingService: ReportingService,
    public translate: TranslateService,


  ) { }

  ngOnInit(): void {
    this.selectedDate = new Date();
    this.user_id = this.authService.decodedToken().user_id;
    this.full_name = this.authService.decodedToken().full_name;
    this.getReport();
  }
  changeTimeFormat(res) {
    for (let i = 0; i < res.length; i++) {
      //today.setHours(today.getHours() + 4);
      var opened_timestamp = new Date(res[i].opened_timestamp);
      opened_timestamp.setHours(opened_timestamp.getHours() + 8);
      res[i].opened_timestamp = opened_timestamp.toJSON();

      if (res[i].closed_timestamp != null) {
        var closed_timestamp = new Date(res[i].closed_timestamp);
        closed_timestamp.setHours(closed_timestamp.getHours() + 8);
        res[i].closed_timestamp = closed_timestamp.toJSON();
      }
    }
    console.log("RES", res);
    return res;

  }


  getReport() {
    this.reportingService.filter("user=" + this.user_id).pipe(map(x => x.filter(i => i.created_date.slice(0,10) == this.selectedDate.toJSON("yyyy-MM-dd").slice(0,10)))).subscribe(
      (res) => {
        console.log("res yg kita nak", res);
        this.tableRows = this.changeTimeFormat(res);
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };
        });


      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  // getData() {
  //   let selected = this.selectedDate.toJSON().slice(0,10);
  //   // get data (date, user, status CL)
  //   this.reportingService.filter("status=OP&user=" + this.user_id).pipe(map(x => x.filter(i => i.created_date.slice(0,10) == selected))).subscribe(
  //     (res) => {
  //       this.dailyReports = res;

  //     },
  //     (err) => {

  //     },
  //     () => {
  //       if (this.dailyReports.length > 0) {
  //         this.temp = this.dailyReports[0];
  //          this.printPdf();

  //       } else {
  //         // use sweeetalert or a better ui
  //         this.toastr.error(
  //           this.translate.instant("Tiada data laporan pada tarikh berkenaan"),
  //           "Ralat"
  //         );
  //       }

  //     }
  //   );
  //   
  // }

  printPdf(temp) {
    console.log("TEMP", temp);
    // setup pdf page
    var dd = {
      content: [

        // Header 
        {text: 'Laporan Harian Pos System', style: 'header'},
        {text: 'Kaunter: ' + this.full_name ,style: 'subheader'},
        {text: 'Tarikh: ' + temp.created_date.slice(0,10), style: 'subheader'},
        {text: '', style: 'breaker'},

        // Cash
        {
          alignment: 'justify',
          columns: [
            {text: 'Jumlah tunai awal: RM '+temp.initial_cash, style: 'subheader'},
            {text: 'Jumlah tunai akhir: RM '+temp.net, style: 'subheader'},
          ]
        },
        {text: 'Pembayaran Tunai', style: 'subheader'},
        {style: 'tableExample', 
          table: {
            body: [
              ['Jualan Kasar (RM)', 'Jumlah Transaksi', 'Bayaran Balik (RM)', 'Jumlah Transaksi Bayaran Balik', 'Jualan Bersih (RM)'],
              [temp.gross, temp.transactions, temp.refund, temp.refund_transactions, temp.net]
            ]

          }
        },
        
        // Pilihan Pembayaran
        {text: 'Pilihan Pembayaran', style: 'subheader'},
        { style: 'tableExample', 
          table: {
            body: [
              ['Jenis Bayaran', 'Jumlah Jualan (RM)', 'Jumlah Transaksi'],
              ['Kredit', temp.credit, temp.credit_transactions],
              ['Debit', temp.debit, temp.debit_transactions],
              ['Qr', temp.qr, temp.qr_transactions],
            ]

          }
        },

        // Pembelian Tayangan 
        // tajuk table
        {text: 'Pembelian Tayangan', style: 'subheader'},

        {
          alignment: 'justify',
          columns: [
            {text: 'Warganegara', style: 'subheader'},
            {text: 'Bukan Warganegara', style: 'subheader'},
          ]
        }, 

        // table

        {
          alignment: 'justify',
          columns: [
            {style: 'tableExample', 
              table: {
                body: [
                  ['Kategori Tiket', 'Jumlah Tiket'],
                  ['Dewasa', temp.show_cz_adult],
                  ['Pelajar', temp.show_cz_student],
                  ['Kanak-kanak', temp.show_cz_kid],
                  ['Warga emas', temp.show_cz_old_folk],
                  ['OKU', temp.show_cz_oku],
                ]

              }
            },
            {width: '*', style: 'tableExample', 
              table: {
                body: [
                  ['Kategori Tiket', 'Jumlah Tiket'],
                  ['Dewasa', temp.show_nz_adult],
                  ['Pelajar', temp.show_nz_student],
                  ['Kanak-kanak', temp.show_nz_kid],
                  ['Warga emas', temp.show_nz_old_folk],
                  ['OKU', temp.show_nz_oku],
                ]

              }
            }
          ]
        },
        // Pembelian Simulas 
        // tajuk table
        {text: 'Pembelian Kembara Simulasi', style: 'subheader'},

        {
          alignment: 'justify',
          columns: [
            {text: 'Warganegara', style: 'subheader'},
            {text: 'Bukan Warganegara', style: 'subheader'},
          ]
        }, 

        // table

        {
          alignment: 'justify',
          columns: [
            {width: '*', style: 'tableExample', 
              table: {
                body: [
                  ['Kategori Tiket', 'Jumlah Tiket'],
                  ['Dewasa', temp.space_cz_adult],
                  ['Kanak-kanak', temp.space_cz_kid],
                ]

              }
            },
            {style: 'tableExample', 
              table: {
                body: [
                  ['Kategori Tiket', 'Jumlah Tiket'],
                  ['Dewasa', temp.space_nz_adult],
                  ['Kanak-kanak', temp.space_nz_kid],
                ]

              }
            }
          ]
        },
        // Jumlah bayaran fasiliti
        {text: 'Jumlah Bayaran Fasiliti: RM ' + temp.total_facility_paid, style: 'subheader'},

        

      ],
      styles: {
      		header: {
      			fontSize: 12,
      			bold: true,
      			margin: [0, 0, 0, 5]
      		},
      		subheader: {
      			fontSize: 10,
      			bold: true,
      			margin: [0, 0, 0, 5]
      		},
      		tableExample: {
            fontSize: 10,
      			margin: [0, 5, 0, 15],
      		},
      		tableHeader: {
      			bold: true,
      			fontSize: 13,
      			color: 'black'
      		},
          breaker: {
            margin: [0, 40, 0, 0],
          },
      	},
      };

      // initiate printing job
       (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
      pdfMake
        .createPdf(dd)
        .download(
          "pos-report " + temp.created_date+ " " + this.full_name + ".pdf"
        );


  }

}
