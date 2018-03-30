import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule, MatTabsModule } from '@angular/material';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { SharedModule } from '../../shared/shared.module';
import { MemberService } from '../../shared/services/member/member.service';
import { MatchService } from '../../shared/services/match/match.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CategoryService } from '../../shared/services/category/category.service';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { BirthdayModule } from '../../shared/components/birthday/birthday.module';
import { MatchModule } from '../../shared/components/match/match.module';

@NgModule({
  imports: [
    BirthdayModule,
    ChartsModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTabsModule,
    MatchModule,
    NgxDatatableModule,
    PerfectScrollbarModule,
    RouterModule.forChild(DashboardRoutes),
    SharedModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    CategoryService,
    CategoryTypeService,
    MatchService,
    MemberService
  ]
})

export class DashboardModule {
}
