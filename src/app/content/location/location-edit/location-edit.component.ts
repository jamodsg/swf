import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../../shared/services/location/location.service';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { ILocation } from '../../../shared/interfaces/location.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../../shared/services/member/member.service';
import { Observable } from 'rxjs/Observable';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';
import { ILocationContact } from '../../../shared/interfaces/location-contact.interface';

@Component({
  selector: 'location-edit',
  templateUrl: 'location-edit.component.html'
})

export class LocationEditComponent implements OnInit {

  public location: ILocation;
  public form: FormGroup;
  public categories$: Observable<ICategory[]>;
  public categoryTypes$: Observable<ICategoryType[]>;

  constructor(private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public categoryService: CategoryService,
    public memberService: MemberService,
    public categoryTypeService: CategoryTypeService,
    public locationService: LocationService) {
    this.categories$ = categoryService.categories$;
    this.categoryTypes$ = categoryTypeService.categoryTypes$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { location: ILocation }) => {
      this.location = data.location;
      // this.uploaderOptions.uploadFolder = this.uploaderOptions.uploadFolder + '/' + this.location.id;
    });

    this.form = this.fb.group({
      title: [this.location.title, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: [this.location.assignedCategory, [Validators.required]],
      prices: this.location.prices,
      opening: this.location.opening,
      text: this.location.text,
      address: this.initAddress(),
      creation: this.initCreation(),
      assignedContacts: this.initAssignedContacts()
    });

    if (this.location.isImported) {
      this.form.get('title').disable();
      this.form.get('category').disable();
      this.form.get('address').disable();
      this.form.get('creation').disable();
    }
    console.log(this.form);
  }

  initAssignedContacts() {
    /* const locationContacts = [];
    if (this.location.assignedContacts) {
      for (let i = 0; i < this.location.assignedContacts.length; i++) {
        locationContacts.push(this.addLocationContact(this.location.assignedContacts[i]));
      }
    }*/
    return this.fb.array([]);
  }

  addLocationContact() {
    const contact: ILocationContact = {
      isMember: false,
      description: ''
    };
    const control = <FormArray>this.form.controls['assignedContacts'];
    control.push(this.initLocationContact(contact));
  }

  initLocationContact(contact: ILocationContact) {
    return this.fb.group({
      isMember: contact ? contact.isMember : '',
      description: contact ? contact.description : '',
      assignedMember: contact ? contact.assignedMember : '',
      firstName: contact ? contact.firstName : '',
      lastName: contact ? contact.lastName : '',
      contact: contact ? contact.contact : '',
      address: contact ? contact.address : '',
    });
  }

  removeAssignedContact(contact: ILocationContact) {
    console.log(contact);
  }

  initCreation(): FormGroup {
    return this.fb.group({
      at: this.location.creation.at,
      from: this.location.creation.from
    });
  }

  initAddress() {
    return this.fb.group({
      streetName: [this.location.address.streetName, [Validators.required, Validators.minLength(5)]],
      houseNumber: this.location.address.houseNumber === 0 ? '' : this.location.address.houseNumber,
      zip: [this.location.address.zip, [Validators.required]],
      city: [this.location.address.city, [Validators.required]],
      county: [this.location.address.county, [Validators.required]],
    });
  }

  saveLocation() {
    let action;
    if (this.location.id) {
      action = this.locationService.updateLocation(this.location.id, this.location);
    } else {
      action = this.locationService.createLocation(this.location);
    }
    action.then(() => this.navigateToList());
  }

  navigateToList() {
    this.router.navigate(['list']).then();
  }

  cancel() {
    this.navigateToList();
  }

}
