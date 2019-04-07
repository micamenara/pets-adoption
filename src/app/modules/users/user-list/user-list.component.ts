import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
    this._userService.getUsers().subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }

}
