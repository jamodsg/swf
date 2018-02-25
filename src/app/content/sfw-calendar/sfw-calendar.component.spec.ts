import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SFWCalendarComponent } from './sfw-calendar.component';

describe('SFWCalendarComponent', () => {
  let component: SFWCalendarComponent;
  let fixture: ComponentFixture<SFWCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SFWCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SFWCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
