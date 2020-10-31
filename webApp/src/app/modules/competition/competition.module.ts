import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionCardComponent } from './components/competition-card/competition-card.component';
import { CompetitionLoginComponent } from './components/competition-login/competition-login.component';
import { CompetitionComponent } from './competition.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CompetitionCardComponent,
    CompetitionLoginComponent,
    CompetitionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    CompetitionComponent,
    CompetitionCardComponent,
    CompetitionLoginComponent,
  ],
})
export class CompetitionModule {}
