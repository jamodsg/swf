import { Component } from '@angular/core';
import { zoomIn, zoomOut } from 'ng-animate';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  styles: [':host .mat-drawer-content {padding: 0;} .mat-drawer-container {z-index: 1000}'],
  styleUrls: [
    'login.component.scss'
  ],
  templateUrl: './login.component.html',
  animations: [
    trigger('authAnimation', [
      state('1', style({
        opacity: 1,
        transform: 'scale(1.0)'
      })),
      state('0', style({
        opacity: 0,
        transform: 'scale(0.0)'
      })),
      transition('1 => 0', useAnimation(zoomOut)),
      transition('0 => 1', useAnimation(zoomIn)),
    ])
  ]
})
export class LoginComponent {

  public loading: boolean = false;
  public nameMinLength: number = 5;
  public passwordMinLength: number = 5;
  public passwordMaxLength: number = 25;

  public showSignInForm: boolean = true;
  public showSignUpForm: boolean = false;
  public showPasswordForm: boolean = false;

  public signUpStatus;

  constructor(public sanitizer: DomSanitizer) {
  }

  toggleFormVisibility($event: any[]) {
    for (const key in $event) {
      this[key] = $event[key];
    }
  }

  signUpComplete($event) {
    this.signUpStatus = $event;
  }

}
