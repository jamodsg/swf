import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LocationsComponent } from './locations/locations.component';
import { LocationResolver } from './location.resolver';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { LocationMapComponent } from './location-map/location-map.component';

export const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
    pathMatch: 'full'
  },
  /*{
    path: 'edit/:locationId',
    component: LocationEditComponent,
    resolve: {
      location: LocationResolver
    }
  },*/
  {
    path: 'detail/:locationId',
    component: LocationDetailComponent,
    resolve: {
      location: LocationResolver
    },
  },
  {
    path: 'map',
    component: LocationMapComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const locationRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
