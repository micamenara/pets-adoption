import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { GeneralService } from '../../services/general.service';
import { FileService } from '../../services/file.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public user = {} as IUser;
  public file;

  constructor(
    private _fileService: FileService,
    private _userService: UserService,
    private _router: Router,
    private _generalService: GeneralService
  ) { }

  ngOnInit() {
  }


  processForm() {
    this.file ? this._fileService.uploadFile(this.file).subscribe(val => {
      this.user.image = val.filename;
      this.create();
    }) : this.create();
  }

  create() {
    this._userService.create(this.user).subscribe(
      resp => {
        this._router.navigate(['/']).then(() => {
          this._generalService.showMessage('Usuario creado correctamente.');
        });
      },
      err => {
        this._router.navigate(['/']);
      }
    );
  }

  postMethod(files: FileList) {
    const fileToUpload = files.item(0);
    this.file = new FormData();
    this.file.append('file', fileToUpload, fileToUpload.name);
  }
}
