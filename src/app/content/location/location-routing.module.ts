import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LocationsComponent } from './locations/locations.component';
import { LocationResolver } from './location.resolver';
import { LocationDetailComponent } from './location-detail/location-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
    pathMatch: 'full'
  }, /*
  {
    path: 'edit/:locationId',
    component: LocationEditComponent,
    resolve: {
      location: LocationResolver
    },
    pathMatch: 'full'
  },*/
  {
    path: 'detail/:locationId',
    component: LocationDetailComponent,
    resolve: {
      location: LocationResolver
    },
  }/*,
  {
    path: 'media/:locationId',
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
