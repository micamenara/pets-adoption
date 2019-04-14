import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:3000/api/user';

  constructor(private _http: HttpClient) {}

  getUsers() {
    return this._http.get(`${this.apiUrl}`);
  }

  getUser(userId: string) {
    return this._http.get(`${this.apiUrl}/${userId}`);
  }

  login(email: string, password: string) {
    return this._http.post(`${this.apiUrl}/login`, {
      email: email,
      password: password,
    });
  }
}
