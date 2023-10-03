import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ControlMessagesModule } from './control-messages/control-messages.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule( {
  declarations: [HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    PerfectScrollbarModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    UiSwitchModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ControlMessagesModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ReactiveFormsModule,
    FormsModule,
    PerfectScrollbarModule,
    NgSelectModule,
    BsDatepickerModule,
    PaginationModule,
    UiSwitchModule,
    ModalModule,
    TimepickerModule,
    ControlMessagesModule,
    TooltipModule
  ],
} )
export class SharedModule {}
