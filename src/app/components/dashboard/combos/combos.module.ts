import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CombosRoutingModule } from './combos-routing.module';
import { CombosComponent } from './combos.component';
import { SharedModule } from '@components/shared/shared.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [CombosComponent, FormComponent],
  imports: [
    CommonModule,
    CombosRoutingModule,
    SharedModule
  ]
})
export class CombosModule { }
