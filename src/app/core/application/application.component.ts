import { Component, OnInit, TemplateRef } from '@angular/core'; import { ShowbookingsService } from "src/app/shared/services/showbookings/showbookings.service";
import { RefundsService } from "src/app/shared/services/refunds/refunds.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { SimulatorRideBookingsService } from "src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";
import { SupervisorsService } from "src/app/shared/services/supervisors/supervisors.service";
import { Supervisors } from "src/app/shared/services/supervisors/supervisors.model";
import { InvoiceReceiptsService } from "src/app/shared/services/invoice-receipts/invoice-receipts.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import * as FileSaver from 'file-saver';
import * as data from "src/app/shared/imagebyte/img.json";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { map, tap, catchError } from "rxjs/operators";





@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  // Show Enum 
  enumArray = {
    // ticket type
    "CZ": "Warganegara",
    "NC": "Bukan Warganegara",

    // ticket category
    "AD": "Dewasa",
    "KD": "Kanak-kanak",
    "OF": "Warga emas",
    "SD": "Pelajar",
    "OK": "OKU",

    // organisation category
    "GV": "Kerajaan", 
    "SC": "Sekolah",
    "UN": "Universiti",

    // tempoh tempahan
    "HALF": "Separuh hari", 
    "FULL": "Satu hari", 
    "NONE": "Tiada", 

    // status alat
    "WITH": "Dengan peralatan",
    "WOUT": "Tanpa peralatan",

    // status tayangan
    "SB01": "Dalam proses",
    "SB02": "Diterima",
    "SB03": "Ditolak",
    "SB04": "Bayaran diproses",
    "SB05": "Bayaran diterima",
    "SB06": "Bayaran ditolak",
    "SB07": "Bayaran dikembalikan",

    // status simulator
    "SRB01": "Diterima",
    "SRB02": "Bayaran diproses",
    "SRB03": "Bayaran diterima",
    "SRB04": "Bayaran ditolak",
    "SRB05": "Bayaran dikembalikan",

    // status fasiliti
    "FB01": "Dalam proses",
    "FB02": "Diterima",
    "FB03": "Ditolak",
    "FB04": "Bayaran diproses",
    "FB05": "Bayaran diterima",
    "FB06": "Bayaran ditolak",
    "FB07": "Bayaran dikembalikan",

    // hari hari ku sepi selalu
    "SAT": "Ahad",
    "MON": "Isnin",
    "TUE": "Selasa",
    "WED": "Rabu",
    "THU": "Khamis",
    "FRI": "Jumaat",
    "SUN": "Sabtu",
        
  }     


  selectedDate:any;
  selectedDate1:any;

  // id
  user: any; 

  // temp
  svId: any[] = [];
  currentProduct: any;
  currentProductGroup: string;
  detailTemp: any;
  targetObj: any;
  targetObjGroup: any;
  title: any;
        
  // table
  tableEntries: number = 10;
  tableSelected: any[] = [];
  tableActiveRow: any;

  // supervisors
  supervisors: Supervisors[] = [];

  // showing 
  showTemp = [];
  showRows: any[] = [];

  // space-pod 
  spaceTemp = [];
  spaceRows: any[] = [];

  // facility 
  facilityTemp = [];
  facilityRows: any[] = [];
  
  // formGroup
  refundFormGroup: FormGroup;
  
  // modal
  confirmRefundModal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
    backdrop: false,
    ignoreBackdropClick: true,
  };

  // refund body
  refund = {
    "refund_running_no": "",
    "refund_type": "",
    "description": "",
    "amount": "",
    "acc_number": "",
    "remarks": "Cash transaction through pos",
    "user": "",
    "pic_verification_id": "",
    "pic_verification_datetime": "",

    // update when refund btn clicked
    "show_booking_id": "",
    "simulator_ride_booking_id": "",
    "facility_booking_id": "",
  }

  // butiran display
  // show
  show_name: any;
  show_ticket_type: any;
  show_ticket_cat: any;
  show_title: any;
  show_seat: any;
  show_date: any;
  show_time: any;
  show_price: any;
  show_status: any;

  // space 
  space_name: any;
  space_ticket_type: any;
  space_ticket_cat: any;
  space_title: any;
  space_seat: any;
  space_date: any;
  space_time: any;
  space_price: any;
  space_status: any;

  // facility 
  facility_name: any;
  facility_phone: any;
  facility_email: any;
  facility_organisation: any;
  facility_organisation_type: any;
  facility_date: any;
  facility_head: any;
  facility_equipment: any;
  facility_status: any;
  facility_price: any;
  facility_place: any;


  constructor(
    private showbookingService: ShowbookingsService,
    private simulatorbookingService: SimulatorRideBookingsService,
    private facilitybookingService: FacilityBookingsService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthService,
    private refundService: RefundsService,
    private supervisorservice: SupervisorsService,
    private invoicereceiptService: InvoiceReceiptsService,
    private cartService: CartsService,
    private toastr: ToastrService,


  ) {
    
    // init refundFormGroup
    this.refundFormGroup = this.formBuilder.group({
      penyelia_id: ["", Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
    this.selectedDate = new Date();
    this.selectedDate1 = new Date();

    this.getBookingData();
    this.setTitleShow();

    // update user value -> current staff
    let user = this.authService.decodedToken().user_id
    this.user = user;
    this.refund['user'] = user
    this.refund['pic_verification_id'] = user
  }

  // main method
  getBookingData() {
    // show
    this.showbookingService
      .extended("")
      .pipe(map(x => x.filter(i => (i as any).showtime_id.show_date == this.selectedDate1.toJSON("yyyy-MM-dd").slice(0,10))))
      .subscribe((res) => {
        console.log("RESSS", res);

        this.showRows = res; 
        this.showTemp = this.showRows.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };
        });
      });
    
    // space pod
    this.simulatorbookingService
      .extended("")
      .pipe(map(x => x.filter(i => i.booking_date == this.selectedDate.toJSON("yyyy-MM-dd").slice(0,10))))
      .subscribe((res) => {

        this.spaceRows = res; 
        this.spaceTemp = this.spaceRows.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };
        });
      });

    // facility
    this.facilitybookingService
      .extended()
      .pipe(map(x => x.filter(i => i.booking_date == this.selectedDate.toJSON("yyyy-MM-dd").slice(0,10))))
      .subscribe((res) => {
        
        this.facilityRows = res; 
        this.facilityTemp = this.facilityRows.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };
        });
      });
  }

  filterTableShow($event) {
    let val = $event.target.value;
    this.showTemp = this.showRows.filter(function (d) {
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

  filterTableSpace($event) {
    let val = $event.target.value;
    this.spaceTemp = this.spaceRows.filter(function (d) {
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

  filterTableFacility($event) {
    let val = $event.target.value;
      this.facilityTemp = this.facilityRows.filter(function (d) {
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






  validateRefund() {
    let today_date = new Date().toJSON("yyyy-MM-dd").slice(0,10);

    this.supervisorservice.extended("").pipe(map(x => x.filter(i => i.user.staff_id === this.refundFormGroup.value.penyelia_id &&
      i.date_on_duty === today_date
    ))).subscribe(
      (res) => {
        if (res.length > 0) {
          this.refundBooking();
           this.toastr.info(
                "Permohonan bayaran balik diproses",
                "Info"
          );

        } else {
          this.toastr.error(
                "Penyelia ID tidak wujud",
                "Ralat"
          );

        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  // refunds method for all products
  refundBooking() {
    // check refundForm if input exist in supervisor id array
    let tempService: any;
    let body = {"status": ""}

    if (this.currentProductGroup == 'show') {

      // obj for post request on refund endpoint
      this.refund['show_booking_id'] = this.currentProduct.id

      // service and obj for put request on product endpoint
      tempService = this.showbookingService;
      body['status'] = "SB07"
      
    } else if (this.currentProductGroup == 'space') {
      this.refund['simulator_ride_booking_id'] = this.currentProduct.id
      tempService = this.simulatorbookingService;
      body['status'] = "SRB05"

    } else if (this.currentProductGroup == 'facility') {
      this.refund['facility_booking_id'] = this.currentProduct.id
      tempService = this.facilitybookingService; 
      body['status'] = "FB05"
    }
    
    // step 1: update product status to refund
    tempService.update(body, this.currentProduct.id).subscribe(
      (res)=> {
      },
      (err) => {
      },
      () => {
        this.getBookingData();


        // step 2: create refund 
        this.refund['pic_verification_datetime'] = new Date().toJSON("yyyy/MM/dd HH:mm");
        this.refund['amount'] = this.currentProduct.total_price
        this.refund['refund_type'] = "M"
        this.refund['status'] = "RA"

        this.refundService.post(this.refund).subscribe(
          (res) => {
            console.log(res)
            this.confirmRefundModal.hide()
          },
          (err) => {
            this.confirmRefundModal.hide()
          },
          () => {
            // step 3: update cash inventory

          }
        );
        
      }
    );
  }
  
  reprintReceipt() {

    let targetObjId = this.targetObj.id;
    console.log("product id", targetObjId);
    let cartId = "";
    let receiptId = "";
    
    if (this.targetObjGroup == 'show') {
      this.cartService.get().pipe(map(x => x.filter(i => i.show_booking_id.length > 0))).subscribe(
        (res) => {
          for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < res[i].show_booking_id.length; j++) {
              if (res[i].show_booking_id[j] == targetObjId) {
                cartId = res[i].id;
              }
            }
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.generatePdf(cartId);
        }
      );

    } else if (this.targetObjGroup == 'space') {
      this.cartService.get().pipe(map(x => x.filter(i => i.simulator_ride_booking_id.length > 0))).subscribe(
        (res) => {
          for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < res[i].simulator_ride_booking_id.length; j++) {
              if (res[i].simulator_ride_booking_id[j] == targetObjId) {
                cartId = res[i].id;
              }
            }
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.generatePdf(cartId);
        }
      );


    } else if (this.targetObjGroup == 'facility') {
      this.cartService.get().pipe(map(x => x.filter(i => i.facility_booking_id.length > 0))).subscribe(
        (res) => {
          for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < res[i].facility_booking_id.length; j++) {
              if (res[i].facility_booking_id[j] == targetObjId) {
                cartId = res[i].id;
              }
            }
          }


        },
        (err) => {
          console.log(err);
        },
        () => {
          this.generatePdf(cartId);
        }
      );

    }
  }

  reprintTicket() {
    if (this.targetObjGroup == 'show') {
      this.showbookingService.generateTicket("id=" + this.targetObj.id).subscribe(
        (res) => {                                                             
          let filename: string;
          filename = "tiket_tayangan.pdf"                                               
          FileSaver.saveAs(res, filename)                                      
        },                                                                     
        (err) => {                                                             
          console.log(err)                                                     
      }); 
    } else if (this.targetObjGroup == 'space') {
      this.simulatorbookingService.reprint_ticket(this.targetObj.id).subscribe(
        (res) => {                                                             
          console.log("JOMBO", res);
          let filename: string;
          filename = "tiket_kembara.pdf"                                               
          FileSaver.saveAs(res.base64pdf, filename)                                      
        },                                                                     
        (err) => {                                                             
          console.log(err)                                                     
      }); 

    }
  }

  
  generatePdf(cartId) {
    console.log("cartId", cartId);
    let cartArray: any[] = [];
    let receiptId = "";
      this.invoicereceiptService.get().subscribe(
        (res) => {
          for (let i = 0; i < res.length; i++) {
           
            cartArray = res[i].cart_id;
            let index = cartArray.indexOf(cartId);

            console.log("selected index", index)

            if (index != -1) {
              receiptId = res[i].id;
              console.log("selected receipt", receiptId)
            }
          }
        },
        (err) => {
          console.log(err);
        }, 
        () => {
          if (receiptId != "") {
            this.invoicereceiptService.generateReceipt("id=" + receiptId).subscribe(
              (res) => {
                let filename: string;
                filename = "resit.pdf"
                FileSaver.saveAs(res, filename)
              },
              (err) => {
                console.log(err);
            });

          } else {
            this.toastr.error(
              "Data resit tidak wujud",
              "Ralat"
            );
          }
        }
      );
  }
  

  // table utils 
  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  filterTable($event) {
    let val = $event.target.value;
    this.showTemp = this.showRows.filter(function (d) {
      for (var key in d) {
        if (
          d[key]
            .toString()
            .toLowerCase()
            .indexOf(val.toString().toLowerCase()) !== -1
        ) {
          return true;
        }
      }
      return false;
    });
  }
  
  // tab active
  setTitleShow() {
    document.getElementById("tab1").style.color = "red";
  }

  // modal utils
  openModal(template: TemplateRef<any>, obj, group) {
    this.confirmRefundModal = this.modalService.show(template, this.modalConfig);

    // set current product when modal open
    this.currentProduct = obj;
    this.currentProductGroup = group
  }

  openModalDetail(template: TemplateRef<any>, group, obj) {
    console.log("objId", obj);

    // for educational purposes
    this.targetObj = obj;
    this.targetObjGroup = group;

    // assign based on group choosed
    if (group == 'show') {

      this.detailTemp = group;
      this.show_name = obj.user_id.full_name 
      this.show_ticket_type = this.enumArray[obj.ticket_type]
      this.show_ticket_cat = this.enumArray[obj.ticket_category] 
      this.show_date = obj.showtime_id.show_date
      this.show_time = obj.showtime_id.show_time
      this.show_price = obj.total_price
      this.show_status = this.enumArray[obj.status]
      this.show_seat = obj.ticket_seat
      this.show_title = obj.show_id.title_ms

    }

    if (group == 'space') {

      this.detailTemp = group;
      this.space_name = obj.user_id.full_name 
      this.space_ticket_type = this.enumArray[obj.ticket_type]
      this.space_ticket_cat = this.enumArray[obj.ticket_category] 
      this.space_date = this.enumArray[obj.simulator_ride_time_id.day]
      this.space_time = obj.simulator_ride_time_id.time
      this.space_price = obj.total_price
      this.space_status = this.enumArray[obj.status]

    }

    if (group == 'facility') {

      this.detailTemp = group;
      this.facility_name = obj.user_name
      this.facility_phone = obj.user_phone 
      this.facility_email = obj.user_email
      this.facility_organisation = obj.organisation_name
      this.facility_organisation_type = this.enumArray[obj.organisation_category]
      this.facility_date = obj.booking_date
      this.facility_head = obj.number_of_people
      this.facility_equipment = this.enumArray[obj.want_equipment]
      this.facility_status = this.enumArray[obj.status] 
      this.facility_price = obj.total_price
      this.facility_place = obj.facility_id.name_ms
    }


    this.modalService.show(template, this.modalConfig)
  }

  closeModal() {
    this.modalService.hide()
  }
}
