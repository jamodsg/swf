import {
  Component,
  Input
} from '@angular/core';
import { IClub } from '../../../../../shared/interfaces/club.interface';

@Component({
  selector: 'main-club-info',
  templateUrl: './main-club-info.component.html'
})
export class MainClubInfoComponent {

  @Input() clubs: IClub[];

  constructor() {
  }

}
