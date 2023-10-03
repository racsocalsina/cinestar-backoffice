import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketAwardsRoutingModule } from './ticket-awards-routing.module';
import { TicketAwardsComponent } from './ticket-awards.component';
import { SharedModule } from '@components/shared/shared.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [TicketAwardsComponent, FormComponent],
  imports: [
    CommonModule,
    TicketAwardsRoutingModule,
    SharedModule
  ]
})
export class TicketAwardsModule { }
