import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ClubManagementService } from '../../../../../shared/services/club-management/club-management.service';
import 'rxjs/operator/map';
import 'rxjs/operator/take';
import { IClubManagement } from '../../../../../shared/interfaces/club-management.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClubManagementResolver implements Resolve<IClubManagement> {

  constructor(private clubManagementService: ClubManagementService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClubManagement> {

    return this.clubManagementService.getClubManagementById(route.params['managementId'])
      .take(1)
      .map((clubManagement: IClubManagement) => {
        if (route.params['managementId'] === 'new') {
          return this.clubManagementService.setNewClubManagement();
        } else if (clubManagement && clubManagement.id) {
          return clubManagement;
        } else {
          this.router.navigate(['./']).then();
        }
      }
      );

  }

}
