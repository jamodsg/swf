import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { MemberService } from '../../../shared/services/member/member.service';
import { MemberStateService } from '../../../shared/services/member/member-state.service';
import { IMemberState } from '../../../shared/interfaces/member/member-state.interface';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import * as moment from 'moment';
import 'moment/min/locales';

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
  public showCurrentBirthdaysOnly: boolean = false;

  constructor(private memberService: MemberService, private memberStateService: MemberStateService) {
    this.members$ = memberService.members$;
    this.memberStates = memberStateService.getMemberStates();
    this.ahStates = memberStateService.getAHStates();
  }

  ngOnInit() {
  }

  generateBirthdayList(members: any) {
    return members;
    /*.sort(this.sortByDaysToNextBirthday);/*
    .filter((member: IMember) => {
      if (!this.showCurrentBirthdaysOnly) {
        return member;
      }
      return moment(member.mainData.birthday).format('DD.MM') === currentDay;
    });*/
  }

  /*sortByDaysToNextBirthday(a: IMember, b: IMember) {

    const thisYear: any = moment().format('YYYY');
    const now: any = moment();

    if(!a.mainData.birthday || !b.mainData.birthday)
      return null;

    let birthdayMemberA: any = moment(a.mainData.birthday).set('year', thisYear);
    console.log(birthdayMemberA);

    let daysToNextBirthdayMemberA: number;
    let daysToNextBirthdayMemberB: number;

    if (now.unix() <= birthdayMemberA.unix()) {
      daysToNextBirthdayMemberA = birthdayMemberA.diff(now, 'days');
    } else {
      birthdayMemberA = moment(a.mainData.birthday).set('year', thisYear).add(1, 'years');
      daysToNextBirthdayMemberA = birthdayMemberA.diff(now, 'days');
    }

    let birthdayMemberB: any = moment(b.mainData.birthday).set('year', thisYear);
    if (now.unix() <= birthdayMemberB.unix()) {
      daysToNextBirthdayMemberB = birthdayMemberB.diff(now, 'days');
    } else {
      birthdayMemberB = moment(b.mainData.birthday).set('year', thisYear).add(1, 'years');
      daysToNextBirthdayMemberB = birthdayMemberB.diff(now, 'days');
    }

    if (daysToNextBirthdayMemberA < daysToNextBirthdayMemberB) {
      return -1;
    }
    if (daysToNextBirthdayMemberA > daysToNextBirthdayMemberB) {
      return 1;
    }
    return 0;
  } */

}
