import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamOfTheMonthComponent } from './team-of-the-month.component';

describe('TeamOfTheMonthComponent', () => {
  let component: TeamOfTheMonthComponent;
  let fixture: ComponentFixture<TeamOfTheMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamOfTheMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamOfTheMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
