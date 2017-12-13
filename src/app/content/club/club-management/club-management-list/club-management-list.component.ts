import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ClubManagementService } from '../../../../../../shared/services/club-management/club-management.service';
import { IClubManagement } from '../../../../../../shared/interfaces/club-management.interface';
import { ISubscription } from 'rxjs/Subscription';
import { IClub } from '../../../../../../shared/interfaces/club.interface';
import { ClubService } from '../../../../../../shared/services/club/club.service';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'club-management-list',
  templateUrl: './club-management-list.component.html'
})

export class ClubManagementListComponent implements OnInit, OnDestroy {

  @Input() clubs: IClub[];

  public positions: IClubManagement[];
  public formGroup: FormGroup;
  public filterByClubId: string = '';

  private clubSubscription: ISubscription;
  private managementSubscription: ISubscription;

  constructor(private clubService: ClubService,
    private fb: FormBuilder,
    private clubManagementService: ClubManagementService,
    public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.managementSubscription = this.clubManagementService.getClubManagements().subscribe(
      (clubManagementList: IClubManagement[]) => this.positions = clubManagementList
    );
    this.clubSubscription = this.clubService.getClubs().subscribe(
      (clubs: IClub[]) => this.clubs = clubs
    );

    this.formGroup = this.fb.group({
      assignedClub: ''
    });

    this.formGroup.get('assignedClub').valueChanges.subscribe((value: string) => {
      this.filterByClubId = value;
    });
  }

  ngOnDestroy() {
    this.managementSubscription.unsubscribe();
    this.clubSubscription.unsubscribe();
  }

  removeManagement(position: IClubManagement) {
    this.clubManagementService.removeClubManagement(position).then();
  }

}
