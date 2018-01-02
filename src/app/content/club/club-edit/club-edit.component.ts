import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import Quill from 'quill';
import { Observable } from 'rxjs/Observable';

import { IClub } from '../../../shared/interfaces/club/club.interface';
import { ILocation } from '../../../shared/interfaces/location.interface';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { ITimeLineEvent } from '../../../shared/interfaces/time-line-event.interface';
import { ClubService } from '../../../shared/services/club/club.service';
import { LocationService } from '../../../shared/services/location/location.service';
import { MemberService } from '../../../shared/services/member/member.service';

const parchment = Quill.import('parchment');
const block = parchment.query('block');
block.tagName = 'DIV';
Quill.register(block, true);

@Component({
  selector: 'club-edit',
  templateUrl: 'club-edit.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClubEditComponent implements OnInit {

  public club: IClub;
  public form: FormGroup;
  public locations$: Observable<ILocation[]>;
  public members$: Observable<IMember[]>;
  public showForm: boolean;

  public titleMinLength: number = 4;
  public textMinLength: number = 5;

  @ViewChild('description') description: QuillEditorComponent;

  constructor(
    public clubService: ClubService,
    private locationService: LocationService,
    private memberService: MemberService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.locations$ = locationService.locations$;
    this.members$ = memberService.members$;
    this.showForm = false;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => this.club = data.club);

    this.form = this.fb.group({
      title: [this.club.title, [Validators.required, Validators.minLength(10)]],
      description: this.club.description,
      assignedLocation: this.club.assignedLocation,
      creation: this.initCreation(),
      management: this.initManagement(),
      history: this.club.history,
      info: this.initInfo(),
      fussballde: this.initFussballDe(),
      timeLine: this.initTimeLine('timeLine', this.club.timeLine)
    });
  }

  addTimeLineEvent(formControl: string, event: ITimeLineEvent): void {
    this.form.controls[formControl]['controls'].push(this.fb.group({
      title: [event ? event.title : '', [Validators.required, Validators.minLength(this.titleMinLength)]],
      subTitle: event ? event.subTitle : '',
      startDate: event ? event.startDate : '',
      endDate: event ? event.endDate : '',
      icon: event ? event.icon : '',
      assignedArticle: event ? event.assignedArticle : '',
      color: event ? event.color : '',
      text: [event ? event.text : '', [Validators.required, Validators.minLength(this.textMinLength)]]
    }));
    this.showForm = true;
  }

  saveTimeLineEvent(event: ITimeLineEvent) {
    console.log(this.form.getRawValue());
    this.showForm = false;
  }

  // remove last element of formControl
  cancelAddingEvent(event): void {
    const control = <FormArray>this.form.controls[event.formControl];
    control.removeAt(event.index);
    this.showForm = false;
  }

  initTimeLine(formControl: string, events: ITimeLineEvent[]): FormArray {
    const timeLine = [];
    if (!events || events.length === 0) {
      // timeLine.push(this.addTimeLineEvent(formControl, null));
    }
    /* for (let i = 0; i < events.length; i++) {
      timeLine.push(this.addTimeLineEvent(formControl, events[i]));
    } */
    return this.fb.array(timeLine);
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
      positions: this.club.management ? this.club.management.positions : [],
      photoUrl: this.club.management ? this.club.management.photoUrl : '',
      photoDescription: this.club.management ? this.club.management.photoDescription : ''
    });
  }

  saveClub(): void {
    let action;
    if (this.club.id) {
      action = this.clubService.updateClub(this.club.id, this.form.getRawValue());
    } else {
      action = this.clubService.createClub(this.club);
    }
    action.then(
      () => this.redirectToList(),
      (error: any) => console.log(error)
    );
  }

  /* logoUploadCompleted(fileItem: FileItem) {
    this.club.logoUrl = fileItem.url;
    // this.clubService.updateClub(this.club.id, this.club).then();
  } */

  cancel() {
    this.redirectToList();
  }

  redirectToList() {
    this.router.navigate(['/clubs']).then();
  }

  isUrl(url: string) {
    console.log(url);
    return true;
  }

}
