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
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { IStaticPage } from '../../../shared/interfaces/static-page.interface';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  public application: IApplication;
  public form: FormGroup;
  public selectedStaticPage: number;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private title: Title,
    private translateService: TranslateService,
    private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { application: IApplication }) => this.application = data.application);

    if(this.application) {
      this.form = this.fb.group({
        page: this.initPage(),
        urlShortening: this.initUrlShortening(),
        registration: this.initRegistration(),
        downtime: this.initDowntime(),
        staticPages: this.initStaticPages(),
        // social: this.initSocialProviders()
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
        this.application.staticPages = changes.staticPages;
      });
    }
  }

  initPage(): FormGroup {
    return this.fb.group({
      name: [this.application.page.name, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: this.application.page.description,
      email: this.application.page.email,
      title: this.application.page.title
    });
  }

  initUrlShortening(): FormGroup {
    return this.fb.group({
      isEnabled: this.application.urlShortening.isEnabled,
      provider: this.application.urlShortening.provider
    });
  }

  initRegistration(): FormGroup {
    return this.fb.group({
      isAllowed: this.application.registration.isAllowed,
      defaultRole: this.application.registration.defaultRole
    });
  }

  initDowntime(): FormGroup {
    return this.fb.group({
      isEnabled: this.application.downtime.isEnabled,
      message: this.application.downtime.message
    });
  }

  initStaticPages(): FormArray {
    const formArray = [];
    if (this.application.staticPages) {
      for (let i = 0; i < this.application.staticPages.length; i++) {
        formArray.push(this.initStaticPage(this.application.staticPages[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initStaticPage(staticPage: IStaticPage): FormGroup {
    return this.fb.group({
      isEnabled: [staticPage ? staticPage.isEnabled : false],
      sectionTitle: [staticPage ? staticPage.sectionTitle : '', [Validators.required]],
      text: [staticPage ? staticPage.text : '', [Validators.required]],
      title: [staticPage ? staticPage.title : '', [Validators.required]]
    });
  }

  addStaticPage(): void {
    this.getNewStaticPageTitle().subscribe((staticPageTitle:string) => {
      const control = <FormArray>this.form.controls['staticPages'];
      const staticPage: IStaticPage = {
        isEnabled: true,
        sectionTitle: '',
        text: '',
        title: staticPageTitle
      };
      const addCtrl = this.initStaticPage(staticPage);
      control.push(addCtrl);
      this.selectedStaticPage = this.form.controls['staticPages']['controls'].length;
    });
  }

  removeStaticPage(i: number): void {
    const control = <FormArray>this.form.controls['staticPages'];
    control.removeAt(i);
  }

  setSelectedStaticPage(staticPage: number): void {
    this.selectedStaticPage = staticPage;
  }

  getNewStaticPageTitle(): Observable<string>{
    return this.translateService.get('general.applications.static.noTitle');
  }

  /*
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
  } */

  saveSettings() {

    this.applicationService.updateApplication(this.application.id, this.application).then(
      () => {

        // set Page Title
        if (this.title.getTitle() !== this.application.page.title) {
          this.title.setTitle(this.application.page.title);
        }

        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'success',
            message: 'general.applications.updateMessage'
          },
          duration: 2500
        });
      },
      (error: any) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'error',
            message: error
          },
          duration: 2500
        });
      });
  }


  cancel(){
    this.form.reset();
  }
}
