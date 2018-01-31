import { NgModule } from '@angular/core';
import { memberRoutingModule } from './member-routing.module';
import { MembersComponent } from './members/members.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberResolver } from './member.resolver';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';
import { MemberService } from '../../shared/services/member/member.service';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    memberRoutingModule,
    SharedModule
  ],
  declarations: [
    MemberListComponent,
    MembersComponent
  ],
  providers: [
    MemberResolver,
    MemberService
  ]
})

export class MemberModule {
}

