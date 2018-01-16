import { Component, Input, OnInit } from '@angular/core';
import { ISponsor } from '../../../../shared/interfaces/sponsor.interface';

@Component({
  selector: 'sponsor-item',
  templateUrl: './sponsor-item.component.html',
  styleUrls: ['./sponsor-item.component.scss']
})
export class SponsorItemComponent implements OnInit {

  @Input() sponsor: ISponsor;

  constructor() { }

  ngOnInit() {
  }

}
