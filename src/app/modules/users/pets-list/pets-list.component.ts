import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';

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
  public users: any;
  public currentUser: boolean;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.petRequestsActive = false;
    this.editPetActive = false;

    this._userService.getUsers().subscribe(users => {
      console.log(users);
      this.users = users;
    });

    this.isCurrentUser();
  }

  isCurrentUser() {
    const userLogged = this._userService.getUserLoggedIn();
    this.currentUser = userLogged && userLogged._id === this.user;
  }

  petRequests(pet) {
    this.petRequestsActive = true;
  }

  editPet(pet) {
    this.editPetActive = true;
  }

  toggleModalEdit() {
    this.editPetActive = !this.editPetActive;
  }

  toggleModalRequest() {
    this.petRequestsActive = !this.petRequestsActive;
  }

}
