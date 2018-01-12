import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISponsor } from '../../../shared/interfaces/sponsor.interface';
import { SponsorService } from '../../../shared/services/sponsor/sponsor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Observable } from 'rxjs/Observable';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { IUploaderConfig } from '../../../shared/interfaces/media/uploader-config.interface';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'sponsor-edit',
  templateUrl: './sponsor-edit.component.html'
})
export class SponsorEditComponent implements OnInit {

  public sponsor: ISponsor;
  public form: FormGroup;
  public categories$: Observable<ICategory[]>;

  @ViewChild('description') description: QuillEditorComponent;

  public isSubmitting: boolean = false;
  public titleMaxLength: number = 50;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    multiple: false,
    removeAfterUpload: true,
    showQueue: false
  };

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private sponsorService: SponsorService,
              public categoryService: CategoryService) {
    this.categories$ = categoryService.getCategoriesByCategoryType('sponsor');
  }

  ngOnInit() {
    this.route.data.subscribe((data: { sponsor: ISponsor }) => this.sponsor = data.sponsor);

    this.form = this.fb.group({
      title: [this.sponsor.title, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      externalLink: this.sponsor.externalLink,
      description: this.sponsor.description,
      assignedCategories: [this.sponsor.assignedCategories, [Validators.required]],
      startDate: this.sponsor.startDate,
      endDate: this.sponsor.endDate,
      internalInfo: this.sponsor.internalInfo,
      imageUrl: this.sponsor.imageUrl
    });

    /*
    this.form.valueChanges.subscribe((changes: ISponsor) => {
      this.sponsor.title = changes.title;
      this.sponsor.description = changes.description;
      this.sponsor.externalLink = changes.externalLink;
      this.sponsor.internalInfo = changes.internalInfo;
      this.sponsor.startDate = changes.startDate;
      this.sponsor.endDate = changes.endDate;
      this.sponsor.assignedCategories = changes.assignedCategories;
      this.sponsor.imageUrl = this.mediaItem ? this.mediaItem.url : '';
    }); */
  }

  saveSponsor() {
    let action;
    this.isSubmitting = true;
    if (this.sponsor.id) {
      action = this.sponsorService.updateSponsor(this.sponsor.id, this.form.getRawValue());
    } else {
      action = this.sponsorService.createSponsor(this.form.getRawValue());
    }
    action.then(() => {

      /* if (this.mediaItem) {
        this.mediaItem.assignedItem = sponsorId;
        return this.mediaItemService.updateMediaItem(this.mediaItem.id, this.mediaItem);
      } */

      this.form.reset();
      this.isSubmitting = false;
      this.redirectToList();
    });
  }

  cancel() {
    /* hochgeladenes Bild löschen, falls eins hochgeladen wurde
    if (this.mediaItem) {
      this.isCanceled = true;
      // delete the saved MediaItem before
      this.mediaItemService.removeMediaItem(this.mediaItem).then(
        () => {
          this.isCanceled = false;
          this.redirectToList();
        });
    } else {
      this.redirectToList();
    } */
  }

  setLogo(/* mediaResponse: IMediaResponse */) {
    /* // evtl. vorhandenes, altes Bild löschen
    if (this.sponsor.imageUrl) {
      this.sponsorService.removeSponsor(this.sponsor, false).then();
    }

    this.mediaItem = mediaResponse.mediaItem;
    if (!this.sponsor.id) {
      this.updateMediaItemAfterSave = true;
    }
    this.sponsor.assignedMediaItem = mediaResponse.mediaItem.id;
    this.sponsor.imageUrl = mediaResponse.mediaItem.url; */
  }

  redirectToList() {
    // this.router.navigate(['/sponsors']).then();
  }

}
