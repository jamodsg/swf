import { Component, HostListener, OnInit } from '@angular/core';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return true; // JSON.stringify(this.club).toLowerCase() === JSON.stringify(this.savedClub).toLowerCase();
  }

  public member: IMember;
  private savedMember: IMember;
  public form: FormGroup;

  constructor(public route: ActivatedRoute,
              public snackBar: MatSnackBar,
              private fb: FormBuilder,
              private memberService: MemberService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { member: IMember }) => {
      this.member = data.member;
      this.savedMember = Object.freeze(Object.assign({}, this.member));
    });

    this.form = this.fb.group({
      address: this.initAddress(),
      ahData: this.initAHData(),
      clubData: this.initClubData(),
      comment: this.member.comment,
      contact: this.initContact(),
      creation: this.initCreation(),
      dfbData: this.initDFBData(),
      mainData: this.initMainData()
    });

    this.form.valueChanges.debounceTime(1000).distinctUntilChanged().subscribe((changes: IClub) => {
      this.member = Object.assign({}, this.member, changes);
      if (!this.form.invalid) {
        this.saveMember();
      }
    });

    if (this.member.isImported) {
      this.form.get('address').disable();
      this.form.get('ahData').disable();
      this.form.get('clubData').disable();
      this.form.get('dfbData').disable();
      this.form.get('contact').disable();
      this.form.get('mainData').disable();
    }
  }

  initAddress(): FormGroup {
    return this.fb.group({
      city: this.member.address ? this.member.address.city : '',
      county: this.member.address ? this.member.address.county : '',
      houseNumber: this.member.address ? this.member.address.houseNumber : '',
      streetName: this.member.address ? this.member.address.streetName : '',
      zip: this.member.address ? this.member.address.zip : '',
    });
  }

  initAHData(): FormGroup {
    return this.fb.group({
      joined: this.member.ahData ? this.member.ahData.joined : '',
      left: this.member.ahData ? this.member.ahData.left : '',
      payment: this.member.ahData ? this.member.ahData.payment : '',
      status: this.member.ahData ? this.member.ahData.status : '',
    });
  }

  initClubData(): FormGroup {
    return this.fb.group({
      assignedClub: this.member.clubData ? this.member.clubData.assignedClub : '',
      joined: this.member.clubData ? this.member.clubData.joined : '',
      left: this.member.clubData ? this.member.clubData.left : '',
      payment: this.member.clubData ? this.member.clubData.payment : '',
      positionsInClub: this.member.contact ? this.member.clubData.positionsInClub : '',
      status: this.member.contact ? this.member.clubData.status : '',
    });
  }

  initContact(): FormGroup {
    return this.fb.group({
      email: this.member.contact ? this.member.contact.email : '',
      fax: this.member.contact ? this.member.contact.fax : '',
      phoneHome: this.member.contact ? this.member.contact.phoneHome : '',
      phoneMobile: this.member.contact ? this.member.contact.phoneMobile : '',
      phoneWork: this.member.contact ? this.member.contact.phoneWork : '',
    });
  }

  initCreation(): FormGroup {
    return this.fb.group({
      at: this.member.creation.at,
      from: this.member.creation.from
    });
  }

  initDFBData(): FormGroup {
    return this.fb.group({
      ageGroup: this.member.dfbData ? this.member.dfbData.ageGroup : '',
      allowedToPlay: this.member.dfbData ? this.member.dfbData.allowedToPlay : '',
      eligibleForFriendlyMatches: this.member.dfbData ? this.member.dfbData.eligibleForFriendlyMatches : '',
      eligibleForOfficialMatches: this.member.dfbData ? this.member.dfbData.eligibleForOfficialMatches : '',
      passNumber: this.member.dfbData ? this.member.dfbData.passNumber : '',
      passPrint: this.member.dfbData ? this.member.dfbData.passPrint : '',
      playerStatus: this.member.dfbData ? this.member.dfbData.playerStatus : '',
      signOut: this.member.dfbData ? this.member.dfbData.signOut : '',
      guestPlayer: this.initGuestPlayer()
    });
  }

  initGuestPlayer(): FormGroup {
    return this.fb.group({
      guestRight: this.member.dfbData && this.member.dfbData.guestPlayer ? this.member.dfbData.guestPlayer.guestRight : '',
      season: this.member.dfbData && this.member.dfbData.guestPlayer ? this.member.dfbData.guestPlayer.season : '',
      type: this.member.dfbData && this.member.dfbData.guestPlayer ? this.member.dfbData.guestPlayer.type : ''
    });
  }

  initMainData(): FormGroup {
    return this.fb.group({
      birthday: this.member.mainData.birthday,
      firstName: this.member.mainData.firstName,
      gender: this.member.mainData.gender,
      lastName: this.member.mainData.lastName,
      title: this.member.mainData.title
    });
  }

  saveMember(redirect: boolean = false): void {
    let action;

    if (this.member.id) {
      action = this.memberService.updateMember(this.member.id, this.form.getRawValue());
    } else {
      action = this.memberService.createMember(this.member);
    }
    action.then(
      () => {
        if (redirect) {
          this.redirectToList();
        }
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'success',
            message: 'general.applications.updateMessage'
          },
          duration: 2500,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      },
      (error: any) => console.log(error)
    );
  }

  cancel() {
    this.redirectToList();
  }

  redirectToList() {
    this.router.navigate(['/members']).then();
  }
}
