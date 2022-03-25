import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  // for child-parent windows interactions
  private messageSource2 = new BehaviorSubject("TEST");
  currentMessage2 = this.messageSource2.asObservable();

  // for checkout and cart 
  private messageSource3 = new BehaviorSubject("TEST");
  currentMessage3 = this.messageSource2.asObservable();


  constructor() { }

  changeMessage(message: number) {
    this.messageSource.next(message);
  }

  changeMessage2(message: string) {
    this.messageSource2.next(message);
  }

  changeMessage3(message: string) {
    this.messageSource3.next(message);
  }
}
