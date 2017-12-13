import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ClubService } from '../../../../../../shared/services/club/club.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
  templateUrl: './club-managements.component.html'
})
export class ClubManagementsComponent implements OnInit {

  // private clubSubscription: ISubscription;
  // public clubs: IClub[] = [];
  // public formGroup: FormGroup;

  constructor(private clubService: ClubService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    /* this.clubSubscription = this.clubService.getClubs().subscribe((clubs: IClub[]) => this.clubs = clubs);

    this.formGroup = this.fb.group({
      assignedClub: ''
    }); */
  }

  /* ngOnDestroy() {
    this.clubSubscription.unsubscribe();
  }*/

}
