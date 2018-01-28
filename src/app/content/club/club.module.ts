import { NgModule } from '@angular/core';
import { clubRoutes } from './club-routing.module';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubResolver } from './club.resolver';
import { ClubEditComponent } from './club-edit/club-edit.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ClubService } from '../../shared/services/club/club.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatInputModule, MatTabsModule } from '@angular/material';
import { QuillModule } from 'ngx-quill';
import { LocationService } from '../../shared/services/location/location.service';
import { MemberService } from '../../shared/services/member/member.service';
import { MediaModule } from '../../shared/components/media/media.module';
import { TimeLineModule } from '../../shared/components/time-line/time-line.module';
import { ClubEditMainComponent } from './club-edit/club-edit-main/club-edit-main.component';
import { ClubHistoryComponent } from './club-edit/club-history/club-history.component';
import { PendingChangesGuard } from '../../shared/services/auth/pending-changes.guard';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MediaModule,
    QuillModule,
    RouterModule.forChild(clubRoutes),
    SharedModule,
    TimeLineModule
  ],
  declarations: [
    ClubDetailComponent,
    ClubEditComponent,
    /*ClubFilesComponent, */
    ClubListComponent,
    // ClubManagementFotoComponent,
    // ClubMediaComponent,
    ClubsComponent,
    ClubEditMainComponent,
    ClubHistoryComponent,
    /* ClubStadiumComponent,
    ClubMangementTimelineComponent,
    ClubManagementTimelineFormComponent,
    ClubManagementTimelineListComponent */
  ],
  exports: [],
  providers: [
    ClubResolver,
    ClubService,
    LocationService,
    MemberService,
    PendingChangesGuard
  ]
})

export class ClubModule {
}
