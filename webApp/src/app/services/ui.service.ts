import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  public username$: BehaviorSubject<string> = new BehaviorSubject(undefined);
  public socket$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  constructor() {}

  getUsername() {
    return this.username$.value;
  }

  setUsername(name: string) {
    this.username$.next(name);
  }

  getSocket() {
    return this.socket$.value;
  }

  setSocket(id: any) {
    this.socket$.next(id);
  }
}
