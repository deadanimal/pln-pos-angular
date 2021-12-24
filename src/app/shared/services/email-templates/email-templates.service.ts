import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { EmailTemplate } from "./email-templates.model";

@Injectable({
  providedIn: "root",
})
export class EmailTemplatesService {
  // URL
  public url: string = environment.baseUrl + "v1/email-templates/";

  // Data
  public emailtemplates: EmailTemplate[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<EmailTemplate> {
    return this.http.post<EmailTemplate>(this.url, body).pipe(
      tap((res) => {
        console.log("EmailTemplate: ", res);
      })
    );
  }

  get(): Observable<EmailTemplate[]> {
    return this.http.get<EmailTemplate[]>(this.url).pipe(
      tap((res) => {
        this.emailtemplates = res;
        console.log("EmailTemplates: ", res);
      })
    );
  }

  update(body, id: string): Observable<EmailTemplate> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<EmailTemplate>(urlPatch, body).pipe(
      tap((res) => {
        console.log("EmailTemplate: ", res);
      })
    );
  }

  delete(id: string): Observable<EmailTemplate> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<EmailTemplate>(urlDelete).pipe(
      tap((res) => {
        console.log("EmailTemplate: ", res);
      })
    );
  }

  filter(field: String): Observable<EmailTemplate[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<EmailTemplate[]>(urlFilter).pipe(
      tap((res) => {
        console.log("EmailTemplates: ", res);
      })
    );
  }

  extended(): Observable<EmailTemplate[]> {
    return this.http.get<EmailTemplate[]>(this.url + "extended").pipe(
      tap((res) => {
        this.emailtemplates = res;
        console.log("EmailTemplates: ", res);
      })
    );
  }

  sending_mail(body): Observable<any> {
    return this.http.post<any>(this.url + 'sending_email/', body).pipe(
      tap((res) => {
        console.log("EmailTemplate: ", res);
      })
    );
  }
}
