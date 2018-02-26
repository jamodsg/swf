import { Component, OnInit, VERSION } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../shared/services/member/member.service';
import { Observable } from 'rxjs/Observable';
import { IMember } from '../../shared/interfaces/member/member.interface';
import * as moment from 'moment';

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

  public today = moment();
  public tomorrow = moment().add(1, 'days');
  public yesterday = moment().subtract(1, 'days');

  // newsfeed
  messages: Object[] = [{
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
  }
  ];

  constructor(private fb: FormBuilder, public memberService: MemberService) {
    this.angularVersion = VERSION.full;
    this.env = environment;
    this.members$ = memberService.members$;
  }

  ngOnInit() {
    this.mindForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

}
