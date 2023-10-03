import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseListRoutingModule } from './purchase-list-routing.module';
import { PurchaseListComponent } from './purchase-list.component';
import { SharedModule } from '@components/shared/shared.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [PurchaseListComponent, FormComponent],
  imports: [
    CommonModule,
    PurchaseListRoutingModule,
    SharedModule
  ]
})
export class PurchaseListModule { }
