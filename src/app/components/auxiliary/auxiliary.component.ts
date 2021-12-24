import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from "src/app/shared/services/event-emitter/event-emitter.service";
import { Router, NavigationEnd } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";
import { DataServiceService } from "src/app/shared/services/data-service/data-service.service";
import { Cart } from "src/app/shared/services/carts/carts.model";

@Component({
  selector: 'app-auxiliary',
  templateUrl: './auxiliary.component.html',
  styleUrls: ['./auxiliary.component.scss']
})
export class AuxiliaryComponent implements OnInit {

  // data
  user_id: any;
  carts: Cart[] = [];
  message: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartsService,
    private eventEmitterService: EventEmitterService,
    private facilitiesBookingService: FacilityBookingsService,
    private data: DataServiceService,

  ) { 

  }

  ngOnInit(): void {
    this.user_id = this.authService.decodedToken().user_id
  }

  clickJadual() {
    this.router.navigate(["/app/schedule"]);
  }

  clickPrinter() {
    this.router.navigate(["/app/print-test"]);
  }

  clickPermohonan() {
    this.router.navigate(["/app/application"]);
  }

  clickTempahan() {
    this.router.navigate(["/app/home"]);


  }

  
  clickBatal() {
    // create duplicate before delete
    this.cartService.filter("cart_status=CR&user="+this.user_id).subscribe(
      (res) => {
        this.carts = res;
      },
      (err) => {
        console.log(err);
      },
      () => {

        if (this.carts.length > 0) {
          let facilities_id = this.carts[0].facility_booking_id;
          this.createFacilities(facilities_id[0]);
        } else {
          this.cartService.deleteBulk(this.user_id).subscribe(
            (res) => {
              console.log(res);
            },
            (err) => {
              console.log(err);
            },
            () => {
              this.eventEmitterService.updateCart();
              this.router.navigate(["/app/home"]);
            });
        }
      }
    );
  }

  // methods to create facilities
  createFacilities(facility_id) {
    this.facilitiesBookingService.filter("id="+facility_id).subscribe(
      (res) => {
        this.facilitiesBookingService.post(res[0]).subscribe(
          (res) => {
            console.log(res);
             this.cartService.deleteBulk(this.user_id).subscribe(
               (res) => {
                 console.log("deleteBulk", res);
               },
               (err) => {
                 console.log("deleteBulk", err);
               },
               () => {
                 this.eventEmitterService.updateCart();
                 this.router.navigate(["/app/home"]);
               }
             );
          },
          (err) => {
            console.log(err);
          });
      },
      (err) => {
      }
    );
  }
}
