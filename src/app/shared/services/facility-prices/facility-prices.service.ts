import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { FacilityPrice } from "./facility-prices.model";

@Injectable({
  providedIn: "root",
})
export class FacilityPricesService {
  // URL
  public url: string = environment.baseUrl + "v1/facility-prices/";

  // Data
  public facilityPrices: FacilityPrice[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<FacilityPrice> {
    return this.http.post<FacilityPrice>(this.url, body).pipe(
      tap((res) => {
        console.log("Facility price: ", res);
      })
    );
  }

  get(): Observable<FacilityPrice[]> {
    return this.http.get<FacilityPrice[]>(this.url).pipe(
      tap((res) => {
        this.facilityPrices = res;
        console.log("Facility prices: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<FacilityPrice> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<FacilityPrice>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Facility price: ", res);
      })
    );
  }

  delete(id: string): Observable<FacilityPrice> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<FacilityPrice>(urlDelete).pipe(
      tap((res) => {
        console.log("Facility price: ", res);
      })
    );
  }

  filter(field: string): Observable<FacilityPrice[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<FacilityPrice[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Facility prices: ", res);
      })
    );
  }

  extended(): Observable<FacilityPrice[]> {
    return this.http.get<FacilityPrice[]>(this.url + "extended").pipe(
      tap((res) => {
        console.log("Facility prices: ", res);
      })
    );
  }
}
