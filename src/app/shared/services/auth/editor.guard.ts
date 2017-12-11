import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';
import { IUser } from '../../interfaces/user.interface';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authState.pipe(
      take(1),
      map((user: IUser) => user && user.assignedRoles.admin ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          console.error('Access denied - Admins only');
        }
      })
    );
  }

}
