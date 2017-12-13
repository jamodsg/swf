import { NgModule } from '@angular/core';
import { HonorariesComponent } from './honoraries/honoraries.component';
import { HonorariesListComponent } from './honorary-list/honorary-list.component';
import { HonoraryFormComponent } from './honorary-form/honorary-form.component';
import { honoraryRoutingModule } from './honorary-routing.module';
import { SharedPagesModule } from '../../../shared/shared-pages.module';

@NgModule({
  imports: [
    honoraryRoutingModule,
    SharedPagesModule
  ],
  declarations: [
    HonorariesComponent,
    HonorariesListComponent,
    HonoraryFormComponent
  ],
  providers: []
})

export class HonoraryModule {
}
