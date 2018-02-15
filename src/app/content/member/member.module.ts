import { NgModule } from '@angular/core';
import { memberRoutingModule } from './member-routing.module';
import { MembersComponent } from './members/members.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberResolver } from './member.resolver';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';
import { MemberService } from '../../shared/services/member/member.service';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule, MatTabsModule } from '@angular/material';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberStatisticsComponent } from './member-statistics/member-statistics.component';
import { MemberDetailMainComponent } from './member-detail/member-detail-main/member-detail-main.component';
import { MemberDetailDriveComponent } from './member-detail/member-detail-drive/member-detail-drive.component';
import { MemberStateService } from '../../shared/services/member/member-state.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    memberRoutingModule,
    PerfectScrollbarModule,
    SharedModule
  ],
  declarations: [
    MemberListComponent,
    MembersComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberStatisticsComponent,
    MemberDetailMainComponent,
    MemberDetailDriveComponent
  ],
  providers: [
    MemberResolver,
    MemberService,
    MemberStateService
  ]
})

export class MemberModule {
}

