import { Component } from '@angular/core';
import { ClubService } from '../../../../../shared/services/club/club.service';

@Component({
  selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
  templateUrl: 'clubs.component.html'
})

export class ClubsComponent {

  constructor(public clubService: ClubService) {

  }

}
