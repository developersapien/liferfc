import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RealtimeService } from 'src/app/services/realtime.service';
import { UiService } from '../../../../services/ui.service';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MainContentComponent implements OnInit {
  constructor(
    private _wss: RealtimeService,
    public uiService: UiService,
    public mainService: MainService,
    public ch: ChangeDetectorRef
  ) {}
  public state: string;
  public startGame = false;
  public gameOver = false;
  public startNumber$: number;
  public results = [];
  public winner: string;
  ngOnInit(): void {
    this._wss.state$.subscribe((result) => {
      if (result && result.state) {
        this.state = result.state;
      }
    });

    this._wss.allOpenentsInRoom().subscribe((start) => {
      this.startGame = start.state;
      this.mainService.activateCompetition$.next(start.state);
      if (!!start.state) {
        this._wss.letsPlay();
      }
    });

    this._wss.getRandomNumber().subscribe((random) => {
      this.mainService.number$.next(parseInt(random.number));
      if (!!random.isFirst) {
        this.startNumber$ = random.number;
      } else {
        this.results.push({
          number: random.number,
          user: random.user,
          selectedNumber: random.selectedNumber,
          isCorrect: random.isCorrectResult,
        });
      }
    });

    this._wss.getGameStatus().subscribe((result) => {
      this.gameOver = result.isOver;
      this.winner = result.user;

      this._wss.leaveRoom();
    });
  }

  public clear() {
    this.gameOver = false;
    this.results = [];
    this.state = 'game';
  }
}
