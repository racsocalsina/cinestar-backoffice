import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChocoAwardsRoutingModule } from './choco-awards-routing.module';
import { ChocoAwardsComponent } from './choco-awards.component';
import { SharedModule } from '@components/shared/shared.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [ChocoAwardsComponent, FormComponent],
  imports: [
    CommonModule,
    ChocoAwardsRoutingModule,
    SharedModule
  ]
})
export class ChocoAwardsModule { }
