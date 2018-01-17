import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/map';
import 'rxjs/operator/take';
import { IApplication } from '../../shared/interfaces/application.interface';
import { ApplicationService } from '../../shared/services/application/application.service';

@Injectable()
export class ApplicationResolver implements Resolve<IApplication> {

  constructor(private applicationService: ApplicationService/**/) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IApplication> {

    return this.applicationService.applications$.take(1).map((applications: IApplication[]) => {
      if (!applications || applications.length === 0) {
        return this.applicationService.setNewApplication();
      } else {
        console.log(applications);
      }
    });
  }
}
