import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketPromotionsComponent } from './ticket-promotions.component';

const routes: Routes = [
  {
    path: '',
    component: TicketPromotionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketPromotionsRoutingModule { }
