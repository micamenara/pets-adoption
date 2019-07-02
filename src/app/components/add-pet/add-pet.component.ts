import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { UserService } from '../../services/user.service';
import { GeneralService } from '../../services/general.service';
import { PetService } from '../../services/pet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent implements OnInit {
  public pet: any;
  public isModalActive = false;
  public file;

  constructor(
    private _petService: PetService,
    private _fileService: FileService,
    private _userService: UserService,
    private _router: Router,
    private _generalService: GeneralService
  ) {
    const userLogged = this._userService.getUserLoggedIn();
    this.pet = {
      name: '',
      description: '',
      district: 'center',
      type: 'dog',
      size: 'small',
      image: '',
      userId: this._userService.getUserLoggedIn()._id
    };
  }

  ngOnInit() {
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  processForm() {
    this.file ? this._fileService.uploadFile(this.file).subscribe(val => {
      this.pet.image = val.filename;
      this.create();
    }) : this.create();
  }

  create() {
    this._petService.createPet(this.pet).subscribe(
      resp => {
        this._router.navigate(['/pets']).then(() => {
          this._generalService.showMessage('Mascota creada correctamente.');
        });
      },
      err => {
        console.log(err);
        this._router.navigate(['/pets']);
      }
    );
  }

  postMethod(files: FileList) {
    const fileToUpload = files.item(0);
    this.file = new FormData();
    this.file.append('file', fileToUpload, fileToUpload.name);
  }
}