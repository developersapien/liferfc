import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RealtimeService } from 'src/app/services/realtime.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UiService } from '../../../../services/ui.service';

@Component({
  selector: 'app-competition-login',
  templateUrl: './competition-login.component.html',
  styleUrls: ['./competition-login.component.scss'],
})
export class CompetitionLoginComponent implements OnInit {
  loginForm = new FormGroup({
    nickname: new FormControl(''),
  });
  constructor(private wss: RealtimeService, private _uiService: UiService) {}
  @Output() actionEvent = new EventEmitter();
  ngOnInit(): void {}

  logIn(name: string) {
    this.wss.joinCompetition(name);
  }

  onSubmit() {
    this.logIn(this.loginForm.getRawValue().nickname);
    this._uiService.setUsername(this.loginForm.getRawValue().nickname);
    this.actionEvent.emit({ isLogin: false });
  }
}
