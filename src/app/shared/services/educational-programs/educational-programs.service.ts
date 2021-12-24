import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { EducationalProgram } from './educational-programs.model';

@Injectable({
  providedIn: 'root'
})
export class EducationalProgramsService {

  // URL
  public url: string = environment.baseUrl + 'v1/educational-programs/'

  // Data
  public program: EducationalProgram
  public programs: EducationalProgram[] = []
  public programsFiltered: EducationalProgram[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: Form): Observable<EducationalProgram> {
    return this.http.post<EducationalProgram>(this.url, body).pipe(
      tap((res) => {
        console.log('Educational program: ', res)
      })
    )
  }

  getAll(): Observable<EducationalProgram[]> {
    return this.http.get<EducationalProgram[]>(this.url).pipe(
      tap((res) => {
        this.programs = res
        console.log('Educational programs: ', this.programs)
      })
    )
  }

  getOne(id: String): Observable<EducationalProgram> {
    let urlID = this.url + id + '/'
    return this.http.get<EducationalProgram>(urlID).pipe(
      tap((res) => {
        this.program = res
        console.log('Educational program: ', this.program)
      })
    )
  }

  update(body: Form, id: string): Observable<EducationalProgram>  {
    let urlPatch = this.url + id + '/'
    return this.http.patch<EducationalProgram>(urlPatch, body).pipe(
      tap((res) => {
        this.program = res
        console.log('Educational program: ', this.program)
      })
    )
  }

  delete(id: string): Observable<EducationalProgram> {
    let urlDelete = this.url + id + '/'
    return this.http.delete<EducationalProgram>(urlDelete).pipe(
      tap((res) => {
        console.log('Educational prgoram: ', res)
      })
    )
  }

  filter(field: String): Observable<EducationalProgram[]> {
    let urlFilter = this.url + '?' + field
    return this.http.get<EducationalProgram[]>(urlFilter).pipe(
      tap((res) => {
        this.programsFiltered
        console.log('Educational programs', this.programsFiltered)
      })
    )
  }

}
