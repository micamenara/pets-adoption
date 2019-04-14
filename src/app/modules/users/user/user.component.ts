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
  adopted;
  tabs = {
    profile: true,
    published: false,
    adopted: false
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
          });
      this._petService.getUserPets(this.userId).subscribe(pets => {
        this.pets = pets;
      });
      this._petService.getUserAdoptedPets(this.userId).subscribe(pets => {
        this.adopted = pets;
      });
    });
  }

  openTab(tabName) {
    switch (tabName) {
      case 'profile':
        this.tabs.profile = true;
        this.tabs.published = false;
        this.tabs.adopted = false;
      break;
      case 'published':
        this.tabs.profile = false;
        this.tabs.published = true;
        this.tabs.adopted = false;
      break;
      case 'adopted':
        this.tabs.profile = false;
        this.tabs.published = false;
        this.tabs.adopted = true;
    }
  }

}
