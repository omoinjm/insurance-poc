import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { AuthenticationHelper } from '../helpers/authentication_helper';

//The AuthGuard is used to determine if you have access to a page or a module, if you check the layout modules you will see where there is a "CanActivate" attribute.
@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return observableOf(AuthenticationHelper.is_logged_in());
  }
}
