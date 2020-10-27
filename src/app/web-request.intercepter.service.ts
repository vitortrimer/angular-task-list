import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, Subject, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestIntercepter implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  refreshingAccessToken: boolean;

  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        
        if(error.status === 401) {
          return this.refreshAccessToken().pipe(
            switchMap(() => {
              request = this.addAuthHeader(request)
              return next.handle(request);
            }),
            catchError((err: any) => {
              this.authService.logout();
              return empty();
            })
          );
        }

        return throwError(error);
      })
    )
  }

  refreshAccessToken() {
    if(this.refreshingAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          observer.next();
          observer.complete();
        })
      })
    } else {
      this.refreshingAccessToken = true;
      return this.authService.getNewAccessToken().pipe(
        tap(() => {
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next();
        })
      )
    }
  }

  addAuthHeader(request: HttpRequest<any>) {
    const token = this.authService.getAccessToken()

    if(token) {
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }

    return request;
  }
}
