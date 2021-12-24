import { ViewEncapsulation } from '@angular/core'; import { Component, OnInit } from '@angular/core';
import { ShowtimesService } from "src/app/shared/services/showtimes/showtimes.service";
import { ShowingsService } from "src/app/shared/services/showings/showings.service";
import { map, tap, catchError } from "rxjs/operators";
import { SimulatorRideBookingsService } from "src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service";
import { SimulatorRideTimesService } from "src/app/shared/services/simulator-ride-times/simulator-ride-times.service";
import { VenuesService } from "src/app/shared/services/venues/venues.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  scheduleEnums = {
    "AV": "Ada",
    "NA": "Tidak Ada",
    
    "P1": "Pusingan 1",
    "P2": "Pusingan 2",
    "P3": "Pusingan 3",
    "P4": "Pusingan 4",
    "P5": "Pusingan 5",

    "MON": "Isnin",
    "TUE": "Selasa",
    "WED": "Rabu",
    "THU": "Khamis",
    "FRI": "Jumaat",
    "SAT": "Sabtu",
    "SUN": "Ahad",
 
  }

  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableActiveRow: any;

  simulatorrideTimesTemp: any[] = [];
  simulatorrideTimes: any[] = [];

  showingTimesTemp: any[] = [];
  showingTimes: any[] = [];

  shows = [];
  venues = [];

  constructor(
    private simulatorRideBookingsService: SimulatorRideBookingsService,
    private simulatorRideTimeService: SimulatorRideTimesService,
    private showingService: ShowingsService,
    private venueService: VenuesService,
    private showtimeService: ShowtimesService,
    private router: Router,

  ) {
  }

  ngOnInit(): void {
    this.getScheduleDataShowing();
    this.getScheduleDataSimulatorRide();
    this.getShowing();
    this.getVenue();
  }

  getShowing() {
    this.showingService.get().subscribe(
      (res) => {
        this.shows = res.reverse();
      },
      (err) => {
      }
    );
  }

  getVenue() {
    this.venueService.get().subscribe(
      (res) => {
        this.venues = res;
      },
      (err) => {
      }
    );
  }

  getScheduleDataShowing() {
    this.showtimeService.getTimeTables().subscribe(
      (res) => {
        this.showingTimes = res;
        this.showingTimesTemp = this.showingTimes.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };
        });

      },
      (err) => {
      }
    );
  }

  getScheduleDataSimulatorRide() {
    this.simulatorRideTimeService.getTimeTables().subscribe(
      (res) => {
        this.simulatorrideTimes = res;
        console.log("this.simulatorrideTimes", this.simulatorrideTimes);
        this.simulatorrideTimesTemp = this.simulatorrideTimes.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };
        });
        
      },
      (err) => {
      }
    );
    
  }

  filterTableSimulatorRides($event) {
    let val = $event.target.value;
    this.simulatorrideTimesTemp= this.simulatorrideTimes.filter(function (d) {
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

  filterTableShowings($event) {
    let val = $event.target.value;
    this.showingTimesTemp = this.showingTimes.filter(function (d) {
      //d = d.showing_id;
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


  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  redirectToPageTayangan() {
    this.router.navigate(["app/shows"]);
  }

  redirectToPageSimulasi() {
    this.router.navigate(["app/simulator-ride/simulator-ride-book"]);
  }


}

