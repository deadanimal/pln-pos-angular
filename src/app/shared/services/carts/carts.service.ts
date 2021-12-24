import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Cart } from "./carts.model";

@Injectable({
  providedIn: "root",
})
export class CartsService {
  // URL
  public url: string = environment.baseUrl + "v1/carts/";

  // Data
  public carts: Cart[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<Cart> {
    return this.http.post<Cart>(this.url, body).pipe(
      tap((res) => {
        console.log("Cart: ", res);
      })
    );
  }

  get(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.url).pipe(
      tap((res) => {
        this.carts = res;
        console.log("Carts: ", res);
      })
    );
  }

  getOne(id: string): Observable<any> {
    return this.http.get<any>(this.url + id + "/").pipe(
      tap((res) => {
        this.carts = res;
        console.log("Carts: ", res);
      })
    );
  }


  update(body, id: string): Observable<Cart> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Cart>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Cart: ", res);
      })
    );
  }

  delete(id: string): Observable<Cart> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Cart>(urlDelete).pipe(
      tap((res) => {
        console.log("Cart: ", res);
      })
    );
  }

  filter(field: String): Observable<Cart[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Cart[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Carts: ", res);
      })
    );
  }

  deleteBulk(user: string): Observable<Cart> {
    let urlDelete = this.url + "bulk_delete_by_user/";
    return this.http.post<any>(urlDelete, {"user": user}).pipe(
      tap((res) => {
        console.log("Cart: ", res);
      })
    );
  }


  extended(field): Observable<Cart[]> {
    let urlExtended = "";
    if (field) urlExtended = this.url + "extended/?" + field;
    else urlExtended = this.url + "extended";
    return this.http.get<Cart[]>(urlExtended).pipe(
      tap((res) => {
        console.log("Carts: ", res);
      })
    );
  }
}
