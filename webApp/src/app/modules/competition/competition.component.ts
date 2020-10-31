import { Component, OnInit, Input } from '@angular/core';
import { CompetitionService } from './services/competition.service';
import { RealtimeService } from 'src/app/services/realtime.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss'],
})
export class CompetitionComponent implements OnInit {
  public isLogin = true;
  @Input() disableActions = false;
  constructor(private realtimeState: RealtimeService) {}

  ngOnInit(): void {
    this.realtimeState.state$.subscribe((result) => {
      if (result && result.state === 'login') {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
  resultEvent(event) {
    this.realtimeState.state$.next({ state: 'game' });
  }
}
