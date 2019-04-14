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
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.isActive = false;
    if (this._userService.getUserLoggedIn()) {
      this.user = this._userService.getUserLoggedIn();
    } else {
      this.user = null;
    }
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

}
