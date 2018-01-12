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
  MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { QuillModule } from 'ngx-quill';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MediaModule } from '../../shared/components/media/media.module';

@NgModule({
  imports: [
    RouterModule.forChild(sponsorRoutes),
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatTabsModule,
    MatToolbarModule,
    MediaModule,
    QuillModule,
    SharedModule
  ],
  declarations: [
    RandomSponsorComponent,
    SponsorEditComponent,
    SponsorsComponent
  ],
  providers: [
    CategoryService,
    CategoryTypeService,
    SponsorResolver,
    SponsorService
  ]
})
export class SponsorModule {
}
