import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [SidebarMenuComponent, SidebarComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [SidebarComponent, SidebarMenuComponent],
})
export class SidebarModule {}
