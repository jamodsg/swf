import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { TeamService } from '../../../shared/services/team/team.service';

@Component({
  selector: 'teams',
  templateUrl: './teams.component.html'
})

export class TeamsComponent {

  teams$: Observable<ITeam[]>;

  constructor(private teamService: TeamService) {
    this.teams$ = teamService.teams$;
  }

  removeTeam($event) {
    this.teamService.removeTeam($event).then();
  }

  updateTeam($event) {
    this.teamService.updateTeam($event.team.id, $event.team).then();
  }

}
