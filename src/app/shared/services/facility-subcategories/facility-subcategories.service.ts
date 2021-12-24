import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { FacilitySubcategory } from "./facility-subcategories.model";

@Injectable({
  providedIn: "root",
})
export class FacilitySubcategoriesService {
  // URL
  public url: string = environment.baseUrl + "v1/facility-subcategories/";

  // Data
  public facilitysubcategories: FacilitySubcategory[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<FacilitySubcategory> {
    return this.http.post<FacilitySubcategory>(this.url, body).pipe(
      tap((res) => {
        console.log("FacilitySubcategory: ", res);
      })
    );
  }

  get(): Observable<FacilitySubcategory[]> {
    return this.http.get<FacilitySubcategory[]>(this.url).pipe(
      tap((res) => {
        this.facilitysubcategories = res;
        console.log("FacilitySubcategories: ", res);
      })
    );
  }

  update(body, id: string): Observable<FacilitySubcategory> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<FacilitySubcategory>(urlPatch, body).pipe(
      tap((res) => {
        console.log("FacilitySubcategory: ", res);
      })
    );
  }

  delete(id: string): Observable<FacilitySubcategory> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<FacilitySubcategory>(urlDelete).pipe(
      tap((res) => {
        console.log("FacilitySubcategory: ", res);
      })
    );
  }

  filter(field: string): Observable<FacilitySubcategory[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<FacilitySubcategory[]>(urlFilter).pipe(
      tap((res) => {
        console.log("FacilitySubcategories: ", res);
      })
    );
  }
}
