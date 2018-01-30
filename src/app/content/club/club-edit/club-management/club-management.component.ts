import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { Observable } from 'rxjs/Observable';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'club-management',
  templateUrl: './club-management.component.html',
  styleUrls: ['club-management.component.scss']
})
export class ClubManagementComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedClubManagementPosition: number;
  @Input() members: IMember[];

  @Output() add: EventEmitter<boolean> = new EventEmitter(false);
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  public categories$: Observable<ICategory[]>;
  public step = -1;

  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getCategoriesByCategoryType('club.position.types');
  }

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

}
