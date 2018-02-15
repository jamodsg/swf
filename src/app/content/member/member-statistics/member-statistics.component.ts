import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { MemberService } from '../../../shared/services/member/member.service';

@Component({
  selector: 'member-statistics',
  templateUrl: './member-statistics.component.html',
  styleUrls: ['./member-statistics.component.scss']
})
export class MemberStatisticsComponent implements OnInit {

  public members$: Observable<IMember[]>;

  constructor(private memberService: MemberService) {
    this.members$ = memberService.members$;
  }

  ngOnInit() {
  }

}
