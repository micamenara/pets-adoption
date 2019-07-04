import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {
  pets;
  userLogged;

  constructor(
    private _petService: PetService,
    private _userService: UserService
  ) {
    this._petService.getPets().subscribe(pets => {
      this.pets = pets;
    });
  }

  ngOnInit() {
    this.userLogged = this._userService.getUserLoggedIn() || false;
  }
}
