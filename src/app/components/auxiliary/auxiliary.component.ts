import { Component, OnInit } from "@angular/core";
import { EventEmitterService } from "src/app/shared/services/event-emitter/event-emitter.service";
import { Router, NavigationEnd } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";
import { DataServiceService } from "src/app/shared/services/data-service/data-service.service";
import { Cart } from "src/app/shared/services/carts/carts.model";
import { ToastrService } from "ngx-toastr";

import { Store } from "@ngrx/store";
import { getCheckoutState } from "src/app/checkout-state-store/selector";

@Component({
  selector: "app-auxiliary",
  templateUrl: "./auxiliary.component.html",
  styleUrls: ["./auxiliary.component.scss"],
})
export class AuxiliaryComponent implements OnInit {
  // data
  user_id: any;
  carts: Cart[] = [];
  message: string;

  checkout_state: any = {
    status: false,
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartsService,
    private eventEmitterService: EventEmitterService,
    private facilitiesBookingService: FacilityBookingsService,
    private data: DataServiceService,
    private toastr: ToastrService,
    private store: Store
  ) {
    let checkout_state_selector = this.store.select(getCheckoutState);

    checkout_state_selector.subscribe((res) => {
      if (res.length > 0) {
        this.checkout_state = res[0];
      } else {
        this.checkout_state = { status: false };
      }
    });
  }

  ngOnInit(): void {
    this.user_id = this.authService.decodedToken().user_id;
  }

  clickJadual() {
    if (this.checkout_state.status == false) {
      this.router.navigate(["/app/schedule"]);
    } else {
      this.toastr.error(
        "Sila Cetak Tiket/Resit Untuk Simpanan",
        "Amaran"
      );
    }
  }

  clickPrinter() {
    if (this.checkout_state.status == false) {
      this.router.navigate(["/app/print-test"]);
    } else {
      this.toastr.error(
        "Sila Cetak Tiket/Resit Untuk Simpanan",
        "Amaran"
      );
    }
  }

  clickPermohonan() {
    if (this.checkout_state.status == false) {
      this.router.navigate(["/app/application"]);
    } else {
      this.toastr.error(
        "Sila Cetak Tiket/Resit Untuk Simpanan",
        "Amaran"
      );
    }
  }

  clickTempahan() {
    if (this.checkout_state.status == false) {
      this.router.navigate(["/app/home"]);
    } else {
      this.toastr.error(
        "Sila Cetak Tiket/Resit Untuk Simpanan",
        "Amaran"
      );
    }
  }

  clickBatal() {
    // create duplicate before delete
    this.cartService.filter("cart_status=CR&user=" + this.user_id).subscribe(
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
            }
          );
        }
      }
    );
  }

  // methods to create facilities
  createFacilities(facility_id) {
    this.facilitiesBookingService.filter("id=" + facility_id).subscribe(
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
          }
        );
      },
      (err) => {}
    );
  }
}
