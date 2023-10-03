import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketReportsRoutingModule } from './ticket-reports-routing.module';
import { TicketReportsComponent } from './ticket-reports.component';
import { SharedModule } from '@components/shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [TicketReportsComponent],
  imports: [
    CommonModule,
    TicketReportsRoutingModule,
    SharedModule,
    AlertModule.forRoot()
  ]
})
export class TicketReportsModule { }
