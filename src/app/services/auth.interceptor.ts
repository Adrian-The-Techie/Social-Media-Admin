import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //////modifying the authorisatins  . .set("Access-Control-Allow-Origin", "*")
    const changedReq = req.clone({
      headers: req.headers
        .set('Authorization', 'Bearer ' + localStorage.getItem('token')),
    });
    return next.handle(changedReq);
  }
}
