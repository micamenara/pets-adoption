import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AdoptionRequestService } from '../../../services/adoption-request.service';

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

  constructor(
    private _userService: UserService,
    private _adoptionRequestService: AdoptionRequestService
  ) { }

  ngOnInit() {
    this.petRequestsActive = false;
    this.editPetActive = false;

    this.isCurrentUser();
  }

  isCurrentUser() {
    const userLogged = this._userService.getUserLoggedIn();
    this.currentUser = userLogged && userLogged._id === this.user;
  }

  petRequests(pet) {
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

}
