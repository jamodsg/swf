import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { appRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    RouterModule.forRoot(appRoutes, { enableTracing: environment.routerTracing }),
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
