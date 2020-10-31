import { Component, OnInit } from '@angular/core';
import { RealtimeService } from 'src/app/services/realtime.service';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  constructor(private _wss: RealtimeService, public mainService: MainService) {}
  public message: any;
  public state: string;
  ngOnInit(): void {
    this._wss.getMessage().subscribe((result) => {
      this.message = result;
    });
  }

  public leaveRoom() {
    this._wss.leaveRoom();
  }
}
