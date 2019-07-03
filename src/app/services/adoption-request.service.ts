import { Injectable } from '@angular/core';
import { IAdoptionRequest } from '../interfaces/adoptionRequest';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdoptionRequestService {
  apiUrl = 'http://localhost:3000/api/adoption-request';

  constructor(private _http: HttpClient) {}

  getAdoptionRequestByPetId(petId: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/pet/${petId}`);
  }

  getAdoptionRequest(id: string) {
    return this._http.get(`${this.apiUrl}/${id}`);
  }

  createAdoptionRequest(adoptionRequest: IAdoptionRequest) {
    return this._http.post(`${this.apiUrl}`, adoptionRequest);
  }
}
