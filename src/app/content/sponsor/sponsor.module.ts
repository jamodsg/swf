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
import { MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatToolbarModule } from '@angular/material';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    RouterModule.forChild(sponsorRoutes),
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
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
