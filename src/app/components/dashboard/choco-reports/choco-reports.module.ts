import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChocoReportsRoutingModule } from './choco-reports-routing.module';
import { ChocoReportsComponent } from './choco-reports.component';
import { SharedModule } from '@components/shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [ChocoReportsComponent],
  imports: [
    CommonModule,
    ChocoReportsRoutingModule,
    SharedModule,
    AlertModule.forRoot()
  ]
})
export class ChocoReportsModule { }
