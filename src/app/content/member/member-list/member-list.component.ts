import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'member-list',
  templateUrl: './member-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberListComponent implements OnInit {

  @Input() members: IMember[];

  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);

  public form: FormGroup;
  public itemsPerPageOptions = [5, 10, 25, 50, 100];

  constructor(private fb: FormBuilder, private memberService: MemberService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      searchFor: '',
      limit: 100
    });
  }

  removeMember(member: IMember) {
    this.memberService.removeMember(member).then(
      () => this.form.controls['searchFor'].reset()
    );
  }

}
