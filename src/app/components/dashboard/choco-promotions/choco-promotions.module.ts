import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChocoPromotionsRoutingModule } from './choco-promotions-routing.module';
import { ChocoPromotionsComponent } from './choco-promotions.component';
import { SharedModule } from '@components/shared/shared.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [ChocoPromotionsComponent, FormComponent],
  imports: [
    CommonModule,
    ChocoPromotionsRoutingModule,
    SharedModule
  ]
})
export class ChocoPromotionsModule { }
