import { Injectable } from '@angular/core';
import { RealtimeService } from 'src/app/services/realtime.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseDataService {
  private readonly _baseUrl = 'http://localhost:3000';
  constructor(private _http: HttpClient) {}

  protected _get<T>(url: string): Observable<T> {
    return this._http.get<T>(`${this._baseUrl}${url}`);
  }
}
