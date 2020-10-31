import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { SocketEvents } from '../enums/socket-events.enums';

@Injectable({
  providedIn: 'root',
})
export class RealtimeDTOService {
  constructor(private socketIO: Socket) {}

  public getMessage(event: SocketEvents): Observable<any> {
    return this.socketIO.fromEvent(event).pipe(map((data) => data));
  }

  public sendMessage(event: SocketEvents, option?: {}) {
    this.socketIO.emit(event, option);
  }
}
