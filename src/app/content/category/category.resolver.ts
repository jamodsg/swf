import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ICategory } from '../../shared/interfaces/category.interface';
import { CategoryService } from '../../shared/services/category/category.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/first';
import 'rxjs/operator/map';
import 'rxjs/operator/take';

@Injectable()
export class CategoryResolver implements Resolve<ICategory> {

  constructor(private categoryService: CategoryService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategory> {
    return this.categoryService.getCategoryById(route.params['categoryId']).take(1).map((category: ICategory) => {
      if (route.params['categoryId'] === 'new') {
        return this.categoryService.setNewCategory();
      } else if (category && category.id) {
        return category;
      } else {
        this.router.navigate(['/categories']).then();
      }
    });
  }

}
