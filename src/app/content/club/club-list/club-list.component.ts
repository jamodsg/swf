import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IClub } from '../../../shared/interfaces/club/club.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'club-list',
  templateUrl: 'club-list.component.html'
})

export class ClubListComponent {

  @Input() clubs$: IClub[];

  @Output() remove: EventEmitter<IClub> = new EventEmitter(false);
  @Output() update: EventEmitter<IClub> = new EventEmitter(false);

  constructor() {
  }

}
