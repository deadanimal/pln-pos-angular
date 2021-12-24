import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { QuickLinkCategory } from "./quick-link-categories.model";

@Injectable({
  providedIn: "root",
})
export class QuickLinkCategoriesService {
  // URL
  public url: string = environment.baseUrl + "v1/quick-link-categories/";

  // Data
  public quicklinkcategories: QuickLinkCategory[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<QuickLinkCategory> {
    return this.http.post<QuickLinkCategory>(this.url, body).pipe(
      tap((res) => {
        console.log("QuickLinkCategory: ", res);
      })
    );
  }

  get(): Observable<QuickLinkCategory[]> {
    return this.http.get<QuickLinkCategory[]>(this.url).pipe(
      tap((res) => {
        this.quicklinkcategories = res;
        console.log("QuickLinkCategories: ", res);
      })
    );
  }

  update(body, id: string): Observable<QuickLinkCategory> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<QuickLinkCategory>(urlPatch, body).pipe(
      tap((res) => {
        console.log("QuickLinkCategory: ", res);
      })
    );
  }

  delete(id: string): Observable<QuickLinkCategory> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<QuickLinkCategory>(urlDelete).pipe(
      tap((res) => {
        console.log("QuickLinkCategory: ", res);
      })
    );
  }

  filter(field: String): Observable<QuickLinkCategory[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<QuickLinkCategory[]>(urlFilter).pipe(
      tap((res) => {
        console.log("QuickLinkCategories: ", res);
      })
    );
  }

  extended(): Observable<QuickLinkCategory[]> {
    return this.http.get<QuickLinkCategory[]>(this.url + "extended").pipe(
      tap((res) => {
        this.quicklinkcategories = res;
        console.log("QuickLinkCategories: ", res);
      })
    );
  }
}
