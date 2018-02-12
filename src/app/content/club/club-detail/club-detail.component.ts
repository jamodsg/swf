import { Component } from '@angular/core';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../../../shared/services/club/club.service';
import { MemberService } from '../../../shared/services/member/member.service';
import { LocationService } from '../../../shared/services/location/location.service';
import { Observable } from 'rxjs/Observable';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { ILocation } from '../../../shared/interfaces/location.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { ArticleService } from '../../../shared/services/article/article.service';

@Component({
  selector: 'club-detail',
  templateUrl: 'club-detail.component.html'
})

export class ClubDetailComponent {

  public club: IClub;
  public members$: Observable<IMember[]>;
  public locations$: Observable<ILocation[]>;
  public positions$: Observable<ICategory[]>;
  public articles$: Observable<IArticle[]>;

  constructor(public route: ActivatedRoute,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private clubService: ClubService,
    private memberService: MemberService,
    private locationService: LocationService,
    private router: Router) {
    this.locations$ = locationService.locations$;
    this.members$ = memberService.members$;
    this.articles$ = articleService.articles$;
    this.positions$ = categoryService.getCategoriesByCategoryType('club.position.types');
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
