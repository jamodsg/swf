import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../../../../shared/services/location/location.service';
import { CategoryTypeService } from '../../../../../shared/services/category-type/category-type.service';
import { FileItem } from '../../../../../shared/interfaces/file/file-item.interface';
import { FileUploaderOptions } from '../../../../../shared/interfaces/file/file-uploader-options.interface';
import { ILocation } from '../../../../../shared/interfaces/location.interface';
import { CategoryService } from '../../../../../shared/services/category/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../../../../shared/services/member/member.service';
import { UserService } from '../../../../../shared/services/user/user.service';

@Component({
  selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
  templateUrl: 'location-edit.component.html'
})

export class LocationEditComponent implements OnInit {

  public location: ILocation;

  public objectType: string = 'location';
  public showUploader: boolean = false;
  public form: FormGroup;

  public uploaderOptions: FileUploaderOptions = {
    removeAfterUpload: true,
    uploadFolder: this.objectType,
    autoUpload: true,
    multipleUpload: false,
    showQueue: false,
    showDropZone: false,
    allowedFileType: ['image']
  };

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
      this.uploaderOptions.uploadFolder = this.uploaderOptions.uploadFolder + '/' + this.location.id;
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

  toggleUploader() {
    this.showUploader = !this.showUploader;
  }

  saveLocation() {
    let action;
    if (this.location.id) {
      action = this.locationService.updateLocation(this.location.id, this.location);
    } else {
      action = this.locationService.createLocation(this.location);
    }

    action.then(() =>
      this.router.navigate(['list']).then()
    );
  }

  cancel() {
    this.router.navigate(['list']).then();
  }

  uploadCompleted(fileItem: FileItem) {
    this.location.imageUrl = fileItem.url;
    this.locationService.updateLocation(this.location.id, this.location).then();
  }

}
