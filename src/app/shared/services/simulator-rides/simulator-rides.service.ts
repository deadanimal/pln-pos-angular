import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { SimulatorRide } from "./simulator-rides.model";

@Injectable({
  providedIn: "root",
})
export class SimulatorRidesService {
  // URL
  public url: string = environment.baseUrl + "v1/simulator-rides/";

  // Data
  public simulatorrides: SimulatorRide[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<SimulatorRide> {
    return this.http.post<SimulatorRide>(this.url, body).pipe(
      tap((res) => {
        console.log("SimulatorRide: ", res);
      })
    );
  }

  get(): Observable<SimulatorRide[]> {
    return this.http.get<SimulatorRide[]>(this.url).pipe(
      tap((res) => {
        this.simulatorrides = res;
        console.log("SimulatorRides: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<SimulatorRide> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<SimulatorRide>(urlPatch, body).pipe(
      tap((res) => {
        console.log("SimulatorRide: ", res);
      })
    );
  }

  filter(field: String): Observable<SimulatorRide[]> {
    let urlFilter = this.url + '?' + field
    return this.http.get<SimulatorRide[]>(urlFilter).pipe(
      tap((res) => {
        console.log('SimulatorRide', res)
      })
    )
  }


  delete(id: string): Observable<SimulatorRide> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<SimulatorRide>(urlDelete).pipe(
      tap((res) => {
        console.log("SimulatorRide: ", res);
      })
    );
  }
 
}
