import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErpSystemVarsRoutingModule } from './erp-system-vars-routing.module';
import { ErpSystemVarsComponent } from './erp-system-vars.component';
import { SharedModule } from '@components/shared/shared.module';


@NgModule({
  declarations: [ErpSystemVarsComponent],
  imports: [
    CommonModule,
    ErpSystemVarsRoutingModule,
    SharedModule
  ]
})
export class ErpSystemVarsModule { }
