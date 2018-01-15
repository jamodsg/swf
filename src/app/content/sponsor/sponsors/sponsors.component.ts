import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISponsor } from '../../../shared/interfaces/sponsor.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { SponsorService } from '../../../shared/services/sponsor/sponsor.service';
import { ICategory } from '../../../shared/interfaces/category.interface';

@Component({
  selector: 'sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['sponsors.component.scss']
})
export class SponsorsComponent {

  public sponsors$: Observable<ISponsor[]>;
  public categories$: Observable<ICategory[]>;

  constructor(public categoryService: CategoryService,
              public sponsorService: SponsorService) {
    this.categories$ = categoryService.getCategoriesByCategoryType('sponsor');
    this.sponsors$ = sponsorService.sponsors$;
  }

  removeSponsor(sponsor: ISponsor) {
    this.sponsorService.removeSponsor(sponsor).then();
  }

  /* updateSponsor(sponsor: ISponsor) {
    this.sponsorService.updateSponsor(sponsor.id, sponsor).then(
      () => console.log('ok'),
      (error: any) => console.log(error)
    );
  } */

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
