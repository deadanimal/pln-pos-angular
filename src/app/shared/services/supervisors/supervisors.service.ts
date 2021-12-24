import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Supervisors } from "./supervisors.model";

@Injectable({
  providedIn: 'root'
})
export class SupervisorsService {

  // URL
  public url: string = environment.baseUrl + "v1/supervisors/";

  // Data
  public supervisors: Supervisors[] = [];


  constructor(private http: HttpClient) { }

  extended(field: string): Observable<Supervisors[]> {
    let urlExtended = "";
    if (field) urlExtended = this.url + "extended/?" + field;
    else urlExtended = this.url + "extended";
    return this.http.get<Supervisors[]>(urlExtended).pipe(
      tap((res) => {
        console.log("Supervisors: ", res);
      })
    );
  }


}
