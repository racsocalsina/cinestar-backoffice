import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@components/shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CMCorporateComponent } from './cm-corporate.component';
import { CMCorporateRoutingModule } from './cm-corporate-routing.module';
import { CMCorporateFormComponent } from './cm-corporate-form/cm-corporate-form.component';

@NgModule({
  declarations: [CMCorporateComponent, CMCorporateFormComponent],
  imports: [
    CommonModule,
    CMCorporateRoutingModule,
    SharedModule,
    AlertModule.forRoot()
  ]
})
export class CMCorporateModule { }
