import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import { IMatch } from '../interfaces/match.interface';
import * as moment from 'moment';

@Pipe({
  name: 'matchFilter'
})
export class MatchFilterPipe implements PipeTransform {

  transform(matches: IMatch[], searchField: string, searchOption: string, dateTime: Moment): IMatch[] {

    if (!matches || !searchField) {
      return matches;
    }

    return matches.filter((match: IMatch) => {
      if (searchOption === '>=') {
        return !dateTime ? match[searchField] >= moment().toISOString() : match[searchField] >= dateTime.toISOString();
      }
      if (searchOption === '<=') {
        return !dateTime ? match[searchField] <= moment().toISOString() : match[searchField] <= dateTime.toISOString();
      }
    });
  }

}
