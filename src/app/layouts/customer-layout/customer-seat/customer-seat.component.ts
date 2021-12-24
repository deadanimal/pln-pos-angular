import { Component, OnInit, TemplateRef, NgZone } from "@angular/core"; import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CalendarsService } from "src/app/shared/services/calendars/calendars.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { ShowingsService } from "src/app/shared/services/showings/showings.service";
import { ShowtimesService } from "src/app/shared/services/showtimes/showtimes.service";
import { ShowbookingsService } from "src/app/shared/services/showbookings/showbookings.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

import { Seats } from "src/assets/json/seats";



@Component({
  selector: 'app-customer-seat',
  templateUrl: './customer-seat.component.html',
  styleUrls: ['./customer-seat.component.scss']
})
export class CustomerSeatComponent implements OnInit {

  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  booked = [];
  booked_seat = [];

  calendars = [];
  existbookings = [];
  schoolMinimum: boolean = true;
  selectedexistbookings = [];
  show: any;
  showings = [];
  showtimes = [];
  acceptedbookings = [];
  today: Date = new Date();
  totalticket: number = 0;
  totalSeat: number = 0;
  user_obj: any;

  seats = Seats;
  selectedSeats = [];
  enabledShowingDates = [];
  column: number = 0;
  row: number = 0;
  ticketcategories = [
    {
      value: "AD",
      display_name: "Adult",
      formcontrol: "adult",
      price_citizen: 6.0,
      price_noncitizen: 12.0,
    },
    {
      value: "KD",
      display_name: "Kid",
      formcontrol: "children",
      price_citizen: 4.0,
      price_noncitizen: 8.0,
    },
    {
      value: "OF",
      display_name: "Old Folk",
      formcontrol: "senior",
      price_citizen: 0.0,
      price_noncitizen: 0.0,
    },
    {
      value: "SD",
      display_name: "Student",
      formcontrol: "school",
      price_citizen: 4.0,
      price_noncitizen: 8.0,
    },
    {
      value: "OK",
      display_name: "OKU",
      formcontrol: "oku",
      price_citizen: 0.0,
      price_noncitizen: 0.0,
    },
  ];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
  };


  constructor(
    private formBuilder: FormBuilder,
    public modalService: BsModalService,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private calendarService: CalendarsService,
    private cartService: CartsService,
    private showingService: ShowingsService,
    private showtimeService: ShowtimesService,
    private showbookingService: ShowbookingsService,
    private w3cService: W3csService,
    private zone: NgZone,


  ) {
    this.today.setDate(this.today.getDate() + 1);

    this.getExistBooking();

    this.user_obj = this.authService.decodedToken();
    // this.route.queryParams.subscribe((params) => {
    //   if (this.router.getCurrentNavigation().extras.state)
    //     this.show = this.router.getCurrentNavigation().extras.state.show;
    // });
 
    this.getCalendar();
    this.getShowing();
    this.getEnableShowtime();



  }

  ngOnInit(): void {
    const broadcastChannel = new BroadcastChannel('channel1');
    console.log("this", broadcastChannel);
     
    broadcastChannel.onmessage = (message) => {

      this.zone.run(() => {
        this.booked_seat = [];
        this.column = 32;
        this.row = 10;
        console.log("msg", message);

        if ("booked_seat" in message.data) {
          this.selectedexistbookings = message.data.booked_seat;
          this.selectedexistbookings.forEach(i => this.booked_seat.push(i.ticket_seat))
        }
        
        else if ("array" in message.data) {
          this.selectSeat(message.data.array);
        }

        else if ("empty_seat" in message.data || message.data["array"] === undefined) {
          this.emptySeats();
        }
        

      });

      
    }

    
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  getSeat(row: number, column: number) {
    let result = this.seats[row].columns.find((value) => {
      return value.column === column;
    });
    if (result) return result.name;
  }

  getColor(row: number, column: number) {
    let result = this.seats[row].columns.find((value) => {
      return value.column === column;
    });
    if (result) return result.color;
  }

  getSelectedSeat(row: number, column: number) {
    // let selectedStyle = {
    //   backgroundColor: "red",
    //   color: "white",
    //   borderRadius: "10px",
    // };
    let selectedStyle = "btn-danger";
    for (let i = 0; i < this.selectedSeats.length; i++) {
      if (
        this.selectedSeats[i].row === row &&
        this.selectedSeats[i].column === column
      ) {
        return selectedStyle;
      }
    }
  }

  disableSeat(row: number, column: number) {
    let name = this.getSeat(row, column);
    return this.booked_seat.includes(name);
    
  }


  getCalendar() {
    this.calendarService.filter("status=true").subscribe(
      (res) => {
        // console.log("res", res);
        this.calendars = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getExistBooking() {
    this.showbookingService.get().subscribe(
      (res) => {
        this.existbookings = res;
        for (let i=0; i<res.length;i++) {
          this.booked.push(res[i].ticket_seat);
        }
        console.log("SSS", this.booked)
        
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getShowing() {
    if (this.route.snapshot.paramMap.get("id")) {
      let filterField = "id=" + this.route.snapshot.paramMap.get("id");
      this.showingService.filter(filterField).subscribe(
        (res) => {
          // console.log("res", res);
          this.showings = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  getEnableShowtime() {
    let filterField = "showing_id=" + this.route.snapshot.paramMap.get("id");
    this.showtimeService.filter(filterField).subscribe(
      (res) => {
        // console.log("res", res);
        for (let i = 0; i < res.length; i++) {
          let date = new Date(res[i].show_date);
          this.enabledShowingDates.push(date);
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  selectSeat(array) {
   this.selectedSeats.push(array);
  }

  emptySeats() {
    this.selectedSeats.splice(0, this.selectedSeats.length);
  }



}
