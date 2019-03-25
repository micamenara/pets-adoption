import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public user = {} as IUser;

  constructor() {
  }

  ngOnInit() {
  }

  processForm() {
  }

  processFile(imageInput) {

  }

}
