import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/first';
import 'rxjs/operator/map';
import 'rxjs/operator/take';
import { ClubService } from '../../../../shared/services/club/club.service';
import { IClub } from '../../../../shared/interfaces/club.interface';

@Injectable()
export class ClubResolver implements Resolve<IClub> {

  constructor(private clubService: ClubService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClub> {
    return this.clubService.getClubById(route.params['clubId']).take(1).map((club: IClub) => {
      if (route.params['clubId'] === 'new') {
        return this.clubService.setNewClub();
      } else if (club && club.id) {
        return club;
      } else {
        this.router.navigate(['/clubs']).then();
      }
    });
  }

}
