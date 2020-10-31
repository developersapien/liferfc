import { Component, OnInit } from '@angular/core';
import { RealtimeService } from 'src/app/services/realtime.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private realtimeState: RealtimeService) {}
  public state: string;
  ngOnInit(): void {
    this.realtimeState.state$.subscribe((result) => {
      if (result && result.state) {
        this.state = result.state;
      }
    });
  }
}
