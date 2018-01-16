import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/map';
import 'rxjs/operator/take';
import { ISponsor } from '../../shared/interfaces/sponsor.interface';
import { SponsorService } from '../../shared/services/sponsor/sponsor.service';

@Injectable()
export class SponsorResolver implements Resolve<ISponsor> {

  constructor(private sponsorService: SponsorService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISponsor> {
    if (!route.params['sponsorId']) {
      return this.sponsorService.setNewSponsor();
    }

    return this.sponsorService.getSponsorById(route.params['sponsorId']).take(1).map((sponsor: ISponsor) => {
      if (sponsor && sponsor.id) {
        return sponsor;
      } else {
        this.router.navigate(['/sponsors']).then();
      }
    });
  }


}
