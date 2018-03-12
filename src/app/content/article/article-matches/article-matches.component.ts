import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { environment } from '../../../../environments/environment';
import { FormBuilder } from '@angular/forms';
import { MatchService } from '../../../shared/services/match/match.service';
import { MemberService } from '../../../shared/services/member/member.service';
import { CategoryService } from '../../../shared/services/category/category.service';
import { IMatch } from '../../../shared/interfaces/match.interface';
import { Observable } from 'rxjs/Observable';
import { ICategory } from '../../../shared/interfaces/category.interface';
import * as moment from 'moment';

@Component({
  selector: 'article-matches',
  templateUrl: './article-matches.component.html'
})
export class ArticleMatchesComponent implements OnInit {

  public config: PerfectScrollbarConfigInterface = {};
  public matches$: Observable<IMatch[]>;
  public categories$: Observable<ICategory[]>;

  public inTwoWeeks = moment().add(2, 'weeks');
  public inLastTwoWeeks = moment().subtract(2, 'weeks');

  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private memberService: MemberService,
    private matchService: MatchService) {
    this.categories$ = categoryService.categories$;
    this.matches$ = matchService.matches$;
  }

  ngOnInit() {
  }

}
