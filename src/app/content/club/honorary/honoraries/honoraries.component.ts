import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { IClub } from '../../../../../../shared/interfaces/club.interface';
import { IMember } from '../../../../../../shared/interfaces/member.interface';
import { ISubscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../../../../../shared/services/member/member.service';
import * as moment from 'moment';
import 'moment/min/locales';

moment.locale('de-de');

@Component({
  selector: 'honoraries',
  templateUrl: './honoraries.component.html'
})
export class HonorariesComponent implements OnInit {

  public club: IClub;
  public moment: any;

  constructor(public route: ActivatedRoute,
    /*public authService: AuthService,
    public clubService: ClubService,*/
    public memberService: MemberService
              /*public clubHonoraryService: ClubHonoraryService,
              public mediaGalleryService: MediaGalleryService,
              public router: Router */) {
    this.moment = moment;
  }

  ngOnInit() {
  }

}
