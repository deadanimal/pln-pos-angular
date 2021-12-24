import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { FacilityImage } from "./facility-images.model";

@Injectable({
  providedIn: "root",
})
export class FacilityImagesService {
  // URL
  public url: string = environment.baseUrl + "v1/facility-images/";

  // Data
  public facilityImages: FacilityImage[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<FacilityImage> {
    return this.http.post<FacilityImage>(this.url, body).pipe(
      tap((res) => {
        console.log("Facility image: ", res);
      })
    );
  }

  get(): Observable<FacilityImage[]> {
    return this.http.get<FacilityImage[]>(this.url).pipe(
      tap((res) => {
        this.facilityImages = res;
        console.log("Facility images: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<FacilityImage> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<FacilityImage>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Facility image: ", res);
      })
    );
  }

  delete(id: string): Observable<FacilityImage> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<FacilityImage>(urlDelete).pipe(
      tap((res) => {
        console.log("Facility image: ", res);
      })
    );
  }

  filter(field: string): Observable<FacilityImage[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<FacilityImage[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Facility images: ", res);
      })
    );
  }

  extended(): Observable<FacilityImage[]> {
    return this.http.get<FacilityImage[]>(this.url + "extended").pipe(
      tap((res) => {
        console.log("Facility images: ", res);
      })
    );
  }
}
