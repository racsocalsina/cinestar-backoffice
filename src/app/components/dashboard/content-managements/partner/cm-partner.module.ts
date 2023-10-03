import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@components/shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CMPartnerComponent } from './cm-partner.component';
import { CMPartnerRoutingModule } from './cm-partner-routing.module';
import { CMPartnerFormComponent } from './cm-partner-form/cm-partner-form.component';

@NgModule({
  declarations: [CMPartnerComponent, CMPartnerFormComponent],
  imports: [
    CommonModule,
    CMPartnerRoutingModule,
    SharedModule,
    AlertModule.forRoot()
  ]
})
export class CMPartnerModule { }
