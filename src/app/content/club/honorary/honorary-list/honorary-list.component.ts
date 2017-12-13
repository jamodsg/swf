import {
  Component,
  Input, OnInit
} from '@angular/core';
import * as moment from 'moment';
import 'moment/min/locales';
import { IClub } from '../../../../../../shared/interfaces/club.interface';
import { IMember } from '../../../../../../shared/interfaces/member.interface';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../../../../../shared/services/member/member.service';

moment.locale('de-de');

@Component({
  selector: 'honorary-list',
  templateUrl: 'honorary-list.component.html'
})

export class HonorariesListComponent implements OnInit {

  public club: IClub;

  public moment: any;

  constructor(private route: ActivatedRoute,
    public memberService: MemberService
              /*public authService: AuthService,
              public clubService: ClubService,*/
              /*public clubHonoraryService: ClubHonoraryService,
              public mediaGalleryService: MediaGalleryService,
              public router: Router */) {
    this.moment = moment;
  }

  ngOnInit() {

    this.route.params.subscribe((data: { club: IClub }) => {
      console.log(data);
      console.log(data.club);
      this.club = data.club;
    });
  }

  /*
  saveClubHonorary() {
    /* let action;
    if (this.honorary.id) {
      action = this.clubHonoraryService.updateClubHonorary(this.honorary.id, this.honorary);
    } else {
      action = this.clubHonoraryService.createClubHonorary(this.honorary);
    }

    action.then(
      () => {
        this.toggleForm();
        this.resetForm();
      },
      (error: any) => console.log(error)
    );
  }

   setMember(member: IMemberId) {
    this.clubHonoraryService.getClubHonoraryById(member.id).subscribe(
      (honorary: IClubHonoraryId) => {
        console.log(honorary);
        /*if (honorary) {
          this.honorary = honorary;
        } else {
          this.honorary = new ClubHonorary(this.club.id, '', '');
          this.honorary.assignedMember = member.id;
        }
      }
    );
  }

  deleteHonorary() {
    console.log(this.honorary.id);
    this.clubHonoraryService.removeClubHonorary(this.honorary).then(
      (success) => this.resetForm(),
      (error) => console.log(error)
    );
  }
  */
}
