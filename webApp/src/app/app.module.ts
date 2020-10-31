import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import {
  faCoffee,
  faTrophy,
  faUsers,
  faBraille,
  faLifeRing,
  faJedi,
  faMicrochip,
} from '@fortawesome/free-solid-svg-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CompetitionModule } from './modules/competition/competition.module';
import { SidebarModule } from './modules/sidebar/sidebar.module';
import { MainModule } from './modules/main/main.module';
const socketConfig: SocketIoConfig = {
  url: environment.wsEndpoint,
  options: {},
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CompetitionModule,
    FontAwesomeModule,
    MainModule,
    SidebarModule,
    SocketIoModule.forRoot(socketConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faTrophy,
      faCoffee,
      faUsers,
      faLifeRing,
      faBraille,
      faJedi,
      faMicrochip
    );
  }
}
