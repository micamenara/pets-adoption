import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AdoptionRequestService } from '../../../services/adoption-request.service';
import { PetService } from '../../../services/pet.service';
import { GeneralService } from '../../../services/general.service';
import { FileService } from '../../../services/file.service';
import { Router } from '@angular/router';

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
  public fileName: string;
  public file: any;

  constructor(
    private _fileService: FileService,
    private _userService: UserService,
    private _adoptionRequestService: AdoptionRequestService,
    private _petService: PetService,
    private _router: Router,
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
    this.file ? this._fileService.uploadFile(this.file).subscribe(val => {
      this.selectedPet.image = val.filename;
      this.update();
    }) : this.update();
  }

  postMethod(files: FileList) {
    const fileToUpload = files.item(0);
    this.file = new FormData();
    this.fileName = fileToUpload.name;
    this.file.append('file', fileToUpload, fileToUpload.name);
  }

  adopted() {
    this.selectedPet.status = "adopted";
    this.update();
  }

  valid() {
    const valid = this.selectedPet.name.length &&
      this.selectedPet.description.length &&
      this.selectedPet.district.length &&
      this.selectedPet.type.length &&
      this.selectedPet.size.length &&
      (this.selectedPet.image.length || this.file);
    return valid;
  }

  update() {
    this._petService.update(this.selectedPet).subscribe(
      resp => {
        this.toggleModalEdit();
        this._generalService.showMessage('Mascota guardada correctamente.');
      },
      err => {
        console.log(err);
        this._router.navigate(['/pets']);
      }
    );
  }

  giveAdoption(user) {
    this._petService.adoptPet(this.currentPet._id, user._id).subscribe(
      resp => {
        this.currentPet.status = "adopted";
        this.petRequestsActive = false;
        this._generalService.showMessage('Mascota adoptada correctamente.');
      });
  }

  deleteFile() {
    this.selectedPet.image = '';
  }
}
