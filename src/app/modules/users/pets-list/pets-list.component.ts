import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AdoptionRequestService } from '../../../services/adoption-request.service';
import { PetService } from '../../../services/pet.service';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent implements OnInit {

  @Input() pets: Array<any>;
  @Input() user: string;

  public petRequestsActive: boolean;
  public editPetActive: boolean;
  public adoptionRequests: any;
  public currentUser: boolean;
  public selectedPet: any;
  public currentPet: any;
  public userLogged: any;

  constructor(
    private _userService: UserService,
    private _adoptionRequestService: AdoptionRequestService,
    private _petService: PetService,
    private _generalService: GeneralService
  ) { }

  ngOnInit() {
    this.petRequestsActive = false;
    this.editPetActive = false;

    this.isCurrentUser();
  }

  isCurrentUser() {
    this.userLogged = this._userService.getUserLoggedIn() || false;
    this.currentUser = this.userLogged && this.userLogged._id === this.user;
  }

  petRequests(pet) {
    this.currentPet = pet;
    this._adoptionRequestService.getAdoptionRequestByPetId(pet._id).subscribe(adoptionRequests => {
      this.adoptionRequests = adoptionRequests;
      this.petRequestsActive = true;
    });
  }

  editPet(pet) {
    this.editPetActive = true;
    this.selectedPet = pet;
  }

  toggleModalEdit() {
    this.editPetActive = !this.editPetActive;
  }

  toggleModalRequest() {
    this.petRequestsActive = !this.petRequestsActive;
  }

  save() {
  }

  giveAdoption(user) {
    this._petService.adoptPet(this.currentPet._id, user._id).subscribe(
      resp => {
        this.petRequestsActive = false;
        this._generalService.showMessage('Mascota adoptada correctamente.');
      });
  }

}
