import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('%cHTTP Request:', 'color: blue', req);

    return next.handle(req).pipe(
      tap({
        next: (event) => console.log('%cHTTP Response:', 'color: green', event),
        error: (err) => console.error('%cHTTP Error:', 'color: red', err)
      })
    );
  }
}
