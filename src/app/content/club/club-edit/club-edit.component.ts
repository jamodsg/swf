import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../../../../../shared/services/club/club.service';
import { FileUploaderOptions } from '../../../../../shared/interfaces/file/file-uploader-options.interface';
import { FileItem } from '../../../../../shared/interfaces/file/file-item.interface';
import { IClub } from '../../../../../shared/interfaces/club.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
  templateUrl: 'club-edit.component.html'
})
export class ClubEditComponent implements OnInit {

  public club: IClub;
  public form: FormGroup;

  public uploaderOptions: FileUploaderOptions = {
    uploadFolder: 'club',
    autoUpload: true,
    multipleUpload: false,
    showQueue: false,
    showDropZone: false,
    allowedFileType: ['image']
  };

  constructor(public clubService: ClubService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => this.club = data.club);

    this.form = this.fb.group({
      title: [this.club.title, [Validators.required, Validators.minLength(5)]],
      description: this.club.description,
      assignedLocation: this.club.assignedLocation,
      isMainClub: this.club.isMainClub,
      management: this.initManagement(),
      history: this.club.history,
      info: this.initInfo(),
      fussballde: this.initFussballDe()
    });

    this.form.valueChanges.subscribe((changes: IClub) => {
      this.club.title = changes.title;
      this.club.assignedLocation = changes.assignedLocation;
      this.club.description = changes.description;
      this.club.management.photoDescription = changes.management.photoDescription;
      this.club.isMainClub = changes.isMainClub;
      this.club.history = changes.history;
      this.club.fussballde = {
        clubId: changes.fussballde.clubId,
        clubUrl: changes.fussballde.clubUrl
      };
      this.club.info = {
        contact: changes.info.contact,
        founding: changes.info.founding,
        clubColours: changes.info.clubColours,
        website: changes.info.website
      };
    });
  }

  initInfo() {
    return this.fb.group({
      contact: this.club.info.contact,
      founding: this.club.info.founding,
      clubColours: this.club.info.clubColours,
      website: this.club.info.website
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
      action = this.clubService.updateClub(this.club.id, this.club);
    } else {
      action = this.clubService.createClub(this.club);
    }
    action.then(
      () => this.router.navigate(['/clubs']),
      (error: any) => console.log(error)
    );
  }

  logoUploadCompleted(fileItem: FileItem) {
    this.club.logoUrl = fileItem.url;
    // this.clubService.updateClub(this.club.id, this.club).then();
  }

  removeClub(club: IClub) {
    console.log(club);
  }

}
