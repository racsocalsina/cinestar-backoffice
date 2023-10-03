import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@components/shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SystemConfigurationComponent } from './system-configuration.component';
import { SystemConfigurationRoutingModule } from './system-configuration-routing.module';

@NgModule({
  declarations: [SystemConfigurationComponent],
  imports: [
    CommonModule,
    SystemConfigurationRoutingModule,
    SharedModule,
    AlertModule.forRoot()
  ]
})
export class SystemConfigurationModule { }
