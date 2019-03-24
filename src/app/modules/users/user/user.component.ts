import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PetService } from '../../../services/pet.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username: string;
  user;
  pets;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _petService: PetService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.username = params['username'];
      this._userService
          .getUser(this.username)
          .subscribe(user => {
            this.user = user;
            this.pets = this._petService.getUserPets(this.user.login);
          });
    });
  }

}
