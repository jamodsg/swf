import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { MemberService } from '../../shared/services/member/member.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/map';
import 'rxjs/operator/take';
import { IMember } from '../../shared/interfaces/member/member.interface';

@Injectable()
export class MemberResolver implements Resolve<IMember> {

  constructor(private memberService: MemberService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMember> {
    if (route.params['memberId'] === 'new') {
      return this.memberService.setNewMember();
    }
    return this.memberService.getMemberById(route.params['memberId']).take(1).map((member: IMember) => {
      if (member && member.id) {
        return member;
      } else {
        this.router.navigate(['/members']).then();
      }
    });
  }
}
