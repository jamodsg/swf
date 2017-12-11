import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import Quill from 'quill';
import { UserService } from '../../../shared/services/user/user.service';
import { IUser } from '../../../shared/interfaces/user.interface';

const parchment = Quill.import('parchment');
const block = parchment.query('block');
block.tagName = 'DIV';
Quill.register(block, true);

@Component({
  selector: 'category-edit',
  templateUrl: 'category-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['category-edit.component.css']
})

export class CategoryEditComponent implements OnInit {

  public category: ICategory;
  public categoryTypes$: Observable<ICategoryType[]>;
  public users$: Observable<IUser[]>;
  public form: FormGroup;

  @ViewChild('description') description: QuillEditorComponent;

  public titleMaxLength: number = 30;

  constructor(private categoryService: CategoryService,
              private categoryTypeService: CategoryTypeService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { category: ICategory }) => this.category = data.category);

    this.categoryTypes$ = this.categoryTypeService.categoryTypes$;
    this.users$ = this.userService.users$;

    this.form = this.fb.group({
      title: [this.category.title, [Validators.required, Validators.minLength(5), Validators.maxLength(this.titleMaxLength)]],
      assignedCategoryType: [this.category.assignedCategoryType, [Validators.required]],
      description: this.category.description,
      creation: this.initCreation(),
      // assignedItems: ''
    });


    if (this.category.isImported) {
      this.form.get('title').disable();
      this.form.get('assignedCategoryType').disable();
      this.form.get('creation').disable();
    }
  }

  initCreation() {
    return this.fb.group({
      at: this.category.creation.at,
      from: this.category.creation.from
    });
  }

  saveCategory() {
    let action;
    // const assignedItems: any[] = this.form.get('assignedItems').value;
    // this.form.get('assignedItems').reset();

    if (this.category.id) {
      // ToDo: Unlink last items
      // ToDo: link items and category
      action = this.categoryService.updateCategory(this.category.id, this.form.getRawValue());
    } else {
      action = this.categoryService.createCategory(this.form.getRawValue());
    }
    action.then(() => this.redirectToList());
  }

  cancel() {
    this.redirectToList();
  }

  removeCategory(event: ICategory) {
    this.categoryService.removeCategory(event).then(() => this.redirectToList());
  }

  redirectToList() {
    this.router.navigate(['/categories']).then();
  }

}
