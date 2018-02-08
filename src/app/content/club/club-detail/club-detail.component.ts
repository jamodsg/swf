import { Component } from '@angular/core';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../../../shared/services/club/club.service';

@Component({
  selector: 'club-detail',
  templateUrl: 'club-detail.component.html'
})

export class ClubDetailComponent {

  public club: IClub;

  constructor(public route: ActivatedRoute,
    private clubService: ClubService,
    private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => this.club = data.club);
  }

  removeClub(club: IClub) {
    this.clubService.removeClub(club).then(
      () => this.router.navigate(['/clubs']).then(),
      (error: any) => console.log(error)
    );
  }

}
