import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { Observable } from 'rxjs/Observable';
import { CategoryTypeService } from '../../../../shared/services/category-type/category-type.service';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { CategoryService } from '../../../../shared/services/category/category.service';

@Component({
  selector: 'team-positions',
  templateUrl: './team-positions.component.html'
})
export class TeamPositionsComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() members: IMember[];

  public categoryTypes$: Observable<ICategoryType[]>;

  @Output() addPosition: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() removePosition: EventEmitter<number> = new EventEmitter<number>(false);

  constructor(private categoryTypeService: CategoryTypeService) {
    this.categoryTypes$ = categoryTypeService.categoryTypes$.map((categoryTypes: ICategoryType[]) => {
        return categoryTypes.filter((categoryType: ICategoryType) => {
            return categoryType.link = 'team-position';
          }
        );
      }
    );
  }

  ngOnInit() {
  }

}
