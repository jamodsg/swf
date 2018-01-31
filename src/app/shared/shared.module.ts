import { NgModule } from '@angular/core';
import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from './directives/accordion';
import { ToggleFullscreenDirective } from './directives/fullscreen/toggle-fullscreen.directive';
import { MenuItemsService } from './services/menu/menu-items.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule, MatFormFieldModule, MatIconModule, MatOptionModule, MatSelectModule, MatTableModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { LinkModule } from './components/links/link.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { CreationModule } from './components/creation/creation.module';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullscreenDirective,
    SanitizeHtmlPipe,
    SnackbarComponent,
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
  providers: [
    MenuItemsService
  ]
})
export class SharedModule {
}
