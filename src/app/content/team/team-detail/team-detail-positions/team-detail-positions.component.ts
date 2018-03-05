import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'team-detail-positions',
  templateUrl: './team-detail-positions.component.html',
  styleUrls: ['./team-detail-positions.component.scss']
})
export class TeamDetailPositionsComponent implements OnInit {

  @Input() team: ITeam;
  @Input() members: IMember[];

  constructor() { }

  ngOnInit() {
  }

}
