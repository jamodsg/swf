import { Component, Input, OnInit } from '@angular/core';
import { IClub } from '../../../../shared/interfaces/club/club.interface';

@Component({
  selector: 'club-detail-history',
  templateUrl: './club-detail-history.component.html',
  styleUrls: ['./club-detail-history.component.scss']
})
export class ClubDetailHistoryComponent implements OnInit {

  @Input() club: IClub;

  constructor() { }

  ngOnInit() {
  }

}
