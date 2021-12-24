import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { BankList } from "./bank-lists.model";

@Injectable({
  providedIn: "root",
})
export class BankListsService {
  // URL
  public url: string = environment.baseUrl + "v1/bank-lists/";

  // Data
  public banklists: BankList[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<BankList> {
    return this.http.post<BankList>(this.url, body).pipe(
      tap((res) => {
        console.log("BankList: ", res);
      })
    );
  }

  get(): Observable<BankList[]> {
    return this.http.get<BankList[]>(this.url).pipe(
      tap((res) => {
        this.banklists = res;
        console.log("BankLists: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<BankList> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<BankList>(urlPatch, body).pipe(
      tap((res) => {
        console.log("BankList: ", res);
      })
    );
  }

  delete(id: string): Observable<BankList> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<BankList>(urlDelete).pipe(
      tap((res) => {
        console.log("BankList: ", res);
      })
    );
  }
}
