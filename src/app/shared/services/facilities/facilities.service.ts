import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Facility } from "./facilities.model";

@Injectable({
  providedIn: "root",
})
export class FacilitiesService {
  // URL
  public url: string = environment.baseUrl + "v1/facilities/";

  // Data
  public facilities: Facility[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<Facility> {
    return this.http.post<Facility>(this.url, body).pipe(
      tap((res) => {
        console.log("Facility: ", res);
      })
    );
  }

  get(): Observable<Facility[]> {
    return this.http.get<Facility[]>(this.url).pipe(
      tap((res) => {
        this.facilities = res;
        console.log("Facilities: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<Facility> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Facility>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Facility: ", res);
      })
    );
  }

  delete(id: string): Observable<Facility> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Facility>(urlDelete).pipe(
      tap((res) => {
        console.log("Facility: ", res);
      })
    );
  }

  filter(field: string): Observable<Facility[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Facility[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Facilities: ", res);
      })
    );
  }

  extended(): Observable<Facility[]> {
    return this.http.get<Facility[]>(this.url + "extended").pipe(
      tap((res) => {
        this.facilities = res;
        console.log("Facilities: ", res);
      })
    );
  }
}
