import { NgModule } from '@angular/core';
import { loginRoutes } from './login.routing';
import { AngularFireAuthProvider } from 'angularfire2/auth';
import { LoginComponent } from './login.component';
import { UnAuthGuard } from '../../shared/services/auth/unauth.guard';
import { AlertComponent } from '../../shared/directives/alert/alert.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSidenavModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AlertComponent,
    // ForgotPasswordComponent,
    LoginComponent,
    // SignInComponent,
    // SignUpComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes),
    TranslateModule
  ],
  providers: [
    AngularFireAuthProvider,
    AuthService,
    UnAuthGuard
  ],
  exports: [],
  entryComponents: [
    AlertComponent
  ]
})

export class LoginModule {
}
