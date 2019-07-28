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
  filteredPets;
  userLogged;
  filters = {
    type: 'all',
    size: 'all',
    district:'all'
  }

  constructor(
    private _petService: PetService,
    private _userService: UserService
  ) {
    this._petService.getPets().subscribe(pets => {
      this.pets = pets;
      this.filteredPets = pets;
    });
  }

  ngOnInit() {
    this.userLogged = this._userService.getUserLoggedIn() || false;
  }

  applyFilters() {
    this.filteredPets = this.pets.filter(pet => {
      return (this.filters.district === 'all' || pet.district === this.filters.district) &&
      (this.filters.type === 'all' || pet.type === this.filters.type) &&
      (this.filters.size === 'all' || pet.size === this.filters.size)
    })
  }
}
