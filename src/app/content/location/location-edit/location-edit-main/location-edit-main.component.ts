import { Component, Input } from '@angular/core';
import { CategoryService } from '../../../../../../shared/services/category/category.service';
import { ICategory } from '../../../../../../shared/interfaces/category.interface';
import { FormGroup } from '@angular/forms';
import { ICategoryType } from '../../../../../../shared/interfaces/category-type.interface';

@Component({
  selector: 'location-edit-main',
  templateUrl: './location-edit-main.component.html'
})
export class LocationEditMainComponent {

  @Input() categories: ICategory[];
  @Input() categoryTypes: ICategoryType;
  @Input() form: FormGroup;

  constructor(public categoryService: CategoryService) {
  }

}
