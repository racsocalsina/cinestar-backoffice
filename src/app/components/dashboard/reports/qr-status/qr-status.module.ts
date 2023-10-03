import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@components/shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ReportQrStatusComponent } from './qr-status.component';
import { ReportQrStatusRoutingModule } from './qr-status-routing.module';

@NgModule({
  declarations: [ReportQrStatusComponent],
  imports: [
    CommonModule,
    ReportQrStatusRoutingModule,
    SharedModule,
    AlertModule.forRoot()
  ]
})
export class ReportQrStatusModule { }
