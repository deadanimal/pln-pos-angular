import { Component, OnInit } from '@angular/core';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';

@Component({
  selector: 'app-thermal-printer',
  templateUrl: './thermal-printer.component.html',
  styleUrls: ['./thermal-printer.component.scss']
})
export class ThermalPrinterComponent implements OnInit {
  
  constructor(

  ) { 
  }

  ngOnInit(): void {
  }

}
