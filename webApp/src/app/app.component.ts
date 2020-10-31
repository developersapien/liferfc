import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RealtimeService } from './services/realtime.service';
import { faCoffee, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MainService } from './modules/main/services/main.service';

export interface Icons {
  [key: string]: IconDefinition;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public messages: string;
  public icons;
  constructor(private wss: RealtimeService, public mainService: MainService) {}

  ngOnInit() {
    this.wss.getMessage().subscribe((result) => {
      this.messages = result;
    });
    this.icons = faCoffee;
  }
}
