import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { DailyReports } from "src/app/shared/services/reporting/reporting.model";


@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  // URL
  public url: string = environment.baseUrl + "v1/pos-daily-reports/";

  // data
  cashTransactions: DailyReports[] = [];

  constructor(private http: HttpClient) { }

  post(body): Observable<DailyReports> {
    return this.http.post<DailyReports>(this.url, body).pipe(
      tap((res) => {
        console.log("DailyReports: ", res);
      })
    );
  }

  get(): Observable<DailyReports[]> {
    return this.http.get<DailyReports[]>(this.url).pipe(
      tap((res) => {
        this.cashTransactions = res;
        console.log("DailyReports: ", res);
      })
    );
  }

  update(body, id: string): Observable<DailyReports> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<DailyReports>(urlPatch, body).pipe(
      tap((res) => {
        console.log("DailyReports: ", res);
      })
    );
  }

  delete(id: string): Observable<DailyReports> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<DailyReports>(urlDelete).pipe(
      tap((res) => {
        console.log("DailyReports: ", res);
      })
    );
  }

  filter(field: String): Observable<DailyReports[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<DailyReports[]>(urlFilter).pipe(
      tap((res) => {
        console.log("DailyReportss: ", res);
      })
    );
  }

  extended(field): Observable<DailyReports[]> {
    let urlExtended = "";
    if (field) urlExtended = this.url + "extended/?" + field;
    else urlExtended = this.url + "extended";
    return this.http.get<DailyReports[]>(urlExtended).pipe(
      tap((res) => {
        console.log("DailyReportss: ", res);
      })
    );
  }

}
