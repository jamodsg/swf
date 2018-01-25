import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'team-list',
  templateUrl: 'team-list.component.html',
})

export class TeamListComponent {

  @Input() teams: ITeam[];

  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);

  public form: FormGroup;
  public itemsPerPageOptions = [5, 10, 25, 50, 100];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      searchFor: '',
      limit: 10
    });
  }

  removeTeam(team: ITeam) {
    this.remove.emit(team);
    this.form.controls['searchFor'].reset();
  }

}