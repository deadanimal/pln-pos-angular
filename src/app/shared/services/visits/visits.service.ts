import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Visit } from "./visits.model";

@Injectable({
  providedIn: "root",
})
export class VisitsService {
  // URL
  public url: string = environment.baseUrl + "v1/visits/";

  // Data
  public visits: Visit[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<Visit> {
    return this.http.post<Visit>(this.url, body).pipe(
      tap((res) => {
        console.log("Visit: ", res);
      })
    );
  }

  get(): Observable<Visit[]> {
    return this.http.get<Visit[]>(this.url).pipe(
      tap((res) => {
        this.visits = res;
        console.log("Visits: ", res);
      })
    );
  }

  update(body, id: string): Observable<Visit> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Visit>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Visit: ", res);
      })
    );
  }

  delete(id: string): Observable<Visit> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Visit>(urlDelete).pipe(
      tap((res) => {
        console.log("Visit: ", res);
      })
    );
  }

  filter(field: String): Observable<Visit[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Visit[]>(urlFilter).pipe(
      tap((res) => {
        this.visits = res;
        console.log("Visits: ", res);
      })
    );
  }
}
