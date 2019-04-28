import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isActive: boolean;
  isModalActive = false;
  user: IUser;
  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit() {
    const user = this._userService.getUserLoggedIn();
    this.user = user || null;
    this.isActive = false;
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  logOut() {
    this._userService.logOut();
    window.location.reload();
  }

}
