
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Module } from "./modules.model";

@Injectable({
  providedIn: "root",
})
export class ModulesService {
  // URL
  public url: string = environment.baseUrl + "v1/modules/";

  // Data
  public modules: Module[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<Module> {
    return this.http.post<Module>(this.url, body).pipe(
      tap((res) => {
        console.log("Module: ", res);
      })
    );
  }

  get(): Observable<Module[]> {
    return this.http.get<Module[]>(this.url).pipe(
      tap((res) => {
        this.modules = res;
        console.log("Modules: ", res);
      })
    );
  }

  update(body, id: string): Observable<Module> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Module>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Module: ", res);
      })
    );
  }

  delete(id: string): Observable<Module> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Module>(urlDelete).pipe(
      tap((res) => {
        console.log("Module: ", res);
      })
    );
  }

  filter(field: String): Observable<Module[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Module[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Modules: ", res);
      })
    );
  }
}
