import { Injectable } from '@angular/core';
import { RealtimeDTOService } from './realtime-dto.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { SocketEvents } from '../enums/socket-events.enums';

@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  // add this to state
  public state$: BehaviorSubject<{ state: string }> = new BehaviorSubject({
    state: 'login',
  });

  constructor(private _realtimeDto: RealtimeDTOService) {}

  public getMessage(): Observable<any> {
    return this._realtimeDto.getMessage(SocketEvents.Message);
  }

  public joinRoom(username: string, room: string): void {
    this._realtimeDto.sendMessage(SocketEvents.Join, {
      username,
      room,
    });
  }

  public getOpponentListener(): Observable<any> {
    return this._realtimeDto.getMessage(SocketEvents.OpponentListener);
  }

  public joinCompetition(username: string): void {
    this._realtimeDto.sendMessage(SocketEvents.Login, { username });
  }

  public triggerJoinerList(): Observable<any> {
    return this._realtimeDto.getMessage(SocketEvents.ListTrigger);
  }

  public triggerNewRoom(): Observable<any> {
    return this._realtimeDto.getMessage(SocketEvents.RoomCreated);
  }

  public leaveRoom(): void {
    this._realtimeDto.sendMessage(SocketEvents.LeaveRoom, {});
  }

  public sendNumber(number: number, selectedNumber: number): void {
    this._realtimeDto.sendMessage(SocketEvents.SendNumber, {
      number,
      selectedNumber,
    });
  }

  public letsPlay(): void {
    this._realtimeDto.sendMessage(SocketEvents.LetsPlay);
  }

  public getRandomNumber(): Observable<any> {
    return this._realtimeDto.getMessage(SocketEvents.RandomNumber);
  }

  public allOpenentsInRoom(): Observable<any> {
    return this._realtimeDto.getMessage(SocketEvents.OnReady);
  }

  public isYourTurnActive(): Observable<any> {
    return this._realtimeDto.getMessage(SocketEvents.ActivateTurn);
  }

  public divisibleError(): Observable<any> {
    return this._realtimeDto.getMessage(SocketEvents.IsNotDivisible);
  }

  public deActiveJoining(): Observable<any> {
    return this._realtimeDto.getMessage(SocketEvents.DeActivateJoining);
  }

  public getGameStatus(): Observable<any> {
    return this._realtimeDto.getMessage(SocketEvents.GameOver);
  }
}
