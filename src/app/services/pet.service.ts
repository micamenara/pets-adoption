import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  API = 'http://localhost:3000/api';
  constructor(private _http: HttpClient) {}

  getPets(): Observable<any> {
    return this._http.get('http://localhost:3000/api/pets');
  }

  getUserPets(userId) {
    // let pets = [];
    // pets.push(this.pets[0]);
    // return pets;
  }
}
