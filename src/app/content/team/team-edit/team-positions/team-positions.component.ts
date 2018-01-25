import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';

@Component({
  selector: 'team-positions',
  templateUrl: './team-positions.component.html'
})
export class TeamPositionsComponent implements OnChanges {

  @Input() form: FormGroup;
  @Input() members: IMember[];
  @Input() categories: ICategory[];
  @Input() categoryTypes: ICategoryType[];

  @Output() addPosition: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() removePosition: EventEmitter<number> = new EventEmitter<number>(false);

  public teamPositions: ICategory[];

  constructor() {
  }

  ngOnChanges() {
    if(this.categories && this.categoryTypes) {
      this.teamPositions = this.categories.filter((category: ICategory) => {
        return category.assignedCategoryType === this.categoryTypes.filter((categoryType: ICategoryType) => {
          return categoryType.link === 'team-position';
        })[0].id;
      });
    }
  }

}
