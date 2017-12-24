import { Component, Input, OnInit } from '@angular/core';
import { ILocation } from '../../../../shared/interfaces/location.interface';
import { Observable } from 'rxjs/Observable';
import { ICategory } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'location-detail-main',
  templateUrl: './location-detail-main.component.html'
})
export class LocationDetailMainComponent implements OnInit {

  @Input() location: ILocation;
  @Input() categories$: Observable<ICategory[]>;

  constructor() { }

  ngOnInit() {
  }

}
