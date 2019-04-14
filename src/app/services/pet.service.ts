import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  apiUrl = 'http://localhost:3000/api/pet';

  constructor(private _http: HttpClient) {}

  getPets(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }

  getPet(petId: string) {
    return this._http.get(`${this.apiUrl}/${petId}`);
  }

  getUserPets(userId) {
    return this._http.get(`${this.apiUrl}/user/${userId}`);
  }

  getUserAdoptedPets(userId) {
    return this._http.get(`${this.apiUrl}/adopted/${userId}`);
  }
}
