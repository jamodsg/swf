import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ISubscription } from 'rxjs/Subscription';

import { IClub } from '../../../../../../shared/interfaces/club.interface';
import { ILocation } from '../../../../../../shared/interfaces/location.interface';
import { LocationService } from '../../../../../../shared/services/location/location.service';
import { MemberService } from '../../../../../../shared/services/member/member.service';
import { SeasonService } from '../../../../../../shared/services/season/season.service';
import { TeamService } from '../../../../../../shared/services/team/team.service';
import { UserService } from '../../../../../../shared/services/user/user.service';

@Component({
  selector: 'club-detail-main',
  templateUrl: './club-detail-main.component.html'
})
export class ClubDetailMainComponent implements OnInit, OnDestroy {

  @Input() club: IClub;

  public locations: ILocation[];

  private locationSubscription: ISubscription;

  constructor(public seasonService: SeasonService,
    public locationService: LocationService,
    public sanitizer: DomSanitizer,
    public teamService: TeamService,
    public userService: UserService,
    public memberService: MemberService) {
  }

  ngOnInit() {
    this.locationSubscription = this.locationService.locations$.subscribe(
      (locations: ILocation[]) => this.locations = locations
    );
  }

  ngOnDestroy() {
    this.locationSubscription.unsubscribe();
  }

}
