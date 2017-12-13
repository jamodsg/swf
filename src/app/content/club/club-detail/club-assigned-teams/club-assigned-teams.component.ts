import { Component, Input } from '@angular/core';
import { IClub } from '../../../../../../shared/interfaces/club.interface';
import { ISeason } from '../../../../../../shared/interfaces/season.interface';
import { ITeam } from '../../../../../../shared/interfaces/team.interface';

@Component({
  selector: 'club-assigned-teams',
  templateUrl: 'club-assigned-teams.component.html'
})

export class ClubAssignedTeamsComponent {

  @Input() club: IClub;
  @Input() seasons: ISeason[];
  @Input() teams: ITeam[];

  constructor() {

  }

}
