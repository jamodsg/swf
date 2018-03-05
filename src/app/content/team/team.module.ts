import { NgModule } from '@angular/core';
import { teamRoutes } from './team-routing.module';
import { TeamsComponent } from './teams/teams.component';
import { TeamListComponent } from './team-list/team-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TeamResolver } from './team.resolver';
import { TeamService } from '../../shared/services/team/team.service';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule, MatListModule, MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { QuillModule } from 'ngx-quill';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryService } from '../../shared/services/category/category.service';
import { ClubService } from '../../shared/services/club/club.service';
import { MemberService } from '../../shared/services/member/member.service';
import { UserService } from '../../shared/services/user/user.service';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { SeasonService } from '../../shared/services/season/season.service';
import { TeamTrainingComponent } from './team-edit/team-training/team-training.component';
import { TeamTrainingFormComponent } from './team-edit/team-training/team-training-form/team-training-form.component';
import { LocationService } from '../../shared/services/location/location.service';
import { ApplicationService } from '../../shared/services/application/application.service';
import { TeamPositionsComponent } from './team-edit/team-positions/team-positions.component';
import { TeamPositionFormComponent } from './team-edit/team-positions/team-position-form/team-position-form.component';
import { TeamMediaComponent } from './team-media/team-media.component';
import { FameTeamComponent } from './fame-team/fame-team.component';
import { TeamEditMainComponent } from './team-edit/team-edit-main/team-edit-main.component';
import { TeamDetailMainComponent } from './team-detail/team-detail-main/team-detail-main.component';
import { TeamDetailPositionsComponent } from './team-detail/team-detail-positions/team-detail-positions.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatTabsModule,
    QuillModule,
    RouterModule.forChild(teamRoutes),
    SharedModule
  ],
  declarations: [
    TeamDetailComponent,
    TeamEditComponent,
    TeamListComponent,
    TeamsComponent,
    TeamTrainingComponent,
    TeamTrainingFormComponent,
    TeamPositionsComponent,
    TeamPositionFormComponent,
    TeamMediaComponent,
    FameTeamComponent,
    TeamEditMainComponent,
    TeamDetailMainComponent,
    TeamDetailPositionsComponent
  ],
  providers: [
    ApplicationService,
    CategoryService,
    CategoryTypeService,
    ClubService,
    LocationService,
    MemberService,
    SeasonService,
    TeamResolver,
    TeamService,
    UserService
  ]
})

export class TeamModule {
}
