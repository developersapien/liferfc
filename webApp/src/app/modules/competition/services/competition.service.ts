import { Injectable } from '@angular/core';
import { BaseDataService } from '../../../services/base-data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ResponseRooms {
  id: string | number;
  name: string | number;
  owner: string | number;
  players: string[] | number[];
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompetitionService extends BaseDataService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public getRooms(): Observable<ResponseRooms> {
    const endpoint = '/rooms';
    return this._get<ResponseRooms>(endpoint);
  }
}
