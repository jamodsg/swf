import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { SeasonService } from '../../../../../shared/services/season/season.service';
import { TeamService } from '../../../../../shared/services/team/team.service';
import { MemberService } from '../../../../../shared/services/member/member.service';
import { IClub } from '../../../../../shared/interfaces/club.interface';
import { ClubService } from '../../../../../shared/services/club/club.service';

@Component({
  // selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
  templateUrl: 'club-detail.component.html'
})

export class ClubDetailComponent implements OnInit {

  public club: IClub;

  constructor(public route: ActivatedRoute,
    private clubService: ClubService,
    private router: Router,
    public memberService: MemberService,
    public seasonService: SeasonService,
    public teamService: TeamService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => this.club = data.club);
  }

  removeClub(club: IClub) {
    this.clubService.removeClub(club).then(
      () => this.router.navigate(['/clubs']).then(),
      (error: any) => console.log(error)
    );
  }

}
