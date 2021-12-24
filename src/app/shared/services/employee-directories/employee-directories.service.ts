import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { EmployeeDirectory } from "./employee-directories.model";

@Injectable({
  providedIn: "root",
})
export class EmployeeDirectoriesService {
  // URL
  public url: string = environment.baseUrl + "v1/employee-directories/";

  // Data
  public employeedirectories: EmployeeDirectory[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<EmployeeDirectory> {
    return this.http.post<EmployeeDirectory>(this.url, body).pipe(
      tap((res) => {
        console.log("EmployeeDirectory: ", res);
      })
    );
  }

  get(): Observable<EmployeeDirectory[]> {
    return this.http.get<EmployeeDirectory[]>(this.url).pipe(
      tap((res) => {
        this.employeedirectories = res;
        console.log("EmployeeDirectories: ", res);
      })
    );
  }

  update(body, id: string): Observable<EmployeeDirectory> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<EmployeeDirectory>(urlPatch, body).pipe(
      tap((res) => {
        console.log("EmployeeDirectory: ", res);
      })
    );
  }

  delete(id: string): Observable<EmployeeDirectory> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<EmployeeDirectory>(urlDelete).pipe(
      tap((res) => {
        console.log("EmployeeDirectory: ", res);
      })
    );
  }

  filter(field: String): Observable<EmployeeDirectory[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<EmployeeDirectory[]>(urlFilter).pipe(
      tap((res) => {
        console.log("EmployeeDirectories: ", res);
      })
    );
  }

  extended(): Observable<EmployeeDirectory[]> {
    return this.http.get<EmployeeDirectory[]>(this.url + "extended").pipe(
      tap((res) => {
        this.employeedirectories = res;
        console.log("EmployeeDirectories: ", res);
      })
    );
  }
}
