import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalErrorsRoutingModule } from './internal-errors-routing.module';
import { InternalErrorsComponent } from './internal-errors.component';
import { SharedModule } from '@components/shared/shared.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [InternalErrorsComponent, FormComponent],
  imports: [
    CommonModule,
    InternalErrorsRoutingModule,
    SharedModule
  ]
})
export class InternalErrorsModule { }
