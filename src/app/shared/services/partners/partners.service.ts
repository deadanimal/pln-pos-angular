import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Partner } from "./partners.model";

@Injectable({
  providedIn: "root",
})
export class PartnersService {
  // URL
  public url: string = environment.baseUrl + "v1/partners/";

  // Data
  public partners: Partner[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<Partner> {
    return this.http.post<Partner>(this.url, body).pipe(
      tap((res) => {
        console.log("Partner: ", res);
      })
    );
  }

  get(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.url).pipe(
      tap((res) => {
        this.partners = res;
        console.log("Partners: ", res);
      })
    );
  }

  update(body, id: string): Observable<Partner> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Partner>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Partner: ", res);
      })
    );
  }

  delete(id: string): Observable<Partner> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Partner>(urlDelete).pipe(
      tap((res) => {
        console.log("Partner: ", res);
      })
    );
  }

  filter(field: String): Observable<Partner[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Partner[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Partners: ", res);
      })
    );
  }

  extended(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.url + "extended").pipe(
      tap((res) => {
        this.partners = res;
        console.log("Partners: ", res);
      })
    );
  }
}
