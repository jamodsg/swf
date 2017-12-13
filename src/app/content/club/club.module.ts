import { NgModule } from '@angular/core';
import { clubRoutingModule } from './club-routing.module';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubItemComponent } from './club-item/club-item.component';
import { ClubResolver } from './club.resolver';
import { ClubEditComponent } from './club-edit/club-edit.component';
import { ClubEditMainComponent } from './club-edit/club-edit-main/club-edit-main.component';
import { MainClubInfoComponent } from './main-club-info/main-club-info.component';
import { ClubHistoryComponent } from './club-edit/club-history/club-history.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { ClubDetailMainComponent } from './club-detail/club-detail-main/club-detail-main.component';
import { ClubAssignedTeamsComponent } from './club-detail/club-assigned-teams/club-assigned-teams.component';
import { SharedPagesModule } from '../../shared/shared-pages.module';
import { TimeLineModule } from '../../shared/time-line/time-line.module';
import { PositionModule } from '../../shared/positions/position.module';

@NgModule({
  imports: [
    clubRoutingModule,
    PositionModule,
    SharedPagesModule,
    TimeLineModule
  ],
  declarations: [
    ClubAssignedTeamsComponent,
    ClubDetailComponent,
    ClubEditComponent,
    ClubEditMainComponent,
    ClubHistoryComponent,
    /*ClubFilesComponent, */
    ClubItemComponent,
    ClubListComponent,
    // ClubManagementFotoComponent,
    // ClubMediaComponent,
    ClubsComponent,
    MainClubInfoComponent,
    ClubHistoryComponent,
    ClubDetailMainComponent
    /* ClubStadiumComponent,
    ClubMangementTimelineComponent,
    ClubManagementTimelineFormComponent,
    ClubManagementTimelineListComponent */
  ],
  providers: [
    ClubResolver
  ]
})

export class ClubModule {
}
