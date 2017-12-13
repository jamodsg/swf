import { Injectable } from '@angular/core';
import { IMemberState } from '../../interfaces/member/member-state.interface';

@Injectable()
export class MemberStateService {

  private memberStates: IMemberState[] = [
    {
      title: 'Kein Mitglied',
      value: 0
    },
    {
      title: 'Mitglied',
      value: 1
    },
    {
      title: 'Ehrenmitglied',
      value: 2
    },
    {
      title: 'Mitglied Kind',
      value: 3
    },
    {
      title: 'Mitglied Jugend',
      value: 4
    },
    {
      title: 'Mitglied Familie',
      value: 5
    },
    {
      title: 'Mitglied Turnen',
      value: 6
    }
  ];

  private ahStates: IMemberState[] = [
    {
      title: 'Kein Mitglied',
      value: 0
    },
    {
      title: 'Mitglied',
      value: 1
    },
    {
      title: 'Ehrenmitglied',
      value: 2
    }
  ];

  constructor() {
  }

  getMemberStates() {
    return this.memberStates;
  }

  getAHStates() {
    return this.ahStates;
  }

}
