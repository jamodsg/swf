import { Pipe, PipeTransform } from '@angular/core';
import { ISponsor } from '../interfaces/sponsor.interface';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(items: any[], searchField: string, categoryIds: string[]): ISponsor[] {
    if (!items) {
      return;
    }

    if (!categoryIds || categoryIds.length === 0) {
      return items;
    }

    return items.filter((item: any) => {
      return categoryIds.some((cat) => {
        return item[searchField] === cat;
      });
    });
  }

}
