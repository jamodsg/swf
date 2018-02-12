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

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private sponsorService: SponsorService,
    public categoryService: CategoryService) {
    this.categories$ = categoryService.getCategoriesByCategoryType('sponsor.types');
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
      this.form.reset();
      this.isSubmitting = false;
      this.redirectToList();
    });
  }

  cancel() {
    this.redirectToList();
  }

  redirectToList() {
    this.router.navigate(['/sponsors']).then();
  }

  removeSponsor(){
    this.sponsorService.removeSponsor(this.sponsor).then(
      () => this.redirectToList()
    );
  }

}
