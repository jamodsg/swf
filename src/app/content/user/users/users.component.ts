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

  users$: Observable<IUser[]>;

  columns = [
    { prop: 'email' },
    { prop: 'lastName' },
    { prop: 'firstName' },
    { prop: 'assignedRole' },
    { prop: 'onlineStatus' },
    { name: 'Actions' }
  ];

  constructor(public userService: UserService) {
    this.users$ = userService.users$; /* .subscribe((users: IUser[]) => {
      this.temp = [...users];
      this.rows = users;
    }); */
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
  }

}
