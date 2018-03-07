import { NgModule } from '@angular/core';
import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from './directives/accordion';
import { ToggleFullscreenDirective } from './directives/fullscreen/toggle-fullscreen.directive';
import { MenuItemsService } from './services/menu/menu-items.service';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatCardModule,
  MatFormFieldModule,
  MatIconModule, MatListModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { LinkModule } from './components/links/link.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { CreationModule } from './components/creation/creation.module';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';
import { IsEmptyPipe } from './pipes/is-empty.pipe';
import { BirthdayFilterPipe } from './pipes/birthday-filter.pipe';
import { UserAvatarComponent } from './components/user/user-avatar/user-avatar.component';
import { UserService } from './services/user/user.service';
import { RouterModule } from '@angular/router';
import { BirthdayRangeFilterPipe } from './pipes/birthday-range-filter.pipe';
import { MatchListComponent } from './components/match/match-list/match-list.component';
import { MatchFilterPipe } from './pipes/match-filter.pipe';
import { MatchNoResultFilterPipe } from './pipes/match-no-result-filter.pipe';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    BirthdayFilterPipe,
    CategoryFilterPipe,
    MatchFilterPipe,
    MatchNoResultFilterPipe,
    IsEmptyPipe,
    ToggleFullscreenDirective,
    SanitizeHtmlPipe,
    SnackbarComponent,
    LoadingIndicatorComponent,
    UserAvatarComponent,
    BirthdayRangeFilterPipe,
    MatchListComponent
  ],
  entryComponents: [
    SnackbarComponent
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    BirthdayFilterPipe,
    BirthdayRangeFilterPipe,
    CategoryFilterPipe,
    MatchFilterPipe,
    MatchNoResultFilterPipe,
    CommonModule,
    CreationModule,
    FlexLayoutModule,
    IsEmptyPipe,
    LinkModule,
    LoadingIndicatorComponent,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    NgPipesModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SanitizeHtmlPipe,
    ToggleFullscreenDirective,
    TranslateModule,
    UserAvatarComponent,
    MatchListComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatListModule,
    NgPipesModule,
    RouterModule,
    TranslateModule
  ],
  providers: [
    MenuItemsService,
    UserService
  ]
})
export class SharedModule {
}
