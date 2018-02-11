import { NgModule } from '@angular/core';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationsComponent } from './locations/locations.component';
import { locationRoutingModule } from './location-routing.module';
import { LocationResolver } from './location.resolver';
import { SharedModule } from '../../shared/shared.module';
import { CategoryService } from '../../shared/services/category/category.service';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { LocationService } from '../../shared/services/location/location.service';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { MemberService } from '../../shared/services/member/member.service';
import { LocationDetailMainComponent } from './location-detail/location-detail-main/location-detail-main.component';
import { LocationDetailMapComponent } from './location-detail/location-detail-map/location-detail-map.component';
import { AgmCoreModule } from '@agm/core';
import { MapsService } from '../../shared/services/maps/maps.service';
import { HttpClientModule } from '@angular/common/http';
import { LocationDetailContactComponent } from './location-detail/location-detail-contact/location-detail-contact.component';
import { ArticleService } from '../../shared/services/article/article.service';
import { LocationMapComponent } from './location-map/location-map.component';
import { LocationDetailMediaComponent } from './location-detail/location-detail-media/location-detail-media.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { QuillModule } from 'ngx-quill';
import { LocationEditAddressComponent } from './location-edit/location-edit-address/location-edit-address.component';
import { LocationEditContactComponent } from './location-edit/location-edit-contact/location-edit-contact.component';
import { LocationContactFormComponent } from './location-edit/location-contact-form/location-contact-form.component';
import { MediaModule } from '../../shared/components/media/media.module';
import { PendingChangesGuard } from '../../shared/services/auth/pending-changes.guard';
import { LocationsByCategoryComponent } from './locations/locations-by-category/locations-by-category.component';
import { ChartsModule } from 'ng2-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AgmCoreModule,
    ChartsModule,
    FlexLayoutModule,
    HttpClientModule,
    locationRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MediaModule,
    PerfectScrollbarModule,
    QuillModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    LocationContactFormComponent,
    LocationDetailComponent,
    LocationDetailContactComponent,
    LocationDetailMapComponent,
    LocationDetailMediaComponent,
    LocationEditAddressComponent,
    LocationEditComponent,
    LocationEditContactComponent,
    LocationListComponent,
    LocationMapComponent,
    LocationsComponent,
    LocationDetailMainComponent,
    LocationsByCategoryComponent
  ],
  providers: [
    ArticleService,
    CategoryService,
    CategoryTypeService,
    LocationResolver,
    LocationService,
    MapsService,
    MemberService,
    PendingChangesGuard
  ]
})
export class LocationModule {
}
