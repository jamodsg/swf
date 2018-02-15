import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { MemberService } from '../../../shared/services/member/member.service';
import { MemberStateService } from '../../../shared/services/member/member-state.service';
import { IMemberState } from '../../../shared/interfaces/member/member-state.interface';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'member-statistics',
  templateUrl: './member-statistics.component.html',
  styleUrls: ['./member-statistics.component.scss']
})
export class MemberStatisticsComponent implements OnInit {

  public members$: Observable<IMember[]>;
  public memberStates: IMemberState[];
  public ahStates: IMemberState[];

  public config: PerfectScrollbarConfigInterface = {};

  constructor(private memberService: MemberService, private memberStateService: MemberStateService) {
    this.members$ = memberService.members$;
    this.memberStates = memberStateService.getMemberStates();
    this.ahStates = memberStateService.getAHStates();
  }

  ngOnInit() {
  }

  getBirthdayList(members: IMember[]){
    /* members.forEach((member, index) => {
      console.log(member);
      console.log((index));
    }); */
    return members;
  }

}
