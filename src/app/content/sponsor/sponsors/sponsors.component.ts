import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISponsor } from '../../../shared/interfaces/sponsor.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { SponsorService } from '../../../shared/services/sponsor/sponsor.service';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';

@Component({
  selector: 'sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['sponsors.component.scss']
})
export class SponsorsComponent {

  public sponsors$: Observable<ISponsor[]>;
  public categories$: Observable<ICategory[]>;
  public categoryTypes$: Observable<ICategoryType[]>;

  constructor(public categoryService: CategoryService,
              public categoryTypeService: CategoryTypeService,
              public sponsorService: SponsorService) {

    /* this.categories$ = categoryService.categories$.map((categories: ICategory[]) => {
        return categories.filter((category: ICategory) => {
          return category;
        });
      }
    );
    this.categoryTypes$ = categoryTypeService.categoryTypes$.map((categoryTypes: ICategoryType[]) => {
      return categoryTypes.filter((categoryType: ICategoryType) => {
        return categoryType.link === 'sponsors';
      });
    });
    console.log(this.categoryTypes$); */
    this.sponsors$ = sponsorService.sponsors$;
  }

  removeSponsor(sponsor: ISponsor) {
    this.sponsorService.removeSponsor(sponsor).then(
      () => console.log('ok'),
      (error: any) => console.log(error)
    );
  }

  updateSponsor(sponsor: ISponsor) {
    this.sponsorService.updateSponsor(sponsor.id, sponsor).then(
      () => console.log('ok'),
      (error: any) => console.log(error)
    );
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

}
