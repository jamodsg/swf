import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { FileUploaderOptions } from 'ng2-file-upload';
import { ClubService } from '../../../shared/services/club/club.service';
import Quill from 'quill';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { LocationService } from '../../../shared/services/location/location.service';
import { Observable } from 'rxjs/Observable';
import { ILocation } from '../../../shared/interfaces/location.interface';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { MemberService } from '../../../shared/services/member/member.service';

const parchment = Quill.import('parchment');
const block = parchment.query('block');
block.tagName = 'DIV';
Quill.register(block, true);

@Component({
  selector: 'club-edit',
  templateUrl: 'club-edit.component.html'
})
export class ClubEditComponent implements OnInit {

  public club: IClub;
  public form: FormGroup;
  public locations$: Observable<ILocation[]>;
  public members$: Observable<IMember[]>;

  public showForm: boolean;

  @ViewChild('description') description: QuillEditorComponent;

  public uploaderOptions: FileUploaderOptions = {
    // uploadFolder: 'club',
    autoUpload: true,
    // multipleUpload: false,
    // showQueue: false,
    // showDropZone: false,
    allowedFileType: ['image']
  };

  constructor(public clubService: ClubService,
              private locationService: LocationService,
              private memberService: MemberService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.locations$ = locationService.locations$;
    this.members$ = memberService.members$;
    this.showForm = false;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => this.club = data.club);

    this.form = this.fb.group({
      title: [this.club.title, [Validators.required, Validators.minLength(5)]],
      description: this.club.description,
      assignedLocation: this.club.assignedLocation,
      creation: this.initCreation(),
      management: this.initManagement(),
      history: this.club.history,
      info: this.initInfo(),
      fussballde: this.initFussballDe(),
      timeLine: this.fb.array([this.initTimeLine()])
    });
  }

  initTimeLine() {
    return this.fb.group({
      title: '',
      subTitle: '',
      startDate: '',
      endDate: '',
      icon: '',
      assignedArticle: '',
      color: '',
      text: ''
    });
  }

  initInfo() {
    return this.fb.group({
      assignedContact: this.club.info && this.club.info.assignedContact ? this.club.info.assignedContact : '',
      founding: this.club.info && this.club.info.founding ? this.club.info.founding : '',
      clubColours: this.club.info && this.club.info.clubColours ? this.club.info.clubColours : '',
      website: this.club.info && this.club.info.website ? this.club.info.website : '',
    });
  }

  initCreation() {
    return this.fb.group({
      at: this.club.creation.at,
      from: this.club.creation.from
    });
  }

  initFussballDe() {
    return this.fb.group({
      clubId: this.club.fussballde.clubId,
      clubUrl: this.club.fussballde.clubUrl
    });
  }

  initManagement() {
    return this.fb.group({
      positions: this.club.management ? this.club.management.positions : [],
      photoUrl: this.club.management ? this.club.management.photoUrl : '',
      photoDescription: this.club.management ? this.club.management.photoDescription : ''
    });
  }

  saveClub() {
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
