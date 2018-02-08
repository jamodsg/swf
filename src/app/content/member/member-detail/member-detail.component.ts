import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  public member: IMember;

  constructor(public route: ActivatedRoute,
    private memberService: MemberService,
    private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { member: IMember }) => this.member = data.member);
  }

  removeMember(member: IMember) {
    this.memberService.removeMember(member).then(
      () => this.router.navigate(['/members']).then(),
      (error: any) => console.log(error)
    );
  }
}
