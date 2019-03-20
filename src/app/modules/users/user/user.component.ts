import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username: string;
  user;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.username = params['username'];
      this._userService
          .getUser(this.username)
          .subscribe(user => this.user = user);
    });
  }

}
