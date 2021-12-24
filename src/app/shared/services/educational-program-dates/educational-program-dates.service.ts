import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { EducationalProgramDate } from "./educational-program-dates.model";

@Injectable({
  providedIn: "root",
})
export class EducationalProgramDatesService {
  // URL
  public url: string = environment.baseUrl + "v1/educational-program-dates/";

  // Data
  public programdate: EducationalProgramDate;
  public programdates: EducationalProgramDate[] = [];
  public programdatesFiltered: EducationalProgramDate[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<EducationalProgramDate> {
    return this.http.post<EducationalProgramDate>(this.url, body).pipe(
      tap((res) => {
        console.log("Educational program date: ", res);
      })
    );
  }

  getAll(): Observable<EducationalProgramDate[]> {
    return this.http.get<EducationalProgramDate[]>(this.url).pipe(
      tap((res) => {
        this.programdates = res;
        console.log("Educational program dates: ", this.programdates);
      })
    );
  }

  getOne(id: String): Observable<EducationalProgramDate> {
    let urlID = this.url + id + "/";
    return this.http.get<EducationalProgramDate>(urlID).pipe(
      tap((res) => {
        this.programdate = res;
        console.log("Educational program date: ", this.programdate);
      })
    );
  }

  update(body: Form, id: string): Observable<EducationalProgramDate> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<EducationalProgramDate>(urlPatch, body).pipe(
      tap((res) => {
        this.programdate = res;
        console.log("Educational program dates: ", this.programdate);
      })
    );
  }

  delete(id: string): Observable<EducationalProgramDate> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<EducationalProgramDate>(urlDelete).pipe(
      tap((res) => {
        console.log("Educational prgoram: ", res);
      })
    );
  }

  filter(field: String): Observable<EducationalProgramDate[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<EducationalProgramDate[]>(urlFilter).pipe(
      tap((res) => {
        this.programdatesFiltered;
        console.log("Educational programs", this.programdatesFiltered);
      })
    );
  }

  extended(): Observable<EducationalProgramDate[]> {
    return this.http.get<EducationalProgramDate[]>(this.url + "extended").pipe(
      tap((res) => {
        this.programdatesFiltered;
        console.log("Educational programs: ", this.programdatesFiltered);
      })
    );
  }
}
