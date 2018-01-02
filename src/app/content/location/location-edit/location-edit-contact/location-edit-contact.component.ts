import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILocation } from '../../../../shared/interfaces/location.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { ILocationContact } from '../../../../shared/interfaces/location-contact.interface';
import { MemberService } from '../../../../shared/services/member/member.service';
import { LocationService } from '../../../../shared/services/location/location.service';
import { IContact } from '../../../../shared/interfaces/contact.interface';

@Component({
  selector: 'location-edit-contact',
  templateUrl: './location-edit-contact.component.html'
})
export class LocationEditContactComponent implements OnInit {

  @Input() location: ILocation;
  @Input() members: IMember[];
  memberForm: FormGroup;
  contactForm: FormGroup;

  showForm: boolean = false;
  showList: number = 0;

  locationContact: ILocationContact;

  constructor(private fb: FormBuilder,
    public memberService: MemberService,
    public locationService: LocationService) {
  }

  ngOnInit() {
    this.memberForm = this.fb.group({
      assignedMember: ['', [Validators.required]],
      description: ''
    });
    this.memberForm.valueChanges.subscribe((changes: ILocationContact) => {
      this.locationContact = {
        isMember: true,
        assignedMember: changes.assignedMember,
        description: changes.description,
        locationId: this.location.id
      };
    });

    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      contact: this.initContactData(),
      description: '',
    });
    this.contactForm.valueChanges.subscribe((changes: ILocationContact) => {
      const contactData: IContact = {
        phoneMobile: changes.contact.phoneMobile,
        email: changes.contact.email
      };
      this.locationContact = {
        isMember: false,
        firstName: changes.firstName,
        lastName: changes.lastName,
        contact: contactData,
        description: changes.description,
        locationId: this.location.id
      };
    });
  }

  initContactData() {
    return this.fb.group({
      phoneHome: '',
      phoneMobile: '',
      phoneWork: '',
      email: '',
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.showList = 0;
    this.memberForm.reset();
    this.contactForm.reset();
  }

  toggleList(i: number) {
    this.showList = i;
  }

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
  }

}
