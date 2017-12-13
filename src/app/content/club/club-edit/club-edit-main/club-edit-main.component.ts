import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationService } from '../../../../../../shared/services/location/location.service';
import { IClub } from '../../../../../../shared/interfaces/club.interface';
import { UserService } from '../../../../../../shared/services/user/user.service';
import { FormGroup } from '@angular/forms';
import { FileUploaderOptions } from '../../../../../../shared/interfaces/file/file-uploader-options.interface';
import { FileItem } from '../../../../../../shared/interfaces/file/file-item.interface';
import { ClubService } from '../../../../../../shared/services/club/club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'club-edit-main',
  templateUrl: 'club-edit-main.component.html'
})
export class ClubEditMainComponent {

  @Input() club: IClub;
  @Input() form: FormGroup;
  @Output() removeClub: EventEmitter<any> = new EventEmitter(false);

  public uploaderOptions: FileUploaderOptions = {
    uploadFolder: 'club',
    autoUpload: true,
    multipleUpload: false,
    showQueue: false,
    showDropZone: false,
    allowedFileType: ['image']
  };

  public config = {
    // uiColor: '#99000'
  };

  constructor(public locationService: LocationService,
    private router: Router,
    private clubService: ClubService,
    public userService: UserService) {
  }

  uploadCompleted(fileItem: FileItem) {
    this.club.management.photoUrl = fileItem.url;
    this.clubService.updateClub(this.club.id, this.club).then();
  }

  removeClubTimeLineEvent($event) {
    // ToDo: Löschen des Elements aus der Liste
    if (this.club.assignedClubEvents.indexOf($event) > -1) {
      this.club.assignedClubEvents.splice(this.club.assignedClubEvents.indexOf($event), 1);
      // this.updateClub.emit(this.club);
    }
  }

  removeManagementTimeLineEvent($event) {
    // ToDo
  }

  removeManagementPosition($event) {
    // ToDo
  }

  cancel() {
    this.router.navigate(['/clubs/list']).then();
  }

}
