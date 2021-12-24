import { Injectable, EventEmitter } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable, Subscription } from "rxjs";
import { TokenResponse, Registration } from "./auth.model";
import { JwtService } from "../../jwt/jwt.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  invokeLogoutFunction = new EventEmitter();
  subsVar: Subscription;

  // URL
  public urlRegister: string = environment.baseUrl + "auth/registration/";
  public urlPasswordChange: string =
    environment.baseUrl + "auth/password/change/";
  public urlPasswordReset: string =
    environment.baseUrl + "auth/password/reset/";
  public urlPasswordResetConfirm: string =
    environment.baseUrl + "auth/password/reset/confirm/";
  public urlTokenObtain: string = environment.baseUrl + "auth/obtain/";
  public urlTokenRefresh: string = environment.baseUrl + "auth/refresh/";
  public urlTokenVerify: string = environment.baseUrl + "auth/verify/";

  // Data
  public token: TokenResponse;
  public tokenRefresh: string;
  public tokenAccess: string;

  public email: string;
  public username: string;
  public userID: string;
  public userType: string;

  constructor(private jwtService: JwtService, private http: HttpClient) {}

  clickLogout() {
    this.invokeLogoutFunction.emit();
  }

  registerAccount(body: Form): Observable<any> {
    return this.http.post<any>(this.urlRegister, body).pipe(
      tap((res) => {
        console.log("Registration: ", res);
      })
    );
  }

  changePassword(body: Form): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.jwtService.getToken("accessToken"),
      }),
    };
    return this.http.post<any>(this.urlPasswordChange, body, httpOptions).pipe(
      tap((res) => {
        console.log("Change password: ", res);
      })
    );
  }

  resetPassword(body: Form): Observable<any> {
    return this.http.post<any>(this.urlPasswordReset, body).pipe(
      tap((res) => {
        console.log("Reset password: ", res);
      })
    );
  }

  resetPasswordConfirm(body: Form): Observable<any> {
    return this.http.post<any>(this.urlPasswordResetConfirm, body).pipe(
      tap((res) => {
        console.log("Reset password confirm: ", res);
      })
    );
  }

  obtainToken(body: Form): Observable<any> {
    let jwtHelper: JwtHelperService = new JwtHelperService();
    return this.http.post<any>(this.urlTokenObtain, body).pipe(
      tap((res) => {
        this.token = res;
        this.tokenRefresh = res.refresh;
        this.tokenAccess = res.access;

        let decodedToken = jwtHelper.decodeToken(this.tokenAccess);
        this.email = decodedToken.email;
        this.username = decodedToken.username;
        this.userID = decodedToken.user_id;
        this.userType = decodedToken.user_type;

        this.jwtService.saveToken("accessToken", this.tokenAccess);
        this.jwtService.saveToken("refreshToken", this.tokenRefresh);
      })
    );
  }

  refreshToken(body): Observable<any> {
    return this.http.post<any>(this.urlTokenRefresh, body).pipe(
      tap((res) => {
        console.log("Token refresh: ", res);
      })
    );
  }

  verifyToken(body): Observable<any> {
    return this.http.post<any>(this.urlTokenVerify, body).pipe(
      tap((res) => {
        console.log("Token verify: ", res);
      })
    );
  }

  decodedToken() {
    let accessToken = localStorage.getItem("accessToken");
    let jwtHelper: JwtHelperService = new JwtHelperService();
    let decodedToken = jwtHelper.decodeToken(accessToken);
    let user_obj = {
      user_id: decodedToken.user_id,
      username: decodedToken.username,
      full_name: decodedToken.full_name,
      email: decodedToken.email,
      user_type: decodedToken.user_type,
    };
    return user_obj;
  }

  isTokenExpired(token: string) {
    let jwtHelper: JwtHelperService = new JwtHelperService();
    let isTokenExpired = jwtHelper.isTokenExpired(token);
    return isTokenExpired;
  }
}
