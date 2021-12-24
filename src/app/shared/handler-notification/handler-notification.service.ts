import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HandlerNotificationService {

  constructor(
    public snackBar: MatSnackBar,
    public toastr: ToastrService
  ) { }

  openSnackBar(status: string, statusText: string) {
    this.snackBar.open(status, statusText, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: 'snackbar-danger'
    })
  }

  openToastrConnection() {
    let status = 'Error'
    let statusText = 'No connection'
    this.toastr.info(statusText, status)
  }

  openToastrHttp(status: any, statusText: string) {
    this.toastr.warning(statusText, status)
  }

}
