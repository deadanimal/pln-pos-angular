import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { DynamicContent } from "./dynamic-contents.model";

@Injectable({
  providedIn: "root",
})
export class DynamicContentsService {
  // URL
  public url: string = environment.baseUrl + "v1/dynamic-contents/";

  // Data
  public dynamiccontents: DynamicContent[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<DynamicContent> {
    return this.http.post<DynamicContent>(this.url, body).pipe(
      tap((res) => {
        console.log("DynamicContent: ", res);
      })
    );
  }

  get(): Observable<DynamicContent[]> {
    return this.http.get<DynamicContent[]>(this.url).pipe(
      tap((res) => {
        this.dynamiccontents = res;
        console.log("DynamicContents: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<DynamicContent> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<DynamicContent>(urlPatch, body).pipe(
      tap((res) => {
        console.log("DynamicContent: ", res);
      })
    );
  }

  delete(id: string): Observable<DynamicContent> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<DynamicContent>(urlDelete).pipe(
      tap((res) => {
        console.log("DynamicContent: ", res);
      })
    );
  }

  filter(field: String): Observable<DynamicContent[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<DynamicContent[]>(urlFilter).pipe(
      tap((res) => {
        console.log("DynamicContents: ", res);
      })
    );
  }
}
