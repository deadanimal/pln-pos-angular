import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { User } from "./users.model";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  // URL
  public url: string = environment.baseUrl + "v1/users/";

  // Data
  public currentUser: any;
  public users: User[] = [];
  public staffs: User[] = [];
  public administrator: User[] = [];
  public customer: User[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<User> {
    return this.http.post<User>(this.url, body).pipe(
      tap((res) => {
        console.log("User: ", res);
      })
    );
  }

  get(id: string): Observable<any> {
    return this.http.get<any>(this.url + id).pipe(
      tap((res) => {
        console.log("User: ", res);
      })
    );
  }

  getExtended(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}extended/?id=${id}`).pipe(
      tap((res) => {
        console.log("User: ", res);
      })
    );
  }


  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      tap((res) => {
        this.users = res;
        console.log("Users: ", res);
        this.filterTypes();
      })
    );
  }

  update(body: Form, id: string): Observable<User> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<User>(urlPatch, body).pipe(
      tap((res) => {
        console.log("User: ", res);
      })
    );
  }

  delete(id: string): Observable<User> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<User>(urlDelete).pipe(
      tap((res) => {
        console.log("User: ", res);
      })
    );
  }

  filterTypes() {
    this.administrator = [];
    this.staffs = [];
    this.customer = [];

    this.users.forEach((user) => {
      if (user.user_type == "AD") {
        this.administrator.push(user);
      } else if (user.user_type == "ST") {
        this.staffs.push(user);
      } else if (user.user_type == "CS") {
        this.customer.push(user);
      }
    });
  }

  verify_recaptcha(body): Observable<User> {
    let urlRecaptcha = this.url + "verify_recaptcha/";
    return this.http.post<User>(urlRecaptcha, body).pipe(
      tap((res) => {
        console.log("User: ", res);
      })
    );
  }
}
