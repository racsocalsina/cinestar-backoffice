import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketReportsComponent } from './ticket-reports.component';

const routes: Routes = [
  {
    path: '',
    component: TicketReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketReportsRoutingModule { }
