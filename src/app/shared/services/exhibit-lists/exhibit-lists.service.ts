import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { ExhibitList } from "./exhibit-lists.model";

@Injectable({
  providedIn: "root",
})
export class ExhibitListsService {
  // URL
  public url: string = environment.baseUrl + "v1/exhibit-lists/";

  // Data
  public exhibitlists: ExhibitList[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<ExhibitList> {
    return this.http.post<ExhibitList>(this.url, body).pipe(
      tap((res) => {
        console.log("Exhibit List: ", res);
      })
    );
  }

  get(): Observable<ExhibitList[]> {
    return this.http.get<ExhibitList[]>(this.url).pipe(
      tap((res) => {
        this.exhibitlists = res;
        console.log("Exhibit Lists: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<ExhibitList> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<ExhibitList>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Exhibit List: ", res);
      })
    );
  }

  delete(id: string): Observable<ExhibitList> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<ExhibitList>(urlDelete).pipe(
      tap((res) => {
        console.log("Exhibit List: ", res);
      })
    );
  }

  filter(field: string): Observable<ExhibitList[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<ExhibitList[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Exhibit Lists: ", res);
      })
    );
  }

  extended(): Observable<ExhibitList[]> {
    return this.http.get<ExhibitList[]>(this.url + "extended").pipe(
      tap((res) => {
        console.log("Exhibit Lists: ", res);
      })
    );
  }
}
