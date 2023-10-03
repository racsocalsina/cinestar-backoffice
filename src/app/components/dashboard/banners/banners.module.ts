import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannersRoutingModule } from './banners-routing.module';
import { BannersComponent } from './banners.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from '@components/shared/shared.module';


@NgModule({
  declarations: [BannersComponent, FormComponent],
  imports: [
    CommonModule,
    BannersRoutingModule,
    SharedModule
  ]
})
export class BannersModule { }
