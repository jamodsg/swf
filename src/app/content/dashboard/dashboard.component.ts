import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../shared/services/member/member.service';
import { Observable } from 'rxjs/Observable';
import { IMember } from '../../shared/interfaces/member/member.interface';
import * as moment from 'moment';
import { IMatch } from '../../shared/interfaces/match.interface';
import { MatchService } from '../../shared/services/match/match.service';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { CategoryService } from '../../shared/services/category/category.service';
import { ICategory } from '../../shared/interfaces/category.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public angularVersion: string;
  public env: any;
  public mindForm: FormGroup;
  public members$: Observable<IMember[]>;
  public matches$: Observable<IMatch[]>;
  public categories$: Observable<ICategory[]>;

  public today = moment();
  public inTwoWeeks = moment().add(2, 'weeks');
  public inLastTwoWeeks = moment().subtract(2, 'weeks');
  public tomorrow = moment().add(1, 'days');
  public yesterday = moment().subtract(1, 'days');

  public config: PerfectScrollbarConfigInterface = {};

  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

  messages: Object[] = [/*{
    from: 'Ali Connors',
    message: 'I will be in your neighborhood',
    photo: 'assets/images/face3.jpg',
    subject: 'Brunch this weekend?',
  }, {
    from: 'Trevor Hansen',
    message: 'Wish I could but we have plans',
    photo: 'assets/images/face6.jpg',
    subject: 'Brunch this weekend?',
  }, {
    from: 'Sandra Adams',
    message: 'Do you have Paris recommendations instead?',
    photo: 'assets/images/face4.jpg',
    subject: 'Brunch this weekend?',
  }*/
  ];

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private memberService: MemberService,
              private matchService: MatchService) {
    this.angularVersion = VERSION.full;
    this.env = environment;
    this.categories$ = categoryService.categories$;
    this.members$ = memberService.members$;
    this.matches$ = matchService.matches$;
  }

  ngOnInit() {
    this.mindForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

}
