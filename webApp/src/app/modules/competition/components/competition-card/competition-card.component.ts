import { Component, OnInit } from '@angular/core';
import {
  CompetitionService,
  ResponseRooms,
} from '../../services/competition.service';
import { Observable } from 'rxjs';
import { RealtimeService } from 'src/app/services/realtime.service';
import { UiService } from '../../../../services/ui.service';
import { MainService } from 'src/app/modules/main/services/main.service';

@Component({
  selector: 'app-competition-card',
  templateUrl: './competition-card.component.html',
  styleUrls: ['./competition-card.component.scss'],
})
export class CompetitionCardComponent implements OnInit {
  public roomList$: Observable<ResponseRooms>;
  public joinedRoom: string;
  constructor(
    private _competitionService: CompetitionService,
    private _realtimeService: RealtimeService,
    private _uiService: UiService,
    public mainService: MainService
  ) {}

  ngOnInit(): void {
    this.roomList$ = this._competitionService.getRooms();

    this._realtimeService.triggerJoinerList().subscribe((result) => {
      if (!!result) {
        return (this.roomList$ = this._competitionService.getRooms());
      }
    });

    this._realtimeService.getMessage().subscribe((result) => {
      this.joinedRoom = result.room;
      if (result.hasOwnProperty('socketId')) {
        this._uiService.setSocket(result.socketId);
      }
    });
  }

  joinRoom(roomName) {
    this._realtimeService.joinRoom(this._uiService.getUsername(), roomName);
  }
}
