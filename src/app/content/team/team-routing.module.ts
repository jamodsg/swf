import { Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { TeamResolver } from './team.resolver';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamOfTheMonthComponent } from './team-of-the-month/team-of-the-month.component';
import { TeamMediaComponent } from './team-media/team-media.component';

export const teamRoutes: Routes = [
  {
    path: '',
    component: TeamsComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit/:teamId',
    component: TeamEditComponent,
    resolve: {
      team: TeamResolver
    }
  },
  {
    path: 'detail/:teamId',
    component: TeamDetailComponent,
    resolve: {
      team: TeamResolver
    }
  },
  {
    path: 'teamOfTheMonth',
    component: TeamOfTheMonthComponent
  },
  {
    path: 'media',
    component: TeamMediaComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];


