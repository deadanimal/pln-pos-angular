import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { EducationalProgramImage } from "./educational-program-images.model";

@Injectable({
  providedIn: "root",
})
export class EducationalProgramImagesService {
  // URL
  public url: string = environment.baseUrl + "v1/educational-program-images/";

  // Data
  public programimage: EducationalProgramImage;
  public programimages: EducationalProgramImage[] = [];
  public programimagesFiltered: EducationalProgramImage[] = [];

  constructor(private http: HttpClient) {}

  create(body): Observable<EducationalProgramImage> {
    return this.http.post<EducationalProgramImage>(this.url, body).pipe(
      tap((res) => {
        console.log("Educational program image: ", res);
      })
    );
  }

  getAll(): Observable<EducationalProgramImage[]> {
    return this.http.get<EducationalProgramImage[]>(this.url).pipe(
      tap((res) => {
        this.programimages = res;
        console.log("Educational program images: ", this.programimages);
      })
    );
  }

  getOne(id: String): Observable<EducationalProgramImage> {
    let urlID = this.url + id + "/";
    return this.http.get<EducationalProgramImage>(urlID).pipe(
      tap((res) => {
        this.programimage = res;
        console.log("Educational program image: ", this.programimage);
      })
    );
  }

  update(body: Form, id: string): Observable<EducationalProgramImage> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<EducationalProgramImage>(urlPatch, body).pipe(
      tap((res) => {
        this.programimage = res;
        console.log("Educational program images: ", this.programimage);
      })
    );
  }

  delete(id: string): Observable<EducationalProgramImage> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<EducationalProgramImage>(urlDelete).pipe(
      tap((res) => {
        console.log("Educational prgoram: ", res);
      })
    );
  }

  filter(field: String): Observable<EducationalProgramImage[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<EducationalProgramImage[]>(urlFilter).pipe(
      tap((res) => {
        this.programimagesFiltered;
        console.log("Educational programs", this.programimagesFiltered);
      })
    );
  }
}

