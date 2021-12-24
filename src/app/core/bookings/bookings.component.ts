import { Component, PipeTransform, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";
import { FacilityBooking } from "src/app/shared/services/facility-bookings/facility-bookings.model";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { EventEmitterService } from "src/app/shared/services/event-emitter/event-emitter.service";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  enumArray = {
    // Equipment
    "WOUT": "Tanpa Peralatan",
    "WAND": "Dengan Peralatan",

    // organisation category
    "GV": "Kerajaan", 
    "SC": "Sekolah",
    "UN": "Universiti",
    "NA": "Tiada",


  }

  booked_facilities: FacilityBooking[] = [];
    
  filter = new FormControl('');
  constructor(
    public facilitiesBookingService: FacilityBookingsService,
    public translate: TranslateService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private cartService: CartsService,
    private w3cService: W3csService,
    private eventEmitterService: EventEmitterService,

  ) { }


  ngOnInit(): void {
    this.getFacilities();
  }

  getFacilities() {
    this.facilitiesBookingService.get().pipe(map(x => x.filter(i => i.status!="FB04"))).subscribe(
      (res) => {
        this.booked_facilities = res;
        console.log(this.booked_facilities)
      },
      (err) => {
        console.log(err);
      },
      () => {
        // setup table
      }
    );
  }

  // to delete facility booking object 
  batalTempahan(facility) {
    this.facilitiesBookingService.delete(facility.id).subscribe(
      (res) => {
        console.log(res);
        this.getFacilities();
      },
      (err) => {
        console.log(err);
      });
  }

  // to create cart object from booked facility
  tambahTempahanKeTroli(facility) {
    let facility_booked = []
    facility_booked.push(facility.id);
    let obj = {
      user: this.authService.decodedToken().user_id,
      show_booking_id: [],
      simulator_ride_booking_id: [],
      facility_booking_id: facility_booked,
    };
    this.cartService.post(obj).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.cartService
          .filter(
            "cart_status=CR&user=" + this.authService.decodedToken().user_id
          )
          .subscribe(
            (res) => {
              this.w3cService.changeAddToCartCount(res.length);
            },
            (err) => {
              console.error("err", err);
            },
            () => {
              // add swal here -> navigate to homepage
              // route directly to module page
              this.eventEmitterService.updateCart();

              this.toastr.info(
                this.translate.instant("TambahKeTroliBerjaya"),
                "Info"
              );

              this.router.navigate(["/app/home"]);
            }
          );
        // this.router.navigate([
        //   "/payment",
        //   "shows",
        //   this.authService.decodedToken().user_id,
        //   showtimeId,
        // ]);
      }
    );

  }
}
