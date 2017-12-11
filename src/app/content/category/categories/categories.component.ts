import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html'
})

export class CategoriesComponent {

  // articles$: Observable<IArticle[]>;
  categories$: Observable<ICategory[]>;
  categoryTypes$: Observable<ICategoryType[]>;
  // locations$: Observable<ILocation[]>;
  // teams$: Observable<ITeam[]>; */

  constructor(// private articleService: ArticleService,
              private categoryService: CategoryService,
              private categoryTypeService: CategoryTypeService,
              /* private locationService: LocationService,
              private sponsorService: SponsorService,
              private teamService: TeamService */) {
    // this.articles$ = articleService.articles$;
    this.categories$ = categoryService.categories$;
    this.categoryTypes$ = categoryTypeService.categoryTypes$;
    /* this.locations$ = locationService.locations$;
    this.teams$ = teamService.teams$; */
  }

  removeCategory($event) {
    this.categoryService.removeCategory($event).then();
  }

  updateCategory($event) {
    this.categoryService.updateCategory($event.category.id, $event.category).then();
  }

}
