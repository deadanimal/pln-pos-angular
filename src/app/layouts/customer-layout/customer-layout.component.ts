import { Component, OnInit, NgZone } from '@angular/core';
import { EventEmitterService } from "src/app/shared/services/event-emitter/event-emitter.service";
import { DataServiceService } from "src/app/shared/services/data-service/data-service.service";
import { Router, NavigationEnd } from "@angular/router";


@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent implements OnInit {
  message: string;
  // channel = new BroadcastChannel('foobar');


  constructor(
    private eventEmitterService: EventEmitterService,
    private data: DataServiceService,
    private router: Router,

    private zone: NgZone,


  ) {

    const broadcastChannel = new BroadcastChannel('channel1');
    console.log("this", broadcastChannel);
     
    broadcastChannel.onmessage = (message) => {
      let data = message.data;
      let id = data.id;
      if (data.event == "openSeatEvent") {
        this.zone.run(() => {
          this.router.navigate(["/seat/" + id]);
        });


      }
    }
  }

  ngOnInit(): void {
    
  }

    

}
