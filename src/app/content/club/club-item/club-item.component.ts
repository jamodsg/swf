import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IClub } from '../../../../../shared/interfaces/club.interface';
import { ITeam } from '../../../../../shared/interfaces/team.interface';
import { IMember } from '../../../../../shared/interfaces/member.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: '[club-item]',
  templateUrl: 'club-item.component.html',
})

export class ClubItemComponent {

  @Input() club: IClub;
  @Input() teams: ITeam[];
  @Input() members: IMember[];

  filter: Observable<any>;

  constructor(public route: ActivatedRoute) {
  }

}
