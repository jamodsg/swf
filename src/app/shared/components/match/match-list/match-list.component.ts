import { Component, Input, OnInit } from '@angular/core';
import { IMatch } from '../../../interfaces/match.interface';
import { ICategory } from '../../../interfaces/category.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['match-list.component.scss']
})
export class MatchListComponent implements OnInit {

  @Input() matches: IMatch[];
  @Input() categories: ICategory[];
  @Input() showResultInputs: boolean = false;

  public form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      matches: this.initMatches()
    });
    // }
  }

  initMatches(): FormArray {
    const formArray = [];
    if (this.matches) {
      for (let i = 0; i < this.matches.length; i++) {
        formArray.push(this.fb.group({
          homeTeamGoals: this.matches[i].result.homeTeamGoals,
          guestTeamGoals: this.matches[i].result.guestTeamGoals,
          otherEvent: this.matches[i].result.otherEvent
        }));
      }
    }
    return this.fb.array(formArray);
  }

}
