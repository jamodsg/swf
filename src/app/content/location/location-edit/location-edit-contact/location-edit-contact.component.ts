import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ILocation } from '../../../../shared/interfaces/location.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { MemberService } from '../../../../shared/services/member/member.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'location-edit-contact',
  templateUrl: './location-edit-contact.component.html'
})
export class LocationEditContactComponent {

  @Input() form: FormGroup;
  @Output() addLocationContact: EventEmitter<boolean> = new EventEmitter(false);

  @Input() location: ILocation;
  public members$: Observable<IMember[]>;

  showForm: boolean = false;
  showList: number = 0;

  constructor(public memberService: MemberService) {
    this.members$ = memberService.members$;
  }

  toggleForm() {
    this.showList = 0;
    this.showForm = !this.showForm;
    /* if (this.showForm) {
      this.addAssignedContact.emit(true);
    } */
  }

  toggleList(i: number) {
    this.showList = i;
  }

  /*
  saveContact() {
    if (!this.location.assignedContacts) {
      this.location.assignedContacts = [];
    }
    this.location.assignedContacts.push(this.locationContact);
    this.locationService.updateLocation(this.location.id, this.location).then(
      () => {
        this.toggleForm();
      }
    );
  } */

}
