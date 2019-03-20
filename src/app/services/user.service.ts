import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://api.github.com/users';

  constructor(private _http: HttpClient) {}

  getUsers() {
    return this._http.get(`${this.apiUrl}?per_page=10`);
  }

  getUser(username: string) {
    return this._http.get(`${this.apiUrl}/${username}`);
  }
}
