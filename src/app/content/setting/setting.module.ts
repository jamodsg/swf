import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { settingsRoutingModule } from './setting-routing.module';
import { SettingsMainDataComponent } from './settings/settings-main-data/settings-main-data.component';
import { SettingsSocialDataComponent } from './settings/settings-social-data/settings-social-data.component';
import { StaticPagesComponent } from './settings/static-pages/static-pages.component';
import { StaticPageComponent } from './settings/static-pages/static-page/static-page.component';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { ApplicationService } from '../../shared/services/application/application.service';
import { ApplicationResolver } from './application.resolver';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    QuillModule,
    settingsRoutingModule,
    SharedModule
  ],
  declarations: [
    SettingsComponent,
    SettingsMainDataComponent,
    SettingsSocialDataComponent,
    StaticPagesComponent,
    StaticPageComponent
  ],
  providers: [
    ApplicationResolver,
    ApplicationService
  ]
})
export class SettingModule {
}
