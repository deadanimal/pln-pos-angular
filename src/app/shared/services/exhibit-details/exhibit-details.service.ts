import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { ExhibitDetail } from "./exhibit-details.model";

@Injectable({
  providedIn: "root",
})
export class ExhibitDetailsService {
  // URL
  public url: string = environment.baseUrl + "v1/exhibit-details/";

  // Data
  public exhibitdetails: ExhibitDetail[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<ExhibitDetail> {
    return this.http.post<ExhibitDetail>(this.url, body).pipe(
      tap((res) => {
        console.log("Exhibit Detail: ", res);
      })
    );
  }

  get(): Observable<ExhibitDetail[]> {
    return this.http.get<ExhibitDetail[]>(this.url).pipe(
      tap((res) => {
        this.exhibitdetails = res;
        console.log("Exhibit Details: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<ExhibitDetail> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<ExhibitDetail>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Exhibit Detail: ", res);
      })
    );
  }

  delete(id: string): Observable<ExhibitDetail> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<ExhibitDetail>(urlDelete).pipe(
      tap((res) => {
        console.log("Exhibit Detail: ", res);
      })
    );
  }

  filter(field: string): Observable<ExhibitDetail[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<ExhibitDetail[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Exhibit Details: ", res);
      })
    );
  }

  extended(): Observable<ExhibitDetail[]> {
    return this.http.get<ExhibitDetail[]>(this.url + "extended").pipe(
      tap((res) => {
        console.log("Exhibit Details: ", res);
      })
    );
  }
}
