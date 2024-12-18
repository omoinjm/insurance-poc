import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationHelper } from '../helpers/authentication_helper';

//Extend from the HttpInterceptor and add the AuthToken and whatever else we need to the headers.
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let logged_in_user = AuthenticationHelper.get_user_detail();

    //Intercept and shove the Auth in with our user details from above.
    if (logged_in_user) {
      request = request.clone({
        setHeaders: {
          Authorization: `bearer ${logged_in_user.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
