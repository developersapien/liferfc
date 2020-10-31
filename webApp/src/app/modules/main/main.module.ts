import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainActionComponent } from './components/main-action/main-action.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MainComponent,
    MainActionComponent,
    MainContentComponent,
    MainHeaderComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [MainComponent],
})
export class MainModule {}
