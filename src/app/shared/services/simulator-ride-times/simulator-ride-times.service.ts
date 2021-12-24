import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { SimulatorRideTime } from "./simulator-ride-times.model";

@Injectable({
  providedIn: "root",
})
export class SimulatorRideTimesService {
  // URL
  public url: string = environment.baseUrl + "v1/simulator-ride-times/";

  // Data
  public simulatorridetimes: SimulatorRideTime[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<SimulatorRideTime> {
    return this.http.post<SimulatorRideTime>(this.url, body).pipe(
      tap((res) => {
      })
    );
  }

  getOne(id: string): Observable<any> {
    let urlFilter = this.url + id + "/";
    return this.http.get<any>(urlFilter).pipe(
      tap((res) => {
      })
    );
  }


  get(): Observable<SimulatorRideTime[]> {
    return this.http.get<SimulatorRideTime[]>(this.url).pipe(
      tap((res) => {
      })
    );
  }


  update(body: Form, id: string): Observable<SimulatorRideTime> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<SimulatorRideTime>(urlPatch, body).pipe(
      tap((res) => {
      })
    );
  }

  delete(id: string): Observable<SimulatorRideTime> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<SimulatorRideTime>(urlDelete).pipe(
      tap((res) => {
      })
    );
  }

  filter(field: String): Observable<SimulatorRideTime[]> {
    let urlFilter = this.url + '?' + field;
    return this.http.get<SimulatorRideTime[]>(urlFilter).pipe(
      tap((res) => {
      })
    );
  }

  getTimeTables(): Observable<any[]> {
    let urlTimeTables = this.url + "get_timetable";
    return this.http.get<any[]>(urlTimeTables).pipe(
      tap((res) => {
      })
    );
  }
}

