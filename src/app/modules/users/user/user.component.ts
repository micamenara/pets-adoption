import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PetService } from '../../../services/pet.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userId: string;
  userFullName: string;
  user;
  pets;
  tabs = {
    profile: true,
    pets: false
  };

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _petService: PetService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.userId = params['userId'];
      this._userService
          .getUser(this.userId)
          .subscribe(user => {
            this.user = user;
            this.userFullName = `${this.user.name} ${this.user.lastname}`;
            // this.pets = this._petService.getUserPets(this.user.login);
          });
    });
  }

  openTab(tabName) {
    if (tabName === 'profile') {
      this.tabs.profile = true;
      this.tabs.pets = false;
    } else {
      this.tabs.profile = false;
      this.tabs.pets = true;
    }
  }

}
