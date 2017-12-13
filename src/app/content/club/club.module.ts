import { NgModule } from '@angular/core';
import { clubRoutes } from './club-routing.module';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubItemComponent } from './club-item/club-item.component';
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

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    QuillModule,
    RouterModule.forChild(clubRoutes),
    SharedModule
  ],
  declarations: [
    ClubDetailComponent,
    ClubEditComponent,
    /*ClubFilesComponent, */
    ClubItemComponent,
    ClubListComponent,
    // ClubManagementFotoComponent,
    // ClubMediaComponent,
    ClubsComponent,
    /* ClubStadiumComponent,
    ClubMangementTimelineComponent,
    ClubManagementTimelineFormComponent,
    ClubManagementTimelineListComponent */
  ],
  providers: [
    ClubResolver,
    ClubService,
    LocationService,
    MemberService
  ]
})

export class ClubModule {
}
