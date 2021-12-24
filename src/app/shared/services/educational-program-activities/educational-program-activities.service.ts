import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { EducationalProgramActivity } from "./educational-program-activities.model";

@Injectable({
  providedIn: "root",
})
export class EducationalProgramActivitiesService {
  // URL
  public url: string = environment.baseUrl + "v1/educational-program-activities/";

  // Data
  public programactivity: EducationalProgramActivity;
  public programactivities: EducationalProgramActivity[] = [];
  public programactivitiesFiltered: EducationalProgramActivity[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<EducationalProgramActivity> {
    return this.http.post<EducationalProgramActivity>(this.url, body).pipe(
      tap((res) => {
        console.log("Educational program activity: ", res);
      })
    );
  }

  getAll(): Observable<EducationalProgramActivity[]> {
    return this.http.get<EducationalProgramActivity[]>(this.url).pipe(
      tap((res) => {
        this.programactivities = res;
        console.log("Educational program activities: ", this.programactivities);
      })
    );
  }

  getOne(id: String): Observable<EducationalProgramActivity> {
    let urlID = this.url + id + "/";
    return this.http.get<EducationalProgramActivity>(urlID).pipe(
      tap((res) => {
        this.programactivity = res;
        console.log("Educational program activity: ", this.programactivity);
      })
    );
  }

  update(body: Form, id: string): Observable<EducationalProgramActivity> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<EducationalProgramActivity>(urlPatch, body).pipe(
      tap((res) => {
        this.programactivity = res;
        console.log("Educational program activities: ", this.programactivity);
      })
    );
  }

  delete(id: string): Observable<EducationalProgramActivity> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<EducationalProgramActivity>(urlDelete).pipe(
      tap((res) => {
        console.log("Educational prgoram: ", res);
      })
    );
  }

  filter(field: String): Observable<EducationalProgramActivity[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<EducationalProgramActivity[]>(urlFilter).pipe(
      tap((res) => {
        this.programactivitiesFiltered;
        console.log("Educational programs", this.programactivitiesFiltered);
      })
    );
  }
}
