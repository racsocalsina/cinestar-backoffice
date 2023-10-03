import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@components/shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ExhibitorMonthlyComponent } from './exhibitor-monthly.component';
import { ExhibitorMonthlyRoutingModule } from './exhibitor-monthly-routing.module';

@NgModule({
  declarations: [ExhibitorMonthlyComponent],
  imports: [
    CommonModule,
    ExhibitorMonthlyRoutingModule,
    SharedModule,
    AlertModule.forRoot()
  ]
})
export class ExhibitorMonthlyModule { }
