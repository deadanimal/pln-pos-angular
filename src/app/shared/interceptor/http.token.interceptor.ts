import { Injectable, NgZone } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { JwtService } from "../jwt/jwt.service";
import { HandlerNotificationService } from "../handler-notification/handler-notification.service";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private handlerNotification: HandlerNotificationService,
    private jwtService: JwtService
  ) {}

  private handleError(error: HttpErrorResponse) {
    let data = {};
    data = {
      reason: error && error.error.reason ? error.error.reason : "",
      status: error.status,
    };
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        this.handlerNotification.openToastrConnection();
        // Handle offline error
      } else {
        this.handlerNotification.openToastrHttp(error.status, error.statusText);
        // Handle Http Error (error.status === 403, 404...)
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
    }
    console.error("It happens: ", error);
    // console.log('Error: ', error)
    return throwError(error);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      //"Content-Type": "application/json",
      Accept: "*/*",
    };

    const token = this.jwtService.getToken("accessToken");

    if (token) {
      headersConfig["Authorization"] = `Bearer ${token}`;
    }

    console.log("Intercepting...");

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("Event: ", event);
        }
        return event;
      }),
      catchError(this.handleError.bind(this))
    );
  }
}
