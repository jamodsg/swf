import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LocationsComponent } from './locations/locations.component';

export const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
    pathMatch: 'full'
  }/*,
  {
    path: 'edit/:id',
    component: LocationEditComponent,
    resolve: {
      location: LocationResolver
    },
    pathMatch: 'full'
  },
  {
    path: 'detail/:id',
    component: LocationDetailComponent,
    resolve: {
      location: LocationResolver
    },
    pathMatch: 'full'
  },
  {
    path: 'media/:id',
    component: LocationMediaComponent,
    resolve: {
      location: LocationResolver
    },
    pathMatch: 'full'
  },
  {
    path: 'map',
    component: LocationMapComponent,
    pathMatch: 'full'
  }*/,
  {
    path: '**',
    redirectTo: ''
  }
];

export const locationRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
