import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})

export class UsersComponent {

  rows = [];
  temp = [];

  users$: Observable<IUser[]> = null;

  columns = [
    { prop: 'email' },
    { prop: 'lastName' },
    { prop: 'firstName' },
    { prop: 'assignedRole' },
    { prop: 'onlineStatus' },
    { name: 'Actions' }
  ];

  constructor(public userService: UserService) {
    this.users$ = userService.users$;
  }

  removeUser($event) {
    this.userService.removeUser($event).then();
  }

  updateUser($event) {
    this.userService.updateUser($event.user.id, $event.user).then();
  }

}
