import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IProfile } from '../../../../shared/interfaces/member/profile.interface';
import { MemberService } from '../../../../shared/services/member/member.service';
import { Observable } from 'rxjs/Observable';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'member-edit-other-opinions',
  templateUrl: './member-edit-other-opinions.component.html',
  styleUrls: ['./member-edit-other-opinions.component.scss']
})
export class MemberEditOtherOpinionsComponent implements OnInit {

  @Input() form: FormGroup;

  @Output() add: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() delete: EventEmitter<IProfile> = new EventEmitter<IProfile>(false);

  public members$: Observable<IMember[]>;

  constructor(private memberService: MemberService) {
    this.members$ = memberService.members$;
  }

  ngOnInit() {
  }

}
