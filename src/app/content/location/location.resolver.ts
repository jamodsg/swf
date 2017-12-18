import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { LocationService } from '../../shared/services/location/location.service';
import { ILocation } from '../../shared/interfaces/location.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/map';
import 'rxjs/operator/take';

@Injectable()
export class LocationResolver implements Resolve<ILocation> {

  constructor(private locationService: LocationService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILocation> {
    if (route.params['locationId'] === 'new') {
      return this.locationService.setNewLocation();
    }
    return this.locationService.getLocationById(route.params['locationId']).take(1).map((location: ILocation) => {
      if (location && location.id) {
        return location;
      } else {
        this.router.navigate(['/locations']).then();
      }
    });
  }
}
