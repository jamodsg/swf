import { NgModule } from '@angular/core';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationsComponent } from './locations/locations.component';
import { locationRoutingModule } from './location-routing.module';
import { LocationResolver } from './location.resolver';
import { SharedModule } from '../../shared/shared.module';
import { CategoryService } from '../../shared/services/category/category.service';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { LocationService } from '../../shared/services/location/location.service';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    FlexLayoutModule,
    locationRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    SharedModule
  ],
  declarations: [
    LocationListComponent,
    LocationsComponent
  ],
  providers: [
    CategoryService,
    CategoryTypeService,
    LocationResolver,
    LocationService
  ]
})
export class LocationModule {
}
