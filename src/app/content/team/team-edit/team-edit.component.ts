import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { TeamService } from '../../../shared/services/team/team.service';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { UserService } from '../../../shared/services/user/user.service';
import { IUser } from '../../../shared/interfaces/user.interface';
import { ClubService } from '../../../shared/services/club/club.service';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { ISeason } from '../../../shared/interfaces/season.interface';
import { SeasonService } from '../../../shared/services/season/season.service';
import { ITraining } from '../../../shared/interfaces/training.interface';
import { LocationService } from '../../../shared/services/location/location.service';
import { ILocation } from '../../../shared/interfaces/location.interface';
import { ITeamManagement } from '../../../shared/interfaces/team/team-management.interface';

@Component({
  selector: 'team-edit',
  templateUrl: 'team-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TeamEditComponent implements OnInit {

  public team: ITeam;
  public members$: Observable<IMember[]>;
  public users$: Observable<IUser[]>;
  public clubs$: Observable<IClub[]>;
  public seasons$: Observable<ISeason[]>;
  public categories$: Observable<ICategory[]>;
  public categoryTypes$: Observable<ICategoryType[]>;
  public locations$: Observable<ILocation[]>;

  public form: FormGroup;

  @ViewChild('description') description: QuillEditorComponent;

  public titleMaxLength: number = 50;
  public shortTitleMaxLength: number = 25;

  constructor(private teamService: TeamService,
    private categoryTypeService: CategoryTypeService,
    private memberService: MemberService,
    private seasonService: SeasonService,
    private clubService: ClubService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private userService: UserService) {
    this.users$ = userService.users$;
    this.members$ = memberService.members$;
    this.clubs$ = clubService.clubs$;
    this.categories$ = categoryService.categories$;
    this.categoryTypes$ = categoryTypeService.categoryTypes$;
    this.seasons$ = seasonService.seasons$;
    this.locations$ = locationService.locations$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { team: ITeam }) => this.team = data.team);

    this.form = this.fb.group({
      title: [this.team.title, [Validators.required, Validators.minLength(5), Validators.maxLength(this.titleMaxLength)]],
      shortTitle: this.team.shortTitle,
      externalLink: this.team.externalTeamLink,
      isOfficialTeam: this.team.isOfficialTeam,
      greetingWord: this.team.greetingWord,
      assignedCategories: [this.team.assignedCategories, [Validators.required]],
      assignedPlayers: this.team.assignedPlayers,
      assignedClub: [this.team.assignedClub, [Validators.required]],
      photoDescription: this.team.photoDescription,
      assignedSeason: this.team.assignedSeason,
      creation: this.initCreation(),
      assignedTrainings: this.initAssignedTrainings(),
      assignedPositions: this.initAssignedPositions()
    });

    this.form.valueChanges.subscribe((changes: ITeam) => {
      this.team = Object.assign({}, this.team, changes);
    });
  }

  initCreation(): FormGroup {
    return this.fb.group({
      at: this.team.creation.at,
      from: this.team.creation.from
    });
  }

  initAssignedTrainings(): FormArray {
    const formArray = [];
    if (this.team.assignedTrainings) {
      for (let i = 0; i < this.team.assignedTrainings.length; i++) {
        formArray.push(this.initTraining(this.team.assignedTrainings[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initTraining(training: ITraining): FormGroup {
    return this.fb.group({
      day: [training ? training.day : new Date().getDay(), [Validators.required]],
      startTime: [training ? training.startTime : '', [Validators.required]],
      endTime: [training ? training.endTime : '', [Validators.required]],
      comment: training ? training.comment : '',
      assignedLocation: [training ? training.assignedLocation : '', [Validators.required]],
    });
  }

  addTraining(): void {
    const control = <FormArray>this.form.controls['assignedTrainings'];
    const addCtrl = this.initTraining(null);
    control.push(addCtrl);
  }

  removeTraining(i: number) {
    const control = <FormArray>this.form.controls['assignedTrainings'];
    control.removeAt(i);
  }

  initAssignedPositions(): FormArray {
    const formArray = [];
    if (this.team.assignedPositions) {
      for (let i = 0; i < this.team.assignedPositions.length; i++) {
        formArray.push(this.initPosition(this.team.assignedPositions[i]));
      }
    }
    return this.fb.array(formArray);
  }

  addPosition(): void {
    const control = <FormArray>this.form.controls['assignedPositions'];
    const addCtrl = this.initPosition(null);
    control.push(addCtrl);
  }

  initPosition(position: ITeamManagement): FormGroup {
    return this.fb.group({
      type: [position ? position.type : '', [Validators.required]],
      position: [position ? position.position : '', [Validators.required]],
      assignedMember: [position ? position.assignedMember : '', [Validators.required]],
    });
  }

  removePosition(i: number) {
    const control = <FormArray>this.form.controls['assignedPositions'];
    control.removeAt(i);
  }


  saveTeam() {
    console.log(this.team);
    console.log(this.form.getRawValue());
    let action;
    // const assignedItems: any[] = this.form.get('assignedItems').value;
    /* this.form.get('assignedItems').reset();

    if (this.team.id) {
      action = this.teamService.updateTeam(this.team.id, this.form.getRawValue());
    } else {
      action = this.teamService.createTeam(this.form.getRawValue());
    }
    action.then(() => this.redirectToList());
    */
  }

  cancel() {
    this.redirectToList();
  }

  removeTeam(event: ITeam) {
    this.teamService.removeTeam(event).then(() => this.redirectToList());
  }

  redirectToList() {
    this.router.navigate(['/teams']).then();
  }

}
