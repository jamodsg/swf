import { NgModule } from '@angular/core';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { sponsorRoutes } from './sponsor-routing.module';
import { RandomSponsorComponent } from './random-sponsor/random-sponsor.component';
import { SponsorEditComponent } from './sponsor-edit/sponsor-edit.component';
import { SponsorResolver } from './sponsor.resolver';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { CategoryService } from '../../shared/services/category/category.service';
import { SponsorService } from '../../shared/services/sponsor/sponsor.service';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatSelectModule, MatSidenavModule, MatSliderModule,
  MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { QuillModule } from 'ngx-quill';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MediaModule } from '../../shared/components/media/media.module';
import { SponsorItemComponent } from './sponsors/sponsor-item/sponsor-item.component';
import { SponsorFilterComponent } from './sponsors/sponsor-filter/sponsor-filter.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { CategoryFilterPipe } from '../../shared/pipes/category-filter.pipe';
import { SponsorDetailComponent } from './sponsor-detail/sponsor-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild(sponsorRoutes),
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MediaModule,
    QuillModule,
    SharedModule
  ],
  declarations: [
    CategoryFilterPipe,
    RandomSponsorComponent,
    SponsorEditComponent,
    SponsorsComponent,
    SponsorItemComponent,
    SponsorFilterComponent,
    SponsorDetailComponent
  ],
  providers: [
    CategoryService,
    CategoryTypeService,
    MediaMatcher,
    SponsorResolver,
    SponsorService
  ]
})
export class SponsorModule {
}
