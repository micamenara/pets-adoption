import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'http://localhost:3000/api/file';

  constructor(private _http: HttpClient) {}

  uploadFile(file): Observable<any>  {
    return this._http.post(this.apiUrl, file);
  }
}
