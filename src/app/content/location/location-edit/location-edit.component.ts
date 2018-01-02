import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../../shared/services/location/location.service';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { ILocation } from '../../../shared/interfaces/location.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../../shared/services/member/member.service';
import { UserService } from '../../../shared/services/user/user.service';

@Component({
  selector: 'location-edit',
  templateUrl: 'location-edit.component.html'
})

export class LocationEditComponent implements OnInit {

  public location: ILocation;
  public form: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public categoryService: CategoryService,
    public memberService: MemberService,
    public categoryTypeService: CategoryTypeService,
    public userService: UserService,
    public locationService: LocationService) {
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
      address: this.initAddress()
    });

    if (this.location.isImported) {
      this.form.get('title').disable();
      this.form.get('category').disable();
      this.form.get('address').disable();
    }
  }

  initAddress() {
    return this.fb.group({
      streetName: [this.location.address.streetName, [Validators.required, Validators.minLength(5)]],
      houseNumber: this.location.address.houseNumber,
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
