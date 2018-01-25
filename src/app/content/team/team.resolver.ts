import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ITeam } from '../../shared/interfaces/team.interface';
import { TeamService } from '../../shared/services/team/team.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/first';
import 'rxjs/operator/map';
import 'rxjs/operator/take';

@Injectable()
export class TeamResolver implements Resolve<ITeam> {

  constructor(private teamService: TeamService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITeam> {
    return this.teamService.getTeamById(route.params['teamId']).take(1).map((team: ITeam) => {
      if (route.params['teamId'] === 'new') {
        return this.teamService.setNewTeam();
      } else if (team && team.id) {
        return team;
      } else {
        this.router.navigate(['/teams']).then();
      }
    });
  }

}
