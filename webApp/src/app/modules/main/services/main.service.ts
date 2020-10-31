import { Injectable } from '@angular/core';
import { BaseDataService } from '../../../services/base-data.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService extends BaseDataService {
  public number$: BehaviorSubject<number> = new BehaviorSubject(null);
  public numberasObs = this.number$.asObservable();

  public selectedNumber$: BehaviorSubject<number> = new BehaviorSubject(null);
  public selectedNumberOBS = this.selectedNumber$.asObservable();

  public activateCompetition$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
