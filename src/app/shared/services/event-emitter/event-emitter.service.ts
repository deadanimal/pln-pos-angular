import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeCartComponentFunction = new EventEmitter();
  invokeCustomerDisplayFunction = new EventEmitter();


  subsVar: Subscription;
  subsVar2: Subscription;


  constructor() { }

  // trigger getCart() function in cart component
  updateCart() {
    this.invokeCartComponentFunction.emit();
  }
  
  // to trigger customer display component to navigate to schedule table
  displaySchedule() {
    this.invokeCustomerDisplayFunction.emit();
  }

}
