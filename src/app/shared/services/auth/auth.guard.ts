import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authState.take(1).map(authState => !!authState).do(isLoggedIn => {
      // console.log('AuthGuard:' + isLoggedIn);
      if (!isLoggedIn) {
        this.router.navigate(['/login']).then();
      }
      /* Redirect, if user hasn´t verified his email
      if (!this.authService.authUser.emailVerified && this.authService.authUser.providerId === 'firebase') {
        console.log('not verified');
        // this.router.navigate(['/login'], { queryParams: { 'verify-email': true } }).then();
      }*/
    });
  }

}
