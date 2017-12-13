import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IClub } from '../../../../../shared/interfaces/club.interface';
import { IFilterOption } from '../../../../../shared/interfaces/pagination/filter-option.interface';
import { IPagination } from '../../../../../shared/interfaces/pagination/pagination.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'club-list',
  templateUrl: 'club-list.component.html'
})

export class ClubListComponent {

  @Input() clubs: IClub[];
  @Input() filter: string;

  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);

  // Pagination
  public p: any;
  public config: IPagination = {
    itemsPerPage: 10,
    currentPage: 1
  };

  public searchString: string = '';
  public currentFilterValue: string = '';
  public currentFilter: IFilterOption;
  public filterFields = ['title', 'address.street', 'address.zip', 'address.city', 'address.county'];

  constructor() {
  }

  // Table Sorting
  private ordering: string = '';
  public sortOrder: string = 'title';

  toggleOrdering(column) {
    this.ordering = this.ordering === '' ? '-' : '';
    this.sortOrder = this.ordering + column;
    return false;
  }

  public setItemsPerPage(value: number) {
    this.config.itemsPerPage = value;
  }

  // Filter
  public setFilter($event: IFilterOption) {
    this.currentFilter = $event;
    this.currentFilterValue = $event ? $event.value : '';
  }

  searchFor($event: string) {
    this.searchString = $event;
  }

  setPage(pageNumber: number) {
    this.config.currentPage = pageNumber;
  }

}
