import { Pipe, PipeTransform } from '@angular/core';
import { IMember } from '../interfaces/member/member.interface';
import { Moment } from 'moment';
import { IMatch } from '../interfaces/match.interface';
import moment = require('moment');

@Pipe({
  name: 'matchNoResultFilter'
})
export class MatchNoResultFilterPipe implements PipeTransform {

  transform(matches: IMatch[]): IMatch[] {

    if (!matches) {
      return;
    }

    return matches.filter((match: IMatch) => {
      console.log(match.result);
    });
  }

}
