import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketPromotionsRoutingModule } from './ticket-promotions-routing.module';
import { TicketPromotionsComponent } from './ticket-promotions.component';
import { SharedModule } from '@components/shared/shared.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [TicketPromotionsComponent, FormComponent],
  imports: [
    CommonModule,
    TicketPromotionsRoutingModule,
    SharedModule
  ]
})
export class TicketPromotionsModule { }
