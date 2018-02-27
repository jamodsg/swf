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
import { FameMemberComponent } from './fame-member/fame-member.component';
import { MemberEditProfileComponent } from './member-edit/member-edit-profile/member-edit-profile.component';
import { MemberEditInterviewsComponent } from './member-edit/member-edit-interviews/member-edit-interviews.component';
import { MemberDetailProfileComponent } from './member-detail/member-detail-profile/member-detail-profile.component';
import { MemberDetailInterviewsComponent } from './member-detail/member-detail-interviews/member-detail-interviews.component';
import { ArticleService } from '../../shared/services/article/article.service';
import { MemberEditOtherOpinionsComponent } from './member-edit/member-edit-other-opinions/member-edit-other-opinions.component';

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
    PerfectScrollbarModule,
    QuillModule,
    SharedModule
  ],
  declarations: [
    FameMemberComponent,
    MemberDetailComponent,
    MemberDetailMainComponent,
    MemberDetailDriveComponent,
    MemberDetailInterviewsComponent,
    MemberDetailProfileComponent,
    MemberEditComponent,
    MemberEditMainComponent,
    MemberEditDriveComponent,
    MemberListComponent,
    MembersComponent,
    MemberStatisticsComponent,
    MemberEditProfileComponent,
    MemberEditInterviewsComponent,
    MemberEditOtherOpinionsComponent
  ],
  providers: [
    ArticleService,
    MemberResolver,
    MemberService,
    MemberStateService,
    PendingChangesGuard
  ]
})

export class MemberModule {
}

