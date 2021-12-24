import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { PublicationCategory } from "./publication-categories.model";

@Injectable({
  providedIn: "root",
})
export class PublicationCategoriesService {
  // URL
  public url: string = environment.baseUrl + "v1/publication-categories/";

  // Data
  public publicationcategories: PublicationCategory[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<PublicationCategory> {
    return this.http.post<PublicationCategory>(this.url, body).pipe(
      tap((res) => {
        console.log("PublicationCategory: ", res);
      })
    );
  }

  get(): Observable<PublicationCategory[]> {
    return this.http.get<PublicationCategory[]>(this.url).pipe(
      tap((res) => {
        this.publicationcategories = res;
        console.log("PublicationCategories: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<PublicationCategory> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<PublicationCategory>(urlPatch, body).pipe(
      tap((res) => {
        console.log("PublicationCategory: ", res);
      })
    );
  }

  delete(id: string): Observable<PublicationCategory> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<PublicationCategory>(urlDelete).pipe(
      tap((res) => {
        console.log("PublicationCategory: ", res);
      })
    );
  }

  filter(field: String): Observable<PublicationCategory[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<PublicationCategory[]>(urlFilter).pipe(
      tap((res) => {
        console.log("PublicationCategories: ", res);
      })
    );
  }
}
