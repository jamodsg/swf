import { NgModule } from '@angular/core';
import { calendarRoutes } from './calendar-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    RouterModule.forChild(calendarRoutes),
    SharedModule
  ],
  declarations: [
    CalendarComponent
  ],
  providers: [

  ]
})

export class CalendarModule {
}
