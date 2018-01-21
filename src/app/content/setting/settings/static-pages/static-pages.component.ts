import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormGroup } from '@angular/forms';
import { IApplication } from '../../../../shared/interfaces/application.interface';

@Component({
  selector: 'static-pages',
  templateUrl: './static-pages.component.html'
})
export class StaticPagesComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() application: IApplication;
  @Input() selectedStaticPage: number;

  @Output() removeStaticPage: EventEmitter<number> = new EventEmitter(false);
  @Output() addStaticPage: EventEmitter<boolean> = new EventEmitter(false);
  @Output() setSelectedStaticPage: EventEmitter<number> = new EventEmitter(false);

  public config: PerfectScrollbarConfigInterface = {};

  constructor() {
  }

  ngOnInit() {
  }

}
