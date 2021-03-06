import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { ILocation } from '../../../shared/interfaces/location.interface';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { ITimeLineEvent } from '../../../shared/interfaces/time-line-event.interface';
import { ClubService } from '../../../shared/services/club/club.service';
import { LocationService } from '../../../shared/services/location/location.service';
import { MemberService } from '../../../shared/services/member/member.service';
import { IClubManagement } from '../../../shared/interfaces/club/club-management.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';
import { IClubHonorary } from '../../../shared/interfaces/club/club-honorary.interface';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'club-edit',
  templateUrl: 'club-edit.component.html'
})
export class ClubEditComponent implements OnInit {

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return true; // JSON.stringify(this.club).toLowerCase() === JSON.stringify(this.savedClub).toLowerCase();
  }

  public club: IClub;
  private savedClub: IClub;
  public form: FormGroup;
  public locations$: Observable<ILocation[]>;
  public members$: Observable<IMember[]>;
  public positions$: Observable<ICategory[]>;
  public showForm: boolean;

  public selectedClubTimeLineEvent: number = -1;
  public selectedClubManagementPosition: number = -1;
  public selectedHonorary: number = -1;

  constructor(public clubService: ClubService,
    private locationService: LocationService,
    private memberService: MemberService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private router: Router) {
    this.locations$ = locationService.locations$;
    this.members$ = memberService.members$;
    this.positions$ = categoryService.getCategoriesByCategoryType('club.position.types');
    this.showForm = false;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => {
      this.club = data.club;
      this.savedClub = Object.freeze(Object.assign({}, this.club));
    });

    this.form = this.fb.group({
      title: [this.club.title, [Validators.required, Validators.minLength(10)]],
      description: this.club.description,
      assignedLocation: this.club.assignedLocation,
      history: this.club.history,
      creation: this.initCreation(),
      info: this.initInfo(),
      management: this.initManagement(),
      fussballde: this.initFussballDe(),
      timeLine: this.initClubTimeLine(),
      honoraries: this.initHonoraries()
    });

    this.form.valueChanges.debounceTime(1000).distinctUntilChanged().subscribe((changes: IClub) => {
      this.club = Object.assign({}, this.club, changes);
      if (!this.form.invalid) {
        this.saveClub();
      }
    });
  }

  initInfo(): FormGroup {
    return this.fb.group({
      assignedContact: this.club.info && this.club.info.assignedContact ? this.club.info.assignedContact : '',
      founding: this.club.info && this.club.info.founding ? this.club.info.founding : '',
      clubColours: this.club.info && this.club.info.clubColours ? this.club.info.clubColours : '',
      website: this.club.info && this.club.info.website ? this.club.info.website : '',
    });
  }

  initCreation(): FormGroup {
    return this.fb.group({
      at: this.club.creation.at,
      from: this.club.creation.from
    });
  }

  initFussballDe(): FormGroup {
    return this.fb.group({
      clubId: this.club.fussballde.clubId,
      clubUrl: this.club.fussballde.clubUrl
    });
  }

  initManagement(): FormGroup {
    return this.fb.group({
      positions: this.initClubManagementPositions(),
      photoUrl: this.club.management ? this.club.management.photoUrl : '',
      photoDescription: this.club.management ? this.club.management.photoDescription : ''
    });
  }

  // honoraries
  initHonoraries(): FormArray {
    const formArray = [];
    if (this.club.honoraries) {
      for (let i = 0; i < this.club.honoraries.length; i++) {
        formArray.push(this.initHonorary(this.club.honoraries[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initHonorary(honorary: IClubHonorary): FormGroup {
    return this.fb.group({
      assignedMember: [honorary ? honorary.assignedMember : null, [Validators.required]],
      assignedArticle: [honorary ? honorary.assignedArticle : null, [Validators.required]],
      startDate: [honorary ? honorary.startDate : new Date(), [Validators.required]],
    });
  }

  addHonorary(): void {
    const control = <FormArray>this.form.controls['honoraries'];
    const honorary: IClubHonorary = {
      startDate: new Date()
    };
    const addCtrl = this.initHonorary(honorary);
    control.push(addCtrl);
    this.selectedHonorary = this.form.controls['honoraries']['controls'].length - 1;
  }

  editHonorary($event: number): void {
    this.selectedHonorary = $event;
  }

  saveHonorary($event: boolean): void {
    this.selectedHonorary = -1;
  }

  removeHonorary($event: number): void {
    const control = <FormArray>this.form.controls['honoraries'];
    control.removeAt($event);
    this.selectedHonorary = -1;
  }

  // TimeLine
  initClubTimeLine(): FormArray {
    const formArray = [];
    if (this.club.timeLine) {
      for (let i = 0; i < this.club.timeLine.length; i++) {
        formArray.push(this.initTimeLineEvent(this.club.timeLine[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initTimeLineEvent(event: ITimeLineEvent): FormGroup {
    return this.fb.group({
      title: [event ? event.title : '', [Validators.required, Validators.maxLength(100)]],
      subTitle: [event ? event.subTitle : ''],
      icon: [event ? event.icon : ''],
      color: [event ? event.color : ''],
      assignedMediaItem: [event ? event.assignedMediaItem : ''],
      assignedArticle: [event ? event.assignedArticle : ''],
      startDate: [event ? event.startDate : new Date()],
      endDate: [event ? event.endDate : new Date()]
    });
  }

  addTimeLineEvent(): void {
    const control = <FormArray>this.form.controls['timeLine'];
    const event: ITimeLineEvent = {
      title: '',
      startDate: ''
    };
    const addCtrl = this.initTimeLineEvent(event);
    control.push(addCtrl);
    this.selectedClubTimeLineEvent = this.form.controls['timeLine']['controls'].length - 1;
  }

  editTimeLineEvent($event: number): void {
    this.selectedClubTimeLineEvent = $event;
  }

  saveTimeLineEvent($event: boolean): void {
    this.selectedClubTimeLineEvent = -1;
  }

  removeTimeLineEvent($event: number): void {
    const control = <FormArray>this.form.controls['timeLine'];
    control.removeAt($event);
    this.selectedClubTimeLineEvent = -1;
  }

  // Club-Management
  initClubManagementPositions(): FormArray {
    const formArray = [];
    if (this.club.management.positions) {
      for (let i = 0; i < this.club.management.positions.length; i++) {
        formArray.push(this.initClubManagementPosition(this.club.management.positions[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initClubManagementPosition(position: IClubManagement): FormGroup {
    return this.fb.group({
      assignedMember: [position ? position.assignedMember : null, [Validators.required]],
      assignedPosition: [position ? position.assignedPosition : null, [Validators.required]],
      startDate: [position ? position.startDate : new Date(), [Validators.required]],
      endDate: [position ? position.endDate : '']
    });
  }

  addClubManagementPosition(): void {
    const control = <FormArray>this.form.controls['management']['controls']['positions'];
    const position: IClubManagement = {
      assignedMember: null,
      assignedPosition: null,
      startDate: new Date()
    };
    const addCtrl = this.initClubManagementPosition(position);
    control.push(addCtrl);
    this.selectedClubManagementPosition = this.form.controls['management']['controls']['positions']['controls'].length - 1;
  }

  /* editClubManagementPosition($event:any): void {
    console.log($event);
    const control = <FormArray>this.form.controls['management']['controls']['positions'];
    console.log(control.controls.indexOf($event));
    // this.selectedClubManagementPosition = $event;
    // this.selectedClubManagementPosition = $event;
  } */

  saveClubManagementPosition($event: boolean): void {
    this.selectedClubManagementPosition = -1;
  }

  removeClubManagementPosition($event: number): void {
    const control = <FormArray>this.form.controls['management']['controls']['positions'];
    control.removeAt($event);
    this.selectedClubManagementPosition = -1;
  }

  saveClub(redirect: boolean = false): void {
    let action;

    if (this.club.id) {
      action = this.clubService.updateClub(this.club.id, this.form.getRawValue());
    } else {
      action = this.clubService.createClub(this.club);
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
    this.router.navigate(['/clubs']).then();
  }

}
