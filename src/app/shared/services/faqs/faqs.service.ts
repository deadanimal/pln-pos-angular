import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Faq } from "./faqs.model";

@Injectable({
  providedIn: "root",
})
export class FaqsService {
  // URL
  public url: string = environment.baseUrl + "v1/faqs/";

  // Data
  public faqs: Faq[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<Faq> {
    return this.http.post<Faq>(this.url, body).pipe(
      tap((res) => {
        console.log("Faq: ", res);
      })
    );
  }

  get(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.url).pipe(
      tap((res) => {
        this.faqs = res;
        console.log("Faqs: ", res);
      })
    );
  }

  update(body, id: string): Observable<Faq> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Faq>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Faq: ", res);
      })
    );
  }

  delete(id: string): Observable<Faq> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Faq>(urlDelete).pipe(
      tap((res) => {
        console.log("Faq: ", res);
      })
    );
  }

  filter(field: String): Observable<Faq[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Faq[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Faqs: ", res);
      })
    );
  }

  extended(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.url + "extended").pipe(
      tap((res) => {
        this.faqs = res;
        console.log("Faqs: ", res);
      })
    );
  }
}
