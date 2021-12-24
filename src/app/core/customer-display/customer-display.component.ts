import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-display',
  templateUrl: './customer-display.component.html',
  styleUrls: ['./customer-display.component.scss']
})
export class CustomerDisplayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // methods
  redirectTicketSeat() {
    // redirect to ticket seat for user to view
  }

}
