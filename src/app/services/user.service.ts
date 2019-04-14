import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:3000/api/user';

  private isUserLoggedIn: boolean;
  public userLogged: IUser;

  constructor(private _http: HttpClient) {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(user: IUser) {
    this.isUserLoggedIn = true;
    this.userLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  getUsers() {
    return this._http.get(`${this.apiUrl}`);
  }

  getUser(userId: string) {
    return this._http.get(`${this.apiUrl}/${userId}`);
  }

  logIn(email: string, password: string): any {
    return this._http.post(`${this.apiUrl}/login`, {
      email: email,
      password: password,
    });
  }
}
