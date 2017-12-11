import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routing';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthGuard } from '../../shared/services/auth/auth.guard';
import { AuthService } from '../../shared/services/auth/auth.service';
import { UnAuthGuard } from '../../shared/services/auth/unauth.guard';
import { environment } from '../../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { EditorGuard } from '../../shared/services/auth/editor.guard';
import { SharedModule } from '../../shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(mainRoutes),
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
  ],
  providers: [
    AngularFireAuth,
    AuthGuard,
    EditorGuard,
    AuthService,
    UnAuthGuard
  ]
})
export class MainModule { }
