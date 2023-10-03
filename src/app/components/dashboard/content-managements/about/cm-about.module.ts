import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@components/shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CMAboutComponent } from './cm-about.component';
import { CMAboutRoutingModule } from './cm-about-routing.module';
import { CMAboutFormComponent } from './cm-about-form/cm-about-form.component';

@NgModule({
  declarations: [CMAboutComponent, CMAboutFormComponent],
  imports: [
    CommonModule,
    CMAboutRoutingModule,
    SharedModule,
    AlertModule.forRoot()
  ]
})
export class CMAboutModule { }
