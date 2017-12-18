import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @Input() nameMinLength: number;
  @Input() passwordMinLength: number;
  @Input() passwordMaxLength: number;

  @Output() signUpComplete: EventEmitter<any> = new EventEmitter(false);
  @Output() toggleFormVisibility: EventEmitter<any> = new EventEmitter(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      passwords: this.fb.group({
        password: ['', [
          Validators.required,
          Validators.minLength(this.passwordMinLength),
          Validators.maxLength(this.passwordMaxLength)]],
        confirmPassword: ['', [
          Validators.required,
          Validators.minLength(this.passwordMinLength),
          Validators.maxLength(this.passwordMaxLength)]],
      }, { validator: this.passwordConfirming }),
      agree: [false, [Validators.required, this.validateAgreement]],
    });
  }

  togglePasswordForm() {
    this.toggleFormVisibility.emit({
      showSignInForm: false,
      showSignUpForm: false,
      showPasswordForm: true
    });
  }

  toggleSignUpForm() {
    this.toggleFormVisibility.emit({
      showSignInForm: true,
      showSignUpForm: false,
      showPasswordForm: false
    });
  }

  private validateAgreement(c: AbstractControl): { invalid: boolean } {
    if (!c.value) {
      return { invalid: true };
    }
  }

  private passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    }
  }

}
