import { Component, Input, OnInit } from '@angular/core';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { MemberStateService } from '../../../../shared/services/member/member-state.service';

@Component({
  selector: 'club-detail-statistics',
  templateUrl: './club-detail-statistics.component.html',
  styleUrls: ['./club-detail-statistics.component.scss']
})
export class ClubDetailStatisticsComponent implements OnInit {

  @Input() club: IClub;
  @Input() members: IMember[];

  constructor(public memberStateService: MemberStateService) { }

  ngOnInit() {
  }

}
