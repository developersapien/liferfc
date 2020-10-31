import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { RealtimeService } from 'src/app/services/realtime.service';
import { Observable } from 'rxjs';
import { MainService } from '../../services/main.service';
import { UiService } from '../../../../services/ui.service';

@Component({
  selector: 'app-main-action',
  templateUrl: './main-action.component.html',
  styleUrls: ['./main-action.component.scss'],
})
export class MainActionComponent implements OnInit {
  public isActive$: Observable<boolean>;
  isActive = false;
  mustWait;
  public turnBase: { user: string; state: string };
  constructor(
    private _realtime: RealtimeService,
    public mainService: MainService,
    public uiService: UiService,
    public cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._realtime.isYourTurnActive().subscribe((state) => {
      console.log('consolState', state);
      console.log('MySocket', this.uiService.getSocket());
      this.turnBase = state;
      if (
        (this.uiService.getSocket() === this.turnBase.user &&
          this.turnBase.state === 'play') ||
        (this.uiService.getSocket() !== this.turnBase.user &&
          this.turnBase.state === 'wait')
      ) {
        this.mustWait = false;
      } else {
        this.mustWait = true;
      }
    });
  }

  resultEvent(value: string) {
    console.log('Value', this.mainService.number$.value);
    this._realtime.sendNumber(this.mainService.number$.value, parseInt(value));
  }
}
