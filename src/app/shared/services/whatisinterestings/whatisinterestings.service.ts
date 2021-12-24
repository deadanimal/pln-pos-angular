import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { WhatIsInteresting } from "./whatisinterestings.model";

@Injectable({
  providedIn: "root",
})
export class WhatisinterestingsService {
  // URL
  public url: string = environment.baseUrl + "v1/whatisinterestings/";

  // Data
  public whatisinterestings: WhatIsInteresting[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<WhatIsInteresting> {
    return this.http.post<WhatIsInteresting>(this.url, body).pipe(
      tap((res) => {
        console.log("WhatIsInteresting: ", res);
      })
    );
  }

  get(): Observable<WhatIsInteresting[]> {
    return this.http.get<WhatIsInteresting[]>(this.url).pipe(
      tap((res) => {
        this.whatisinterestings = res;
        console.log("WhatIsInterestings: ", res);
      })
    );
  }

  update(body, id: string): Observable<WhatIsInteresting> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<WhatIsInteresting>(urlPatch, body).pipe(
      tap((res) => {
        console.log("WhatIsInteresting: ", res);
      })
    );
  }

  delete(id: string): Observable<WhatIsInteresting> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<WhatIsInteresting>(urlDelete).pipe(
      tap((res) => {
        console.log("WhatIsInteresting: ", res);
      })
    );
  }

  filter(field: String): Observable<WhatIsInteresting[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<WhatIsInteresting[]>(urlFilter).pipe(
      tap((res) => {
        console.log("WhatIsInterestings: ", res);
      })
    );
  }
}
