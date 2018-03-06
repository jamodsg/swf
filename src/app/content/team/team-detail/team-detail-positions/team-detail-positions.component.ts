import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';

@Component({
  selector: 'team-detail-positions',
  templateUrl: './team-detail-positions.component.html',
  styleUrls: ['./team-detail-positions.component.scss']
})
export class TeamDetailPositionsComponent implements OnInit {

  @Input() team: ITeam;
  @Input() members: IMember[];
  @Input() categories: ICategoryType[];

  private savedPositionType: string = '';

  constructor() { }

  ngOnInit() {
  }

  isSavedHeadline(type: string){
    if(type !== this.savedPositionType){
      this.savedPositionType = type;
      return false;
    }
    return true;
  }

}
