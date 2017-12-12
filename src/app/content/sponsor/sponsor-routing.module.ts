import { Routes } from '@angular/router';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { SponsorResolver } from './sponsor.resolver';
import { SponsorEditComponent } from './sponsor-edit/sponsor-edit.component';

export const sponsorRoutes: Routes = [
  {
    path: '',
    component: SponsorsComponent,
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: SponsorEditComponent,
    resolve: {
      sponsor: SponsorResolver
    }
  },
  {
    path: 'edit/:sponsorId',
    component: SponsorEditComponent,
    resolve: {
      sponsor: SponsorResolver
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
