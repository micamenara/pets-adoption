import { Component, OnInit, ElementRef } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { FileUploader } from 'ng2-file-upload';
import { FileService } from '../../services/file.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public user = {} as IUser;

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/api/file', itemAlias: 'photo'});

  constructor(
    private _fileService: FileService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
    };
  }

  processForm() {
    this.processFile();
  }

  processFile() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
      '#photo'
    );
    const fileCount: number = inputEl.files.length;
    const formData = new FormData();
    if (fileCount > 0) {
      formData.append('photo', inputEl.files.item(0));
      this._fileService.uploadFile(formData)
      .subscribe(
        success => {
          // res.json()
          alert(success._body);
        },
        error => alert(error)
      );
    }
  }
}
