import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IClub } from '../../../../../../shared/interfaces/club.interface';
import { IMember } from '../../../../../../shared/interfaces/member.interface';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import * as moment from 'moment';
import 'moment/min/locales';
import { ArticleService } from '../../../../../../shared/services/article/article.service';
import { MediaGalleryService } from '../../../../../../shared/services/media/media-gallery.service';
import { IClubHonorary } from '../../../../../../shared/interfaces/club-honorary.interface';
import { ClubService } from '../../../../../../shared/services/club/club.service';

moment.locale('de-de');

@Component({
  selector: 'honorary-form',
  templateUrl: './honorary-form.component.html'
})
export class HonoraryFormComponent implements OnInit {

  @Input() club: IClub;
  @Input() members: IMember[];

  public form: FormGroup;
  public moment: any;
  public honorary: IClubHonorary;

  constructor(public articleService: ArticleService,
    public mediaGalleryService: MediaGalleryService,
    private clubService: ClubService,
    private fb: FormBuilder) {
    this.moment = moment;
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedArticle: '',
      assignedMember: '',
      since: ''
    });

    this.form.valueChanges.subscribe((changes: IClubHonorary) => {
      this.honorary = {
        assignedArticle: changes.assignedArticle,
        assignedMember: changes.assignedMember,
        since: changes.since,
        assignedClub: this.club.id,
      };
    });
  }

  saveHonorary() {
    this.club.honoraries.push(this.honorary);
  }

}
