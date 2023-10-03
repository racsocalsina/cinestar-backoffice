import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersCinemasRoutingModule } from './users-cinemas-routing.module';
import { UsersCinemasComponent } from './users-cinemas.component';
import { SharedModule } from '@components/shared/shared.module';
import { DirectivesModule } from '../../../directives/directives.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [UsersCinemasComponent, FormComponent],
  imports: [
    CommonModule,
    UsersCinemasRoutingModule,
    SharedModule,
    DirectivesModule
  ]
})
export class UsersCinemasModule { }
