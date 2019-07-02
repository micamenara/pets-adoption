import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() userLogged = new EventEmitter<any>();

  public loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  canLogin: boolean;
  invalidCredentials: boolean;
  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {
   }

  ngOnInit() {
    this.canLogin = false;
    this.invalidCredentials = false;
    this.loginForm.setValidators(this.validation());
  }

  logIn() {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    this._userService.logIn(email, password).subscribe(
      res => {
        if (res.length) {
          this._userService.setUserLoggedIn(res[0]);
          this.invalidCredentials = false;
          this.userLogged.emit();
          this._router.navigate(['/']);
          window.location.reload();
        } else {
          this.invalidCredentials = true;
        }
      },
      error => {
        console.error(error);
      },

      () => {}
    );

  }

  private validation(): ValidatorFn {
    return (): ValidationErrors => {
      if (this.loginForm.controls['email'].value &&
        this.loginForm.controls['password'].value) {
        this.canLogin = true;
        this.loginForm.setErrors(null);
      } else {
        this.canLogin = false;
        this.loginForm.setErrors({error: 'error'});
      }
      return;
    };
  }
}
