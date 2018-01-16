import { Component, OnInit } from '@angular/core';
import { ISponsor } from '../../../shared/interfaces/sponsor.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sponsor-detail',
  templateUrl: './sponsor-detail.component.html',
  styleUrls: ['./sponsor-detail.component.scss']
})
export class SponsorDetailComponent implements OnInit {

  public sponsor: ISponsor;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { sponsor: ISponsor }) => this.sponsor = data.sponsor);
  }

}
