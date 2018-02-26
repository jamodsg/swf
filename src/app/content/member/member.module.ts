import { NgModule } from '@angular/core';
import { memberRoutingModule } from './member-routing.module';
import { MembersComponent } from './members/members.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberResolver } from './member.resolver';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';
import { MemberService } from '../../shared/services/member/member.service';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberStatisticsComponent } from './member-statistics/member-statistics.component';
import { MemberDetailMainComponent } from './member-detail/member-detail-main/member-detail-main.component';
import { MemberDetailDriveComponent } from './member-detail/member-detail-drive/member-detail-drive.component';
import { MemberStateService } from '../../shared/services/member/member-state.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MemberEditMainComponent } from './member-edit/member-edit-main/member-edit-main.component';
import { MemberEditDriveComponent } from './member-edit/member-edit-drive/member-edit-drive.component';
import { PendingChangesGuard } from '../../shared/services/auth/pending-changes.guard';
import { QuillModule } from 'ngx-quill';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTabsModule,
    memberRoutingModule,
    MomentModule,
    PerfectScrollbarModule,
    QuillModule,
    SharedModule
  ],
  declarations: [
    MemberListComponent,
    MembersComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberStatisticsComponent,
    MemberDetailMainComponent,
    MemberDetailDriveComponent,
    MemberEditMainComponent,
    MemberEditDriveComponent
  ],
  providers: [
    MemberResolver,
    MemberService,
    MemberStateService,
    PendingChangesGuard
  ]
})

export class MemberModule {
}

