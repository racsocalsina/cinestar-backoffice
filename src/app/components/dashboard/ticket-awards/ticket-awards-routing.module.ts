import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketAwardsComponent } from './ticket-awards.component';

const routes: Routes = [
  {
    path: '',
    component: TicketAwardsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketAwardsRoutingModule { }
