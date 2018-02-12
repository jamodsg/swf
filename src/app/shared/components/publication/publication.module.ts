import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { UserService } from '../../services/user/user.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  imports: [
    AmazingTimePickerModule,
    CommonModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    NgPipesModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    PublicationFormComponent
  ],
  exports: [
    PublicationFormComponent
  ],
  providers: [
    UserService
  ]
})
export class PublicationModule { }
