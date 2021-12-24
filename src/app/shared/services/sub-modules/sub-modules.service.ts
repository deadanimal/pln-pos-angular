
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { SubModule } from "./sub-modules.model";

@Injectable({
  providedIn: "root",
})
export class SubModulesService {
  // URL
  public url: string = environment.baseUrl + "v1/sub-modules/";

  // Data
  public submodules: SubModule[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<SubModule> {
    return this.http.post<SubModule>(this.url, body).pipe(
      tap((res) => {
        console.log("SubModule: ", res);
      })
    );
  }

  get(): Observable<SubModule[]> {
    return this.http.get<SubModule[]>(this.url).pipe(
      tap((res) => {
        this.submodules = res;
        console.log("SubModules: ", res);
      })
    );
  }

  update(body, id: string): Observable<SubModule> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<SubModule>(urlPatch, body).pipe(
      tap((res) => {
        console.log("SubModule: ", res);
      })
    );
  }

  delete(id: string): Observable<SubModule> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<SubModule>(urlDelete).pipe(
      tap((res) => {
        console.log("SubModule: ", res);
      })
    );
  }

  filter(field: String): Observable<SubModule[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<SubModule[]>(urlFilter).pipe(
      tap((res) => {
        console.log("SubModules: ", res);
      })
    );
  }
}
