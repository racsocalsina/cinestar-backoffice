import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@components/shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CMTermsComponent } from './cm-terms.component';
import { CMTermsRoutingModule } from './cm-terms-routing.module';
import { CMTermsFormComponent } from './cm-terms-form/cm-terms-form.component';

@NgModule({
  declarations: [CMTermsComponent, CMTermsFormComponent],
  imports: [
    CommonModule,
    CMTermsRoutingModule,
    SharedModule,
    AlertModule.forRoot()
  ]
})
export class CMTermsModule { }
