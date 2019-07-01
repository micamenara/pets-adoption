import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent implements OnInit {
  public pet: any;
  public isModalActive = false;
  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/api/file', itemAlias: 'photo'});

  constructor() {
    this.pet = {
      name: '',
      description: ''
    };
   }

  ngOnInit() {
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  processForm() {
  }

}
