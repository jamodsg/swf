import { NgModule } from '@angular/core';
import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from './directives/accordion';
import { ToggleFullscreenDirective } from './directives/fullscreen/toggle-fullscreen.directive';
import { MenuItemsService } from './services/menu/menu-items.service';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
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

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CategoryFilterPipe,
    ToggleFullscreenDirective,
    SanitizeHtmlPipe,
    SnackbarComponent,
    LoadingIndicatorComponent
  ],
  entryComponents: [
    SnackbarComponent
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CommonModule,
    CreationModule,
    FlexLayoutModule,
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
    TranslateModule
  ],
  imports: [
    MatProgressSpinnerModule
  ],
  providers: [
    MenuItemsService
  ]
})
export class SharedModule {
}
