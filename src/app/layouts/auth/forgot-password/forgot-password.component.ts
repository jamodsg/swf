import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup;

  @Input() loading: boolean;
  @Output() toggleFormVisibility: EventEmitter<any> = new EventEmitter(false);

  constructor(private fb: FormBuilder, private authService: AuthService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  toggleSignInForm() {
    this.toggleFormVisibility.emit(
      {
        showSignInForm: true,
        showSignUpForm: false,
        showPasswordForm: false
      }
    );
  }

  toggleSignUpForm() {
    this.toggleFormVisibility.emit(
      {
        showSignInForm: false,
        showSignUpForm: true,
        showPasswordForm: false
      }
    );
  }

  forgotPassword() {
    this.loading = true;
    this.authService.sendPasswordResetEmail(this.form.value.email)
      .then(() => {
        this.alertService.success('Cool! Password recovery instruction has been sent to your email.', true);
        this.loading = false;
        this.toggleSignInForm();
        this.form.reset();
      }).catch(
      (error: any) => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

}
