import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { EducationalProgramForm } from "./educational-program-forms.model";

@Injectable({
  providedIn: "root",
})
export class EducationalProgramFormsService {
  // URL
  public url: string = environment.baseUrl + "v1/educational-program-forms/";

  // Data
  public programform: EducationalProgramForm;
  public programforms: EducationalProgramForm[] = [];
  public programformsFiltered: EducationalProgramForm[] = [];

  constructor(private http: HttpClient) {}

  create(body): Observable<EducationalProgramForm> {
    return this.http.post<EducationalProgramForm>(this.url, body).pipe(
      tap((res) => {
        console.log("Educational program form: ", res);
      })
    );
  }

  getAll(): Observable<EducationalProgramForm[]> {
    return this.http.get<EducationalProgramForm[]>(this.url).pipe(
      tap((res) => {
        this.programforms = res;
        console.log("Educational program forms: ", this.programforms);
      })
    );
  }

  getOne(id: String): Observable<EducationalProgramForm> {
    let urlID = this.url + id + "/";
    return this.http.get<EducationalProgramForm>(urlID).pipe(
      tap((res) => {
        this.programform = res;
        console.log("Educational program form: ", this.programform);
      })
    );
  }

  update(body: Form, id: string): Observable<EducationalProgramForm> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<EducationalProgramForm>(urlPatch, body).pipe(
      tap((res) => {
        this.programform = res;
        console.log("Educational program forms: ", this.programform);
      })
    );
  }

  delete(id: string): Observable<EducationalProgramForm> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<EducationalProgramForm>(urlDelete).pipe(
      tap((res) => {
        console.log("Educational prgoram: ", res);
      })
    );
  }

  filter(field: String): Observable<EducationalProgramForm[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<EducationalProgramForm[]>(urlFilter).pipe(
      tap((res) => {
        this.programformsFiltered;
        console.log("Educational programs", this.programformsFiltered);
      })
    );
  }
}

