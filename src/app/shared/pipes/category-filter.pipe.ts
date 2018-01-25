import { Pipe, PipeTransform } from '@angular/core';
import { ISponsor } from '../interfaces/sponsor.interface';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(sponsors: ISponsor[], categoryIds: string[]): ISponsor[] {
    if (!sponsors) {
      return;
    }

    if (!categoryIds || categoryIds.length === 0) {
      return sponsors;
    }

    return sponsors.filter((sponsor: ISponsor) => {

      return sponsor.assignedCategories.some((v) => {
        return categoryIds.some((cat) => {
          return v === cat;
        });
      });
    });
  }

}
