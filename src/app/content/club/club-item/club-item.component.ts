import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: '[club-item]',
  templateUrl: 'club-item.component.html',
})

export class ClubItemComponent {
  /*
    @Input() club: IClub;
    @Input() teams: ITeam[];
    @Input() members: IMember[];

    filter: Observable<any>;

    constructor(public route: ActivatedRoute) {
    }
    */
}
