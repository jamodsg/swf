import { Component, OnInit } from '@angular/core';
import { ClubManagementService } from '../../../../../../shared/services/club-management/club-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IClubManagement } from '../../../../../../shared/interfaces/club-management.interface';
import { ClubService } from '../../../../../../shared/services/club/club.service';

@Component({
  selector: 'club-management-form',
  templateUrl: './club-management-form.component.html'
})
export class ClubManagementFormComponent implements OnInit {

  public managementGroup: FormGroup;
  public clubManagement: IClubManagement;

  constructor(private clubManagementService: ClubManagementService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public clubService: ClubService) {
  }

  ngOnInit() {

    this.route.data.subscribe((data: { clubManagement: IClubManagement }) =>
      this.clubManagement = data.clubManagement
    );

    this.managementGroup = this.fb.group({
      title: [this.clubManagement.title, [Validators.required, Validators.minLength(8)]],
      description: [this.clubManagement.description, [Validators.required, Validators.minLength(20)]],
      assignedClub: [this.clubManagement.assignedClub]
    });

    /*
    this.managementGroup.valueChanges.subscribe((changes: any) => {
      this.clubManagement = {
        id: this.clubManagement.id,
        title: changes.title,
        description: changes.description,
        assignedClub: changes.assignedClub
      };
    }); */
  }

  saveManagement() {
    let action;

    if (this.clubManagement.id) {
      action = this.clubManagementService.updateClubManagement(this.clubManagement.id,
        this.managementGroup.getRawValue());
    } else {
      action = this.clubManagementService.createClubManagement(this.managementGroup.getRawValue());
    }

    action.then(
      () => {
        this.managementGroup.reset();
        this.redirectToList();
      },
      (error: any) => console.log(error)
    );
  }

  cancel() {
    this.managementGroup.reset();
    this.redirectToList();
  }

  redirectToList() {
    this.router.navigate(['/clubs/positions']).then();
  }
}
