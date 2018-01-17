import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { IApplication } from '../../../shared/interfaces/application.interface';
import { ApplicationService } from '../../../shared/services/application/application.service';

@Component({
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  public application: IApplication;
  public form: FormGroup;
  /* public isSubmitting: boolean = false;
  public currentStaticPage: number;
  */

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private title: Title,
    private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { application: IApplication }) => this.application = data.application);

    this.form = this.fb.group({
      page: this.initPage(),
      urlShortening: this.initUrlShortening(),
      registration: this.initRegistration(),
      downtime: this.initDowntime(),
      /* staticPages: this.initStaticPages(),
      social: this.initSocialProviders() */
    });

    /* if (!this.application.downtime.isEnabled) {
      this.form.get('downtime.message').disable();
    } */

    this.form.valueChanges.subscribe((changes: IApplication) => {
      this.application.page = changes.page;
      this.application.urlShortening = changes.urlShortening;
      this.application.registration = changes.registration;
      this.application.downtime = changes.downtime;
      // this.application.social = changes.social;
      // this.application.staticPages = changes.staticPages;
    });
  }

  initPage() {
    return this.fb.group({
      title: [this.application.page.title, [Validators.required, Validators.minLength(10), Validators.maxLength(40)]],
      description: this.application.page.description,
      email: this.application.page.email
    });
  }

  initUrlShortening() {
    return this.fb.group({
      isEnabled: this.application.urlShortening.isEnabled,
      provider: this.application.urlShortening.provider
    });
  }

  initRegistration() {
    return this.fb.group({
      isAllowed: this.application.registration.isAllowed,
      defaultRole: this.application.registration.defaultRole
    });
  }

  initDowntime() {
    return this.fb.group({
      isEnabled: this.application.downtime.isEnabled,
      message: this.application.downtime.message
    });
  }

  /*
  initStaticPage(staticPage?: IStaticPage) {
    return this.fb.group({
      isEnabled: [staticPage ? staticPage.isEnabled : false],
      sectionTitle: [staticPage ? staticPage.sectionTitle : '', [Validators.required]],
      text: [staticPage ? staticPage.text : '', [Validators.required]],
      title: [staticPage ? staticPage.title : '', [Validators.required]]
    });
  }

  initStaticPages() {
    if (!this.application.staticPages || this.application.staticPages.length === 0) {
      return this.fb.array([]);
    }
    const pages = [];
    for (let i = 0; i < this.application.staticPages.length; i++) {
      const fbGroup = this.initStaticPage(this.application.staticPages[i]);
      pages.push(fbGroup);
    }
    return this.fb.array(pages);
  }

  addStaticPage() {
    const control = <FormArray>this.form.controls['staticPages'];
    control.push(this.initStaticPage());
    this.currentStaticPage = this.form.controls['staticPages']['controls'].length - 1;
  }

  removeStaticPage(i: number) {
    const control = <FormArray>this.form.controls['staticPages'];
    control.removeAt(i);
  }

  initSocialProvider(social?: ISocial) {
    return this.fb.group({
      link: [social ? social.link : '', [Validators.required]],
      title: [social ? social.title : '', [Validators.required]]
    });
  }

  initSocialProviders() {
    if (!this.application.social || this.application.social.length === 0) {
      return this.fb.array([this.initSocialProvider(null)]);
    }
    const groups = [];
    for (let i = 0; i < this.application.social.length; i++) {
      const fbGroup = this.initSocialProvider(this.application.social[i]);
      groups.push(fbGroup);
    }
    return this.fb.array(groups);
  }

  addSocialProvider() {
    const control = <FormArray>this.form.controls['social'];
    control.push(this.initSocialProvider());
  }

  removeSocialProvider(i: number) {
    const control = <FormArray>this.form.controls['social'];
    control.removeAt(i);
  }

  saveSettings() {
    // set Page Title
    if (this.title.getTitle() !== this.application.page.title) {
      this.title.setTitle(this.application.page.title);
    }
    // let action;
    this.isSubmitting = true;
    this.applicationService.updateApplication(this.application).then(() => {
      this.isSubmitting = false;
      // ToDo: Create notification
    }, (error: any) => console.log(error));
  }
  */
}
