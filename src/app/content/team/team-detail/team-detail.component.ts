import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../shared/services/category/category.service';
import { MemberService } from '../../../shared/services/member/member.service';
import { Observable } from 'rxjs/Observable';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { TeamService } from '../../../shared/services/team/team.service';
import { SeasonService } from '../../../shared/services/season/season.service';
import { ISeason } from '../../../shared/interfaces/season.interface';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { ClubService } from '../../../shared/services/club/club.service';

@Component({
  selector: 'team-detail',
  templateUrl: './team-detail.component.html'
})
export class TeamDetailComponent implements OnInit {

  public team: ITeam;
  public categories$: Observable<ICategory[]>;
  public members$: Observable<IMember[]>;
  public seasons$: Observable<ISeason[]>;
  public clubs$: Observable<IClub[]>;

  constructor(private route: ActivatedRoute,
              private seasonService: SeasonService,
              private clubService: ClubService,
              private teamService: TeamService,
              public categoryService: CategoryService,
              public memberService: MemberService,
              private router: Router) {
    this.clubs$ = clubService.clubs$;
    this.categories$ = categoryService.categories$;
    this.members$ = memberService.members$;
    this.seasons$ = seasonService.seasons$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { team: ITeam }) => this.team = data.team);
  }

  removeTeam(team: ITeam) {
    this.teamService.removeTeam(team).then(() => this.router.navigate(['/teams']).then());
  }

}
