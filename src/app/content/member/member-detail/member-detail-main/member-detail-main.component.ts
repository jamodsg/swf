import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'member-detail-main',
  templateUrl: './member-detail-main.component.html',
  styleUrls: ['./member-detail-main.component.scss']
})
export class MemberDetailMainComponent implements OnInit {

  @Input() member: IMember;

  constructor() { }

  ngOnInit() {
  }

  public getZodiac(birthday) {
    const dateOfBirth = new Date(birthday);
    const month = dateOfBirth.getMonth();
    const day = dateOfBirth.getDate();

    const zodiac = [
      'Capricorn',
      'Aquarius',
      'Pisces',
      'Aries',
      'Taurus',
      'Gemini',
      'Cancer',
      'Leo',
      'Virgo',
      'Libra',
      'Scorpio',
      'Sagittarius',
      'Capricorn'
    ];
    const lastDay = [19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
    return (day > lastDay[month]) ? zodiac[month * 1 + 1] : zodiac[month];
  }

  public calculateAge(birthday) {
    const dateOfBirth = new Date(birthday);
    const ageDifMs = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
