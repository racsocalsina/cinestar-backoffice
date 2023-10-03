import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CinemasRoutingModule } from './cinemas-routing.module';
import { CinemasComponent } from './cinemas.component';
import { SharedModule } from '@components/shared/shared.module';
import { BillboardComponent } from './billboard/billboard.component';
import { FormComponent } from './form/form.component';
import { ImagesComponent } from './images/images.component';
import { FunctionFormComponent } from './function-form/function-form.component';


@NgModule({
  declarations: [CinemasComponent, FormComponent, ImagesComponent, BillboardComponent, FunctionFormComponent],
  imports: [
    CommonModule,
    CinemasRoutingModule,
    SharedModule
  ]
})
export class CinemasModule { }
